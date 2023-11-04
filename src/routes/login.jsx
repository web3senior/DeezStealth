import { Title } from './helper/DocumentTitle'
import styles from './Login.module.scss'

export default function Login({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className="card__body">
            <p>login</p>
          </div>
        </div>
      </div>
    </section>
  )
}
