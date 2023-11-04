import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import styles from './Layout.module.scss'

export default function Layout() {
  const [cartCount, setCartCount] = useState(0)

  const readLocalStorage = async () => {
    let cart = await localStorage.getItem(`cart`)
    return await JSON.parse(cart)
  }

  useEffect(() => {
    readLocalStorage().then((cart) => {
      setCartCount(cart.length)
    })
  }, [])

  return (
    <>
      <Toaster />
      <header className={`${styles.header} d-flex flex-row-reverse align-items-center justify-content-between`}>
        <figure className={styles.header__menu}>
          <img alt={`menu`} src={`menuIcon`} />
        </figure>

        <Link to={`/cart`} className={`${styles.header__cart} d-flex flex-row align-items-center justify-content-between`}>
          <img alt={`cart`} src={`cartIcon`} />
          <span id={`cartCount`}>{cartCount}</span>
        </Link>

        <Link to={`/menu`} className={styles.header__logo}>
          <figure>
            <img alt={import.meta.env.VITE_NAME} src={`logo`} />
          </figure>
        </Link>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer} />
    </>
  )
}
