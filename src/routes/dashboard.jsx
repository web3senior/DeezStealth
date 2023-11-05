import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import styles from './About.module.scss'
import Loading from './../routes/components/LoadingSpinner'

export const loader = async () => {
  return defer({
    chainId: await window.ethereum.request({ method: 'eth_chainId' }),
    accounts: await window.ethereum.request({ method: 'eth_requestAccounts' })
  })
}

export default function Dashboard({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const [data, setData] = useState([])

  const getChainId = async () => {
    return 0
  }

  useEffect(() => {
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
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
