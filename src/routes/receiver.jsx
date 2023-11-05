import { useEffect, useState, Fragment } from 'react'
import { ethers } from 'ethers'
import { Title } from './helper/DocumentTitle'
import styles from './Sender.module.scss'
import { getStealthPrivateKey } from '../util/stealth'
import abi from '../abi/DeezStealth'

export default function Receiver({ title }) {
  Title(title)

  const [publicKeyInput, setPublicKeyInput] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [sharedSecret, setSharedSecret] = useState('')

  let contract = null

  useEffect(() => {
    if (contract === null) {
      // TODO tmp
      const provider = new ethers.BrowserProvider(window.ethereum)
      provider.getSigner().then(signer => {
        const contractAddress = '0xF9223Ba23C6381b30405Ec6D72717E3294AC848e' // TODO extract from here
        contract = new ethers.Contract(contractAddress, abi, provider)

        // TODO
        contract.pubKey(signer.address).then(pubKey => {
          if (pubKey.length > 2) {
            setPublicKey(pubKey)
          }
        })
      })
    }
  }, [])

  const handleGenerate = async () => {
    // TODO validation
    if (privateKey.length === 0 || sharedSecret.length === 0) {
      alert('Invalid inputs')
    }
    alert(getStealthPrivateKey(privateKey, sharedSecret))
  }

  const handleSubmitPubKey = async () => {
    alert("TODO")
  }

  const handleRemovePubKey = async () => {
    alert("TODO")
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

            {publicKey === '' ? (
              <Fragment>
                <h3>Set Public Key</h3>
                <p><b>TODO Support private key too to derive public key from it</b></p>
                <p><input type="text" placeholder="Public Key" value={publicKeyInput} onChange={e => setPublicKeyInput(e.target.value)} /></p>
                <p><button onClick={handleSubmitPubKey}>Submit</button></p>
                <p>&nbsp;</p>
              </Fragment>
            ) : (
              <Fragment>
                <h3>Public Key</h3>
                <p>{publicKey} [copy]</p>
                <p><button onClick={handleRemovePubKey}>Remove</button></p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
