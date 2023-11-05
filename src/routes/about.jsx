import { Title } from './helper/DocumentTitle'
import styles from './About.module.scss'
import Heading from './helper/Heading'
import BorisAvatar from './../assets/boris.png'
import TantodefiAvatar from './../assets/tantodefi.jpeg'
import AmirAvatar from './../assets/amir.png'
import GitHubIcon from './../assets/github.svg'

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

const team = [
  {
    avatar: BorisAvatar,
    fullname: 'bshevchenko',
    username: 'bshevchenko',
  },
  {
    avatar: TantodefiAvatar,
    fullname: 'Tantodefi',
    username: 'tantodefi',
  },
  {
    avatar: AmirAvatar,
    fullname: 'Amir Rahimi',
    username: 'web3senior',
  },
]

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <Heading title={title} />
      <div className={`__container ms-motion-slideUpIn ${styles.container}`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
        <div className='card__header'>
          <h4>About Us</h4>
          </div>
          <div className="card__body">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        <div className={`card ms-depth-4 text-justify mt-20`}>
        <div className='card__header'>
          <h4>FAQ</h4>
          </div>
          <div className="card__body">
            <ul>
              {data.map((item, i) => {
                return (
                  <li key={i}>
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

        <div className={`${styles.team} card ms-depth-4 text-justify mt-20`}>
          <div className="card__header">
            <h4>Our team</h4>
          </div>
          <div className="card__body">
            <ul className={`grid grid--fit`} style={{ '--data-width': '150px' }}>
              {team.map((item, i) => {
                return (
                  <li className="grid__item" key={i}>
                    <figure>
                      <img alt={item.fullname} src={item.avatar} />
                    </figure>

                    <b>{item.fullname}</b>

                    <a href={`https://github.com/${item.username}`} target="_blank"  rel="noreferrer">
                      <img alt="GitHub Icon" src={GitHubIcon} />
                    </a>
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
