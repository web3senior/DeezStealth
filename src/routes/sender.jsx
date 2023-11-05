import { useEffect, useState, Fragment } from 'react'
import { ethers } from 'ethers'
import { FileUploader } from 'react-drag-drop-files'
import { Title } from './helper/DocumentTitle'
import styles from './Sender.module.scss'
import { getStealthAddress } from '../util/stealth'
import abi from '../abi/DeezStealth'
import erc20ABI from '../abi/ERC20'

const fileTypes = ['CSV']

const contractAddress = '0x04eAC8cd77aE31c4Eb22C6Eb6cECac0A58e544fB' // TODO extract from here

// const secret = crypto.randomBytes(secretLength).toString('hex')
// TODO crypto package is deprecated & seems that built-in crypto is not available in our build as well
const secret = 'abcdef12435' // TODO generate new unique one for each address?

export default function Sender({ title }) {
  Title(title)

  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [isReady, setIsReady] = useState(false)

  const [file, setFile] = useState(null)
  const [receivers, setReceivers] = useState([])
  const [isReadyToDistribute, setIsReadyToDistribute] = useState(false)

  const [isETH, setIsETH] = useState(true)
  const [token, setToken] = useState('')
  const [amount, setAmount] = useState('')
  const [gasPassAmount, setGasPassAmount] = useState('')
  const [totalValue, setTotalValue] = useState(0) // TODO display
  const [totalERC20Amount, setTotalERC20Amount] = useState(0) // TODO display

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    provider.getSigner().then(_signer => {
      const contract = new ethers.Contract(contractAddress, abi, _signer)
      setSigner(_signer)
      setContract(contract)
      setIsReady(true)
    })
  }, [])

  const handleChange = async (file) => {
    // TODO check errors
    const addresses = [] // TODO support public keys as an input
    const receivers = []
    const rows = (await file.text()).split('\r\n') // TODO \r\n
    for (let i = 1; i < rows.length; i++) { // TODO 'i = 1' to ignore first titles row
      const [address] = rows[i].split(',')
      addresses.push(address)
    }

    console.log('Addresses', addresses)

    const pubKeys = await contract.getPubKeys(addresses)
    pubKeys.forEach((pubKey, i) => {
      if (pubKey === '0x') {
        return // skip
      }
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

    if (receivers.length > 0) {
      setIsReadyToDistribute(true)
    } else {
      setIsReadyToDistribute(false)
    }
  }

  const handleDistribute = async () => {
    if (amount <= 0) {
      alert('Please provide an amount')
      return
    }
    const addresses = receivers.map(r => r.stealthAddress)
    // TODO
    const _token = isETH ? '0x0000000000000000000000000000000000000000' : token
    const gasPassAmounts = isETH || !gasPassAmount ? [] : [ethers.parseEther(gasPassAmount)]

    setIsReadyToDistribute(false)

    let amounts
    if (!isETH) {
      const erc20 = new ethers.Contract(token, erc20ABI, signer)
      const decimals = await erc20.decimals()
      console.log('Token decimals', decimals)
      amounts = [ethers.parseUnits(amount, decimals)] // send same amount of token to everyone
      const tx = await erc20.approve(contractAddress, amounts[0] * BigInt(addresses.length))
      await tx.wait()
    } else {
      amounts = [ethers.parseEther(amount)] // send same amount of ETH to everyone
    }

    const value = (isETH ? amounts[0] : (gasPassAmounts.length && gasPassAmounts[0])) * BigInt(addresses.length)
    console.log('Distribute TX')
    console.log('addresses', addresses)
    console.log('token', _token)
    console.log('amounts', amounts)
    console.log('gasPassAmounts', gasPassAmounts)
    console.log('value', value)
    const tx = await contract.distribute(addresses, _token, amounts, gasPassAmounts, {
      gasLimit: 10000000, // TODO
      value
    })
    console.log('TX', tx)
    const receipt = await tx.wait()
    console.log('RECEIPT', receipt)
    alert('TX HASH ' + tx.hash)
    setIsReadyToDistribute(true)
  }

  const handleReset = () => {
    setFile(null)
    setReceivers(null)
    setIsReadyToDistribute(false)
    setToken('')
    setAmount('')
    setGasPassAmount('')
    setIsETH(true)
  }

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className='card__body'>
            <h1>Distribute</h1>
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name='file'
              types={fileTypes}
            />
            <p>{file ? `File name: ${file.name}` : 'no files uploaded yet'}</p>

            {file && (
              <Fragment>
                {receivers.length === 0 ? (
                  <p><b>No public keys found to distribute.</b></p>
                ) : (
                  <p><b>{receivers.length} public keys found to distribute</b></p>
                )}

                <p><br /><input type="checkbox" defaultChecked={isETH} onClick={() => setIsETH(!isETH)} /> Distribute Ethereum<br /><br /></p>

                {receivers.length > 0 && (
                  <Fragment>
                    <p><input value={amount} onChange={e => setAmount(e.target.value)} type="text" placeholder="Amount" /></p>
                    {!isETH && (
                      <Fragment>
                        <p><input value={token} onChange={e => setToken(e.target.value)} type="text" placeholder="Token" /></p>
                        <p><input value={gasPassAmount} onChange={e => setGasPassAmount(e.target.value)} type="text" placeholder="Gas Pass Amount" /></p>
                      </Fragment>
                    )}
                    <p>
                      <br/>
                      <button onClick={handleReset}>Reset</button>&nbsp;&nbsp;&nbsp;&nbsp;
                      <button onClick={handleDistribute} type="submit" disabled={!isReadyToDistribute}>Distribute</button>
                    </p>
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
