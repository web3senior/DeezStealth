import { Outlet, useNavigate, useNavigation, useParams, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { MetaMaskButton, useAccount, useSDK, useSignMessage, MetaMaskUIProvider } from '@metamask/sdk-react-ui'
import Logo from './../assets/logo.png'
import styles from './UserRoot.module.scss'

export default function UserRoot(props) {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const params = useParams()
  const { pathname } = useLocation()

  return (
    <>
      <Toaster />
      <header className={`${styles.header} d-flex justify-content-between`}>
        <figure className="animate__animated animate__fadeIn">
          <img alt="logo" src={Logo} />
          <figcaption>{import.meta.env.VITE_TITLE}</figcaption>
        </figure>

        <MetaMaskUIProvider
          sdkOptions={{
            dappMetadata: {
              name: 'DeezStealth Dapp',
              url: document.url,
            },
            checkInstallationImmediately: false,
          }}
        >
          <MM />
        </MetaMaskUIProvider>
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

const MM = () => {
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: 'sssssssssssssss',
  })

  const { isConnected } = useAccount()
  return (
    <>
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
    </>
  )
}
