import { useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import styles from './Welcome.module.scss'
import DeezStealthSVG from './components/DeezStealthSVG.jsx'
import { MetaMaskButton, useAccount, useSDK, useSignMessage } from '@metamask/sdk-react-ui'

export const loader = async () => {
  return defer({
    chainId: null,
  })
}

function Welcome({ title }) {
  Title(title)
  const navigate = useNavigate()

  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: '',
  })

  const { isConnected } = useAccount()

  return (
    <section className={styles.section}>
      <figure style={{ width: '240px' }}>
        <DeezStealthSVG />
      </figure>
      <div>
        <h4>{import.meta.env.VITE_TITLE}</h4>
        <p>Create Stealth Addresses and batch send tokens</p>

        {isConnected &&  <button onClick={() => navigate('/user')} className="mt-20">₿ Dashboard</button>}

        {!isConnected && <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>}

        <button onClick={() => navigate('/about')} className="mt-20">🥷  About Team</button>

        <small className={styles.version}>V 1.0.0</small>
      </div>
    </section>
  )
}

export default Welcome
