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
import Welcome, {loader as welcomeLoader} from './routes/welcome.jsx'
import Home, { loader as homeLoader } from './routes/home.jsx'
import About from './routes/about.jsx'
import Dashboard, { loader as dashboardLoader } from './routes/dashboard.jsx'
import Sender from './routes/sender.jsx'
import Receiver from './routes/receiver.jsx'
import Loading from './routes/components/LoadingSpinner'

console.log(`%c ⟠`,'color:#2bb18b;font-size:8rem')

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <MetaMaskUIProvider
          sdkOptions={{
            dappMetadata: {
              name: 'DeezStealth Dapp',
              url: document.url,
            },
            checkInstallationImmediately: false,
          }}
        >
          <Root />
        </MetaMaskUIProvider>
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
        element: <Welcome title={`welcome`} />,
      },
      {
        path: 'about',
        element: <About title={`about us`} />,
      },
      {
        path: 'setting',
        element: <></>,
      }
    ],
  },
  {
    path: 'user',
    element: (
      <Suspense fallback={<Loading />}>
        <MetaMaskUIProvider
          sdkOptions={{
            dappMetadata: {
              name: 'DeezStealth Dapp',
              url: document.url,
            },
            checkInstallationImmediately: false,
          }}
        >
          <UserRoot />
        </MetaMaskUIProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader: dashboardLoader,
            element: <Dashboard to={`dashboard`} />,
          },
          {
            path: 'sender',
            loader: () => [],
            element: <Sender to={`sender`} />,
          },
          {
            path: 'receiver',
            loader: () => [],
            element: <Receiver to={`receiver`} />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
