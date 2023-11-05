import { Outlet, useNavigate, useNavigation, useParams, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { MetaMaskButton, useAccount, useSDK, useSignMessage } from '@metamask/sdk-react-ui'
import Logo from './../assets/logo.png'
import styles from './UserRoot.module.scss'

export default function UserRoot(props) {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const params = useParams()
  const { pathname } = useLocation()

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
    <>
      <Toaster />
      <header className={`${styles.header} d-flex justify-content-between`}>
        <figure className='animate__animated animate__fadeIn'>
          <img alt="logo" src={Logo} />
          <figcaption>{import.meta.env.VITE_TITLE}</figcaption>
        </figure>

        <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>

        {isConnected && (
          <>
            {/* <div style={{ marginTop: 20 }}>
              <button disabled={isSignLoading} onClick={() => signMessage()}>
                Sign message
              </button>
              {isSignSuccess && <div>Signature: {signData}</div>}
              {isSignError && toast.error(`Error signing message`)}
            </div> */}
          </>
        )}
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={`${styles.footer} d-flex justify-content-between align-items-center`}>
      <button onClick={() => navigate(`/user/`)}>Dashboard</button>
      <button onClick={() => navigate(`/user/sender`)}>Sender</button>
        <button onClick={() => navigate(`/user/receiver`)}>Receiver</button>
      </footer>
    </>
  )
}
