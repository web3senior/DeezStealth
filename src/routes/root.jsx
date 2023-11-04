import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import styles from './Root.module.scss'

export default function Root() {
  return (
    <>
      <Toaster />
      <header className={styles.header} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer} />
    </>
  )
}
