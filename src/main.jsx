import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
const Root = lazy(() => import('./routes/root'))
const UserRoot = lazy(() => import('./routes/userRoot'))
import SplashScreen from './routes/splashScreen.jsx'
import Welcome from './routes/welcome.jsx'
import Dashboard from './routes/dashboard.jsx'
import About from './routes/about.jsx'
import Sender from './routes/sender.jsx'
import Receiver from './routes/receiver.jsx'
import Loading from './routes/components/LoadingSpinner'

// Dev Message
console.clear()
console.log(`%c ⟠`, 'color:#2bb18b;font-size:8rem')

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Root />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SplashScreen title={`DeezStealth`} />,
      },
      {
        path: 'welcome',
        element: (
          <>
            <MetaMaskUIProvider
              sdkOptions={{
                dappMetadata: {
                  name: 'DeezStealth Dapp',
                  url: document.url,
                },
                checkInstallationImmediately: false,
              }}
            >
              <Welcome title={`Welcome`} />
            </MetaMaskUIProvider>
          </>
        ),
      },
      {
        path: 'about',
        element: <About title={`About Us`} />,
      },
      {
        path: 'setting',
        element: <></>,
      },
    ],
  },
  {
    path: 'user',
    element: (
      <Suspense fallback={<Loading />}>
        <UserRoot />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard title='Dashboard' to={`dashboard`} />,
          },
          {
            path: 'sender',
            loader: () => [],
            element: <Sender title='Sender' to={`sender`} />,
          },
          {
            path: 'receiver',
            loader: () => [],
            element: <Receiver title='Receiver' to={`receiver`} />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
