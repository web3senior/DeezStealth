import { Title } from './helper/DocumentTitle'
import styles from './About.module.scss'
import Heading from './helper/Heading'

const data = [
  {
    q: 'What is DeezStealth?',
    a: '🥷DeezStealth is a dApp that helps users create stealth addresses for doing batch send token transfers.',
  },
  {
    q: 'How does it work?',
    a: 'Users can upload a CSV file to bulk create stealth addresses and then run a distibute function to batch send/transfer tokens.',
  },
  {
    q: 'What Networks does it support?',
    a: 'Receivers can choose to withdraw their funds on any EVM compatible chain. The DeezStealth smart contract is deployed on both Linea Goerli Testnet and Linea Mainnet Blockchains.',
  },
  {
    q: 'Have Feedback?',
    a: 'Got a feature request or a found a bug in our dApp, submit this {<a>typeform</a>}',
  },
]

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <Heading title={title} />
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className="card__body">
            <p>Introduce team here</p>

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
        </div>
      </div>
    </section>
  )
}
