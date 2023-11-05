import { useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import styles from './Welcome.module.scss'
import DeezStealthSVG from './components/DeezStealthSVG.jsx'

function Welcome({ title }) {
  Title(title)
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <figure style={{ width: '240px' }}>
        <DeezStealthSVG />
        <figcaption>{import.meta.env.VITE_TITLE}</figcaption>
      </figure>
      <div>
        <h4>Welcome</h4>
        <p>First, connect your wallet then see the all features.</p>
        {
          
          typeof window.ethereum !== 'undefined' && <div className='alert alert--success'>MetaMask is installed. Let's run the app</div>
        }
        <button onClick={() => navigate('/user')}>Run app</button>
        <button onClick={() => navigate('/about')} className='mt-20'>About Team</button>
        <button onClick={() => navigate('/faq')} className='mt-20'>FAQ</button>
      </div>
    </section>
  )
}

export default Welcome