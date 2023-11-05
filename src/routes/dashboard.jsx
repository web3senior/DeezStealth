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
                <li className={`${styles.foodItem} card item${item.id} food-item--active`} key={i} onClick={(e) => handleAddToCart(item.id)}>
                  <div className={`${styles.foodItemBody} card__body`}>
                    <figure className={styles.foodItemImage}>
                      <img alt={item.name} src={`${import.meta.env.VITE_UPLOAD_URL}images/${item.img || 'logo-watermark.png'}`} />
                    </figure>
                    <h6 className={styles.foodItemName}>{item.name}</h6>
                    <small className={styles.foodItemDescription}>{item.description}</small>
                    <div className={`${styles.foodItemPrice} d-flex align-items-center justify-content-center`} style={{ columnGap: '.3rem' }}>
                      <span>{new Intl.NumberFormat('fa-IR', { maximumSignificantDigits: 3 }).format(item.price)}</span>
                      <span className="text text-danger ff-dastnevis">تومان</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>


      </div>
    </section>
  )
}
