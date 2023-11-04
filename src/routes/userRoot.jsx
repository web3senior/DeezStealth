import { Outlet, useNavigate, useNavigation, useParams, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import styles from './UserRoot.module.scss'

export default function UserRoot(props) {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const params = useParams()
  const { pathname } = useLocation()

  return (
    <>
      <Toaster />
      <header className={styles.header} />

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
