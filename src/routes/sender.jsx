import { useState } from 'react'
import { ethers } from 'ethers'
import { FileUploader } from 'react-drag-drop-files'
import { Title } from './helper/DocumentTitle'
import styles from './Sender.module.scss'
import { getStealthAddress } from '../util/stealth'

const fileTypes = ['CSV']

// TODO export
const abi = [{ "inputs": [], "name": "InvalidInput", "type": "error" }, { "inputs": [], "name": "InvalidValue", "type": "error" }, { "inputs": [], "name": "NotSender", "type": "error" }, { "inputs": [], "name": "PubKeyNotProvided", "type": "error" }, { "inputs": [], "name": "PubKeyProvided", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "gasPassAmount", "type": "uint256" }], "name": "Distributed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "bytes", "name": "key", "type": "bytes" }], "name": "NewPubKey", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "PubKeyRemoved", "type": "event" }, { "inputs": [{ "internalType": "address[]", "name": "receivers", "type": "address[]" }, { "internalType": "address[]", "name": "tokens", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "gasPassAmounts", "type": "uint256[]" }], "name": "distribute", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "a", "type": "address[]" }], "name": "getPubKeys", "outputs": [{ "internalType": "bytes[]", "name": "", "type": "bytes[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pubKey", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "removePubKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes", "name": "key", "type": "bytes" }], "name": "setPubKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

// const secret = crypto.randomBytes(secretLength).toString('hex')
// TODO crypto package is deprecated & seems that built-in crypto is not available in our build as well
const secret = 'abcdef12435' // TODO generate new unique one for each address?

export default function Sender({ title }) {
  Title(title)
  const [file, setFile] = useState(null)
  const [receivers, setReceivers] = useState([])
  const [isReadyToDistribute, setIsReadyToDistribute] = useState(false)

  const handleChange = async (file) => {
    // TODO check errors
    const addresses = []
    const receivers = []
    const rows = (await file[0].text()).split('\n')
    for (let i = 1; i < rows.length; i++) { // TODO 'i = 1' to ignore first titles row
      const [address] = rows[i].split(',')
      addresses.push(address)
    }

    // TODO tmp
    const provider = new ethers.BrowserProvider(window.ethereum)
    // const signer = ethersProvider.getSigner() TODO remove?
    const contractAddress = '0xF9223Ba23C6381b30405Ec6D72717E3294AC848e' // TODO extract from here
    const contract = new ethers.Contract(contractAddress, abi, provider)

    const pubKeys = await contract.getPubKeys(addresses)
    pubKeys.forEach((pubKey, i) => {
      // TODO check if pubKey is empty
      const [stealthAddress, sharedSecret] = getStealthAddress(pubKey, secret)
      receivers.push({
        address: addresses[i],
        pubKey,
        stealthAddress,
        sharedSecret
      })
    })

    console.log('Receivers', receivers)
    setFile(file)
    setReceivers(receivers)
    setIsReadyToDistribute(true) // TODO tmp
  }

  const handleDistribute = async () => {

    const addresses = []
    receivers.forEach(receiver => {
      addresses.push(receiver.stealthAddress)
    })

    // TODO
    const tokens = [] // ETH only
    const amounts = [ethers.parseEther('0.00000023')] // send 0.0000023 ETH to everyone
    const gasPassAmounts = [] // Gas Pass Amounts

    // TODO tmp
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const contractAddress = '0xF9223Ba23C6381b30405Ec6D72717E3294AC848e' // TODO extract from here
    const contract = new ethers.Contract(contractAddress, abi, signer)
    await contract.distribute(addresses, [], [230], [], {
      gasLimit: 100000, // TODO
      value: 230,
    })
  }

  const handleReset = () => {
    setFile(null)
    setReceivers(null)
    setIsReadyToDistribute(false)
    // TODO empty inputs?
  }

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className='card__body'>
            <h1>Distribute</h1>
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name='file'
              types={fileTypes}
            />
            <p>{file ? `File name: ${file[0].name}` : 'no files uploaded yet'}</p>
            <p><input type="text" placeholder="Token Address" /></p>
            <p><input type="text" placeholder="Amount" /></p>
            <p><input type="text" placeholder="Gas Pass Amount" /></p>
            <p>
              <button onClick={handleReset}>Reset</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handleDistribute} type="submit" disabled={!isReadyToDistribute}>Distribute</button>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
