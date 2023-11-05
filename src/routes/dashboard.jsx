import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import { getTokens } from './../util/decommas'
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

  const getWalletAddress = async () => {
    return await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  useEffect(() => {
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
    getWalletAddress().then((result) => {
      console.log(result)
      getTokens(result[0]).then((res) => {
        console.log(res)
        setTokens(res)
      })
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>

{
  tokens && <>
  {tokens.count}


  </>
}


        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </div>
    </section>
  )
}
