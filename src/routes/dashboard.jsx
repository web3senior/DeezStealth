import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import { getTokens, getCoin } from './../util/decommas'
import styles from './About.module.scss'
import Loading from './../routes/components/LoadingSpinner'

export const loader = async () => {
  return defer({
    chainId: await window.ethereum.request({ method: 'eth_chainId' }),
    accounts: await window.ethereum.request({ method: 'eth_requestAccounts' }),
  })
}

export default function Dashboard({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const [tokens, setTokens] = useState([])
  const [coin, setCoin] = useState([])

  const getWalletAddress = async () => {
    return await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  useEffect(() => {
    window.ethereum.on('chainChanged', () => window.location.reload())

    // After reading user's wallet
    getWalletAddress().then((address) => {
      getTokens(address[0]).then((res) => {
        console.log('Tokens => ', res)
        setTokens(res.result)
      })


    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        {coin && coin.length > 0 && (
          <>
            {coin.map((item, i) => {
              return (
                <div className="card" key={i}>
                  <div className="card__body">
                    <figure>
                      <img src={item.logo_url} alt={`${item.name} Icon`} />
                    </figure>
                    {item.name}({item.symbol}){item.chain_name}
                    <mark>
                      {item.actual_price}$ | {item.amount}
                    </mark>
                  </div>
                </div>
              )
            })}
          </>
        )}

        {tokens && tokens.length > 0 && (
          <>
            {tokens.map((item, i) => {
              return (
                <div className="card" key={i}>
                  <div className="card__body">
                    {item.name}({item.symbol}){item.chain_name}
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
