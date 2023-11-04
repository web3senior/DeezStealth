import { Title } from './helper/DocumentTitle'
import styles from './About.module.scss'

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>

          <div className="card__body">
            <p>
             Introduce team here
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
