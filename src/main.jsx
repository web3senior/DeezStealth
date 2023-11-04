import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
const Root = lazy(() => import('./routes/root'))
const Layout = lazy(() => import('./routes/layout'))
import SplashScreen from './routes/splashScreen.jsx'
import Welcome from './routes/welcome.jsx'
import Home, { loader as homeLoader } from './routes/home.jsx'
import Login from './routes/login.jsx'
import About from './routes/about.jsx'
import Dashboard from './routes/dashboard.jsx'
import FAQ from './routes/faq.jsx'
import Loading from './routes/components/LoadingSpinner'

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
        element: <Welcome title={`welcome`} />,
      },
      {
        path: 'about',
        element: <About title={`about us`} />,
      },
      {
        path: 'setting',
        element: <></>,
      },
      {
        path: 'faq',
        element: <FAQ title={`faq`} />,
      },
      {
        path: 'login',
        element: <Login title={`login`} />,
      },
    ],
  },
  {
    path: 'user',
    element: (
      <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard to={`dashboard`} />,
          },
          {
            path: 'sender',
            loader: ()=>[],
            element: <></>,
          },
          {
            path: 'receiver',
            loader: ()=>[],
            element: <></>,
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
