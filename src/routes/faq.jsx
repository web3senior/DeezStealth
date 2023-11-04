import { Title } from './helper/DocumentTitle'
import styles from './Faq.module.scss'

const data = [
  {
    q: 'quesasdfasdfasdf?',
    a: 'AnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewr',
  },
  {
    q: 'quesasdfasdfasdf?',
    a: 'AnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewr',
  },
  {
    q: 'quesasdfasdfasdf?',
    a: 'AnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewrAnserwerwrewr',
  },
]

export default function FAQ({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`medium`}>
        <ul>
          {data.map((item, i) => {
            return (
              <li>
                <details open={i === 0 ? true : false} className="ms-depth-4 text-justify">
                  <summary>{item.q}</summary>
                  <div>{item.a}</div>
                </details>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
