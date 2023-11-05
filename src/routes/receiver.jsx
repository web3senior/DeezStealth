import { useEffect, useState, Fragment } from 'react'
import { ethers } from 'ethers'
import { Title } from './helper/DocumentTitle'
import styles from './Sender.module.scss'
import { getStealthPrivateKey } from '../util/stealth'
import abi from '../abi/DeezStealth'

export default function Receiver({ title }) {
  Title(title)

  const [contract, setContract] = useState(null)
  const [isReady, setIsReady] = useState(false)

  const [publicKeyInput, setPublicKeyInput] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [sharedSecret, setSharedSecret] = useState('')

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    provider.getSigner().then(signer => {
      const contractAddress = '0xF9223Ba23C6381b30405Ec6D72717E3294AC848e' // TODO extract from here
      const contract = new ethers.Contract(contractAddress, abi, signer)

      setContract(contract)

      // TODO
      contract.pubKey(signer.address).then(pubKey => {
        if (pubKey.length > 2) {
          setPublicKey(pubKey)
        }
        setIsReady(true)
      })
    })
  }, [])

  const handleGenerate = async () => {
    // TODO validation
    if (privateKey.length === 0 || sharedSecret.length === 0) {
      alert('Invalid inputs')
    }
    alert(getStealthPrivateKey(privateKey, sharedSecret))
  }

  const handleSubmitPubKey = async () => {
    const tx = await contract.setPubKey(publicKeyInput)
    await tx.wait()
    // TODO check if no errors
    setPublicKey(publicKeyInput)
  }

  const handleRemovePubKey = async () => {
    const tx = await contract.removePubKey()
    await tx.wait()
    // TODO check if no errors
    setPublicKey('')
  }

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className='card__body'>
            {!isReady ? (
              <Fragment>
                <h3>Public Key</h3>
                Loading...
              </Fragment>
            ) : (
              <Fragment>
                {publicKey === '' ? (
                  <Fragment>
                    <h3>Public Key</h3>
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
              </Fragment>
            )}

            <p>&nbsp;</p>
            <h3>Generate Stealth Private Key</h3>
            <p><input type="text" placeholder="Shared Secret" value={sharedSecret} onChange={e => setSharedSecret(e.target.value)} /></p>
            <p><input type="password" placeholder="Private Key" value={privateKey} onChange={e => setPrivateKey(e.target.value)} /></p>
            <p><button onClick={handleGenerate}>Generate</button></p>
          </div>
        </div>
      </div>
    </section>
  )
}
