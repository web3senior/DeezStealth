import {Suspense,useEffect} from 'react'
import { useLoaderData, defer, Await, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import styles from './About.module.scss'
import Loading from './../routes/components/LoadingSpinner'

export const loader = async () => {
  return defer({
    chainId: await window.ethereum.request({ method: 'eth_chainId' }),
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
    getChainId().then((res) => {
      console.log(res)
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        
        <div className={`card text-justify`}>
          <div className="card__body">
            <p>asdf</p>
          </div>
        </div>


 <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.chainId} errorElement={<p className="alert alert--danger">Error in fetching data!</p>}>
          {(data) => (
            <ul className={`${styles.food} grid grid--fill`} style={{ '--data-width': '150px' }}>
              {data.map((item, i) => (
             
              ))}
            </ul>
          )}
        </Await>
      </Suspense>


      </div>
    </section>
  )
}
