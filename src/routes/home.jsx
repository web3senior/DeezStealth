import { useState, Suspense } from 'react'
import { useLoaderData, defer, Await } from 'react-router-dom'
import Loading from './components/LoadingSpinner'
import { getCategory, getFood } from '../util/api'
import toast from 'react-hot-toast'
import { Title } from './helper/DocumentTitle'
import styles from './Home.module.scss'

export const loader = async () => {
  return defer({
    category: ['']
  })
}

function App({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const [data, setData] = useState(useLoaderData().food)


  return (
    <section className={`${styles.section} animate pop`}>
     
      {/* <Suspense fallback={<Loading />}>
        <Await resolve={data} errorElement={<p className="alert alert--danger">Error in fetching data!</p>}>
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
      </Suspense> */}

    </section>
  )
}

export default App
