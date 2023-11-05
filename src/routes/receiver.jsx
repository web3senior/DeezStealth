import { useState } from 'react'
import { Title } from './helper/DocumentTitle'
import styles from './Sender.module.scss'
import { getStealthPrivateKey } from '../util/stealth'

export default function Receiver({ title }) {
  Title(title)

  const [privateKey, setPrivateKey] = useState('')
  const [sharedSecret, setSharedSecret] = useState('')

  const handleGenerate = async () => {
    // TODO validation
    if (privateKey.length === 0 || sharedSecret.length === 0) {
      alert('Invalid inputs')
    }
    alert(getStealthPrivateKey(privateKey, sharedSecret))
  }

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className='card__body'>
            <h3>Generate Stealth Private Key</h3>
            <p><input type="text" placeholder="Shared Secret" value={sharedSecret} onChange={e => setSharedSecret(e.target.value)} /></p>
            <p><input type="password" placeholder="Private Key" value={privateKey} onChange={e => setPrivateKey(e.target.value)} /></p>
            <p><button onClick={handleGenerate}>Generate</button></p>
            <p>&nbsp;</p>

            <h3>Set Public Key</h3>
            <p><input type="text" placeholder="Public Key or Private Key" /></p>
            <p><button>Submit</button></p>
            <p>&nbsp;</p>

            <h3>Public Key</h3>
            <p>0x048bd96eb2adfbe720d300786d72b8a63d1bfea... [copy]</p>
            <p><button>Remove</button></p>
          </div>
        </div>
      </div>
    </section>
  )
}
