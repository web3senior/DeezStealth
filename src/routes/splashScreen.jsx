import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Logo from './../assets/logo.png'
import styles from './SplashScreen.module.scss'

const SplashScreen = ({ title }) => {
  Title(title)
  const navigate = useNavigate()
  const frameRef = useRef()

  useEffect(() => {
    // Close the page
    window.setTimeout(() => {
      frameRef.current.classList.add('animate__fadeOutUp')
    }, 1000)

    // Navifate to
    window.setTimeout(() => {
       navigate('/welcome')
    }, 1500)
  }, [])

  return (
    <section className={`${styles.section} animate__animated animate__fadeIn`} ref={frameRef}>
      <figure>
        <img alt={import.meta.env.VITE_NAME} src={Logo} />
      </figure>
    </section>
  )
}

export default SplashScreen
