import { Title } from './helper/DocumentTitle'
import { MetaMaskButton, useAccount, useSDK, useSignMessage } from '@metamask/sdk-react-ui'
import styles from './Login.module.scss'

function AppReady() {
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: 'gm wagmi frens',
  })

  const { isConnected } = useAccount()

  return (
    <div className="App">
      <header className="App-header">
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
    </div>
  )
}

export default function Login({ title }) {
  Title(title)
  const { ready } = useSDK()

  if (!ready) {
    return <div>Loading...</div>
  }

  return <AppReady />
}
