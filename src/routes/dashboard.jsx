import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import _ from 'lodash'
import { Title } from './helper/DocumentTitle'
import { getTokens, getTransaction } from './../util/decommas'
import styles from './Dashboard.module.scss'
import DefaultIcon from './../assets/default-token-icon.png'

export default function Dashboard({ title }) {
  Title(title)
  const [ERC20tokens, setERC20tokens] = useState()
  const [transaction, setTransaction] = useState()
  const [openTab, setOpenTab] = useState('token')

  const getWalletAddress = async () => {
    return await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  useEffect(() => {
    window.ethereum.on('chainChanged', () => window.location.reload())

    getWalletAddress().then((address) => {
      console.log(address[0])

      getTokens(address[0]).then((res) => {
        console.log('Tokens => ', res)
        const grouped = _.groupBy(res.result, 'chain_name')
        const categoryToAppearFirst = 'linea'
        const ordered = {
          [categoryToAppearFirst]: grouped[categoryToAppearFirst] || [],
          ..._.omit(grouped, categoryToAppearFirst)
        }
        setERC20tokens(ordered)
      })

      getTransaction(address[0]).then((res) => {
        console.log('Transaction => ', res)
        setTransaction(res.result)
      })
    })
  }, [])

  // function copy(text) {
  //   navigator.clipboard.writeText(text).then(() => {
  //     alert("successfully copied")
  //   })
  //   .catch(() => {
  //     alert("something went wrong")
  //   })
  // }

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <ul className={`d-flex align-items-center justify-content-around ${styles.tab}`}>
          <li>
            <button onClick={() => setOpenTab(`token`)} style={{ background: openTab === 'token' ? '#eee' : '' }}>
              Token
            </button>
          </li>
          <li>
            <button onClick={() => setOpenTab(`transaction`)} style={{ background: openTab === 'transaction' ? '#eee' : '' }}>
              Transaction
            </button>
          </li>
        </ul>

        {openTab === 'token' && ERC20tokens && (
          <>
            {Object.keys(ERC20tokens).map((chain_name) => (
              <div style={{ marginBottom: '2rem' }}>
                <h3>{chain_name}</h3>
                {!ERC20tokens[chain_name].length && 'You have no tokens on Linea network available for distribution.'}
                {ERC20tokens[chain_name].map((item, i) => (
                  <div className={`card ${styles.token}`} key={i}>
                    <div className="card__body">
                      <ul className="d-flex align-items-center justify-content-start">
                        <li>
                          <figure>
                            <img src={item.logo_url !== null ? item.logo_url : DefaultIcon} alt={`${item.name} Icon`} />
                          </figure>
                        </li>
                        <li>
                          <b>{item.name}</b>
                          <br />
                          {ethers.formatUnits(item.amount, item.decimals)} ({item.symbol})
                          <br />
                          <i>{(item.actual_price * ethers.formatUnits(item.amount, item.decimals)).toFixed(2)}$</i><br />
                          <p style={{ fontSize: '0.7rem' }}>{item.address}</p>
                          {/* <input type="text" value={item.address} disabled /><br /> */}
                          {/* {item.address.substring(0, 6)}...{item.address.substring(item.address.length - 6)}&nbsp;
                          <a onClick={() => { copy(item.address) }}>Copy</a> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )
            )}
          </>
        )}

        {openTab === 'transaction' && transaction && transaction.length > 0 && (
          <>
            {transaction.map((item, i) => {
              return (
                <div className={`card ${styles.token}`} key={i}>
                  <div className="card__body">
                    <ul className="d-flex align-items-center justify-content-start">
                      <li className="d-flex flex-column align-items-start justify-content-start">
                        <small>{new Date(item.block_timestamp) + ''}</small>
                        <a href={`https://etherscan.io/tx/${item.hash}`}>View on blockscan</a>
                        <p style={{ textOverflow: 'ellipsis' }}>From: {item.from_address}</p>
                        <p>To: {item.to_address}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )
            })}
          </>
        )}

        {/* <Suspense fallback={<Loading />}>
          <Await resolve={loaderData} errorElement={<p className="alert alert--danger">Error in fetching data!</p>}>
            {(data) => (
              <>
                <div className={`card text-justify`}>
                  <div className="card__body">
                    <p>Chain ID: {data.chainId}</p>
                    <p>Accounts: {data.accounts}</p>
                  </div>
                </div>
              </>
            )}
          </Await>
        </Suspense> */}
      </div>
    </section>
  )
}
