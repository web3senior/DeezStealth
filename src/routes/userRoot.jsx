import { Outlet, useNavigate, useNavigation, useParams, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {
  MetaMaskButton, useAccount,
  useSDK,
  useSignMessage
} from '@metamask/sdk-react-ui';
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
    message: 'gm wagmi frens',
  });

  const { isConnected } = useAccount();

  return (
    <>
      <Toaster />
      <header className={styles.header} >
      <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
        {isConnected && (
          <>
            <div style={{ marginTop: 20 }}>
              <button disabled={isSignLoading} onClick={() => signMessage()}>
                Sign message
              </button>
              {isSignSuccess && <div>Signature: {signData}</div>}
              {isSignError && <div>Error signing message</div>}
            </div>
          </>
        )}
        </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        {pathname.search('/user/request') <= -1 && (
          <>
            <button onClick={() => navigate(`/user/request`)}>9</button>
            <button onClick={() => navigate(`/user/account`)}>9  9</button>
          </>
        )}
      </footer>
    </>
  )
}
