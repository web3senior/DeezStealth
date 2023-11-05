import { useState, useEffect } from 'react'
import { useLoaderData, defer } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import { getTokens, getTransaction } from './../util/decommas'
import styles from './Dashboard.module.scss'
import Loading from './../routes/components/LoadingSpinner'
import DefaultIcon from './../assets/default-token-icon.png'

export const loader = async () => {
  return defer({
    chainId: await window.ethereum.request({ method: 'eth_chainId' }),
    accounts: await window.ethereum.request({ method: 'eth_requestAccounts' }),
  })
}

export default function Dashboard({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [ERC20tokens, setERC20tokens] = useState([])
  const [transaction, setTransaction] = useState([])

  useEffect(() => {
    window.ethereum.on('chainChanged', () => window.location.reload())
    let userWalletAddress = loaderData.accounts[0]

    getTokens(userWalletAddress).then((res) => {
      console.log('Tokens => ', res)
      setERC20tokens(res.result)
    })

    // getTransaction(userWalletAddress).then((res) => {
    //   console.log('Transaction => ', res)
    //   setTransaction(res)
    // })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        
      
        {ERC20tokens && ERC20tokens.length > 0 && (
          <>
            {ERC20tokens.map((item, i) => {
              return (
                <div className={`card ${styles.token}`} key={i}>
                  <div className="card__body">
                    <ul className="d-flex align-items-center justify-content-start">
                      <li>
                        <figure>
                          <img src={item.logo_url !== null ? item.logo_url : DefaultIcon} alt={`${item.name} Icon`} />
                        </figure>
                      </li>
                      <li>
                        {item.name}
                        <br />
                        {item.amount}({item.symbol})
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
