import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import styles from './Welcome.module.scss'
import DeezStealthSVG from './components/DeezStealthSVG.jsx'

import { getTokens, getTransaction } from './../util/decommas'
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'
import { MetaMaskButton, useAccount, useSDK, useSignMessage } from '@metamask/sdk-react-ui'


function Welcome({ title }) {
  Title(title)
  const navigate = useNavigate()
  const [ERC20tokens, setERC20tokens] = useState()
  const [transaction, setTransaction] = useState()

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

        {ERC20tokens && <>{JSON.stringify(ERC20tokens)}</>}
        <hr />
        {transaction && <>{JSON.stringify(transaction)}</>}

        <h4>{import.meta.env.VITE_TITLE}</h4>
        <p>Create Stealth Addresses and batch send tokens</p>



       {isConnected && (
          <button onClick={() => navigate('/user')} className={`mt-20 d-flex align-items-center justify-content-center`} style={{ columnGap: '.4rem' }}>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 0V4.8L8 6.62L4 0Z" fill="#8FFCF3" />
              <path d="M4 0L0 6.62L4 4.8V0Z" fill="#CABCF8" />
              <path d="M4 9.73V13L8 7.38L4 9.73Z" fill="#CBA7F5" />
              <path d="M4 13V9.73L0 7.38L4 13Z" fill="#74A0F3" />
              <path d="M4 8.98L8 6.62L4 4.8V8.98Z" fill="#CBA7F5" />
              <path d="M0 6.62L4 8.98V4.8L0 6.62Z" fill="#74A0F3" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 8.98L0 6.62L4 0L8 6.62L4 8.98ZM0.27 6.43L3.94 0.35V4.77L0.27 6.43ZM0.21 6.59L3.94 4.91V8.79L0.2 6.59H0.21ZM4.06 4.91V8.79L7.79 6.59L4.06 4.91ZM4.06 4.77L7.73 6.43L4.06 0.35V4.77Z"
                fill="#202699"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 9.68L0 7.38L4 13L8 7.37L4 9.68ZM0.45 7.78L3.94 9.79V12.69L0.44 7.79L0.45 7.78ZM4.06 9.79V12.69L7.56 7.79L4.06 9.79Z"
                fill="#202699"
              />
            </svg>
            Dashboard
          </button>
        )} 

        {!isConnected && <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>}




        <button onClick={() => navigate('/about')} className="mt-20">
          🥷 About
        </button>

        <small className={styles.version}>V 1.0.0</small>
      </div>
    </section>
  )
}

export default Welcome
