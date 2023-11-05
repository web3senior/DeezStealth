import { useEffect, useState, Fragment } from 'react'
import { ethers } from 'ethers'
import { Title } from './helper/DocumentTitle'
import styles from './Sender.module.scss'
import { getStealthPrivateKey } from '../util/stealth'
import abi from '../abi/DeezStealth'

const contractAddress = '0x04eAC8cd77aE31c4Eb22C6Eb6cECac0A58e544fB' // TODO extract from here

export default function Receiver({ title }) {
  Title(title)

  const [contract, setContract] = useState(null)
  const [isReady, setIsReady] = useState(false)

  const [isRemoving, setIsRemoving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [publicKeyInput, setPublicKeyInput] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [sharedSecret, setSharedSecret] = useState('')

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    provider.getSigner().then(signer => {
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
    const stealthPrivateKey = getStealthPrivateKey(privateKey, sharedSecret)
    const wallet = new ethers.Wallet(stealthPrivateKey)
    alert("Your private key: " + stealthPrivateKey + "\n\nYour stealth address: " + wallet.address)
  }

  const handleSubmitPubKey = async () => {
    let _key = publicKeyInput
    // if (publicKeyInput.substring(0, 2) !== '0x') {
    //   _pubKey = '0x' + publicKeyInput
    // }
    // TODO try to add 0x prefix?
    if (ethers.isHexString(_key, 32)) { // is valid private key?
      const wallet = new ethers.Wallet(_key)
      _key = wallet.signingKey.publicKey
      console.log('PUBLIC KEY', _key)
    } else {
      if (!ethers.isHexString(_key, 64)) { // is valid public key?
        alert('Value you have provided is not a valid public or private key')
        return
      }
    }
    setIsSubmitting(true)
    try {
      const tx = await contract.setPubKey(_key)
      await tx.wait()
    } catch (e) {
      // TODO
      setIsSubmitting(false)
      return
    }
    // TODO check if no errors
    setPublicKey(_key)
    setIsSubmitting(false)
  }

  const handleRemovePubKey = async () => {
    setIsRemoving(true)
    try {
      const tx = await contract.removePubKey()
      await tx.wait()
    } catch (e) {
      // TODO
      setIsRemoving(false)
      return
    }
    // TODO check if no errors
    setPublicKey('')
    setIsRemoving(false)
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
                    <h3>Save Public Key</h3>
                    <p><input type="text" placeholder="Uncompressed Public Key or Private Key starting with 0x" value={publicKeyInput} onChange={e => setPublicKeyInput(e.target.value)} /></p>
                    <p><button onClick={handleSubmitPubKey} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button></p>
                    <p>&nbsp;</p>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h3>Public Key</h3>
                    <p>{publicKey} [copy]</p>
                    <p><button onClick={handleRemovePubKey} disabled={isRemoving}>{isRemoving ? 'Removing...' : 'Remove'}</button></p>
                  </Fragment>
                )}
              </Fragment>
            )}

            <p>&nbsp;</p>
            <h3>Generate Stealth Private Key</h3>
            <p><input type="text" placeholder="Shared Secret starting with 0x" value={sharedSecret} onChange={e => setSharedSecret(e.target.value)} /></p>
            <p><input type="text" placeholder="Private Key starting with 0x" value={privateKey} onChange={e => setPrivateKey(e.target.value)} /></p>
            <p><button onClick={handleGenerate}>Generate</button></p>
          </div>
        </div>
      </div>
    </section>
  )
}
