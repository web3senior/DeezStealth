import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const isAuth = async () => {
  return await localStorage.getItem('walletAddress')
}

export function AuthProvider({ children }) {
  const [wallet, setWallet] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  function logout() {
    localStorage.removeItem('walletAddress')
    navigate('/welcome')
    setUser(null)
  }

  function resetPassword() {}

  useEffect(() => {
    isAuth().then((res) => {
      setLoading(false)
      if (res) {
        console.log(res)
        setWallet(res)
      } else {
        navigate('/login')
      }
    })
  }, [])

  const value = {
    wallet,
    logout,
    resetPassword,
  }

  if (!wallet) return <>Loading... !user</>

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
