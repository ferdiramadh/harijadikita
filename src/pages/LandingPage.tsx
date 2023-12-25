import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const LandingPage = () => {
  const { user } = UserAuth()
  const checkSignIn = () => {
    if(user == null) return '/signin'
    return '/home'
  }
  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <div>
        <h1>Landing Page Ceritanya</h1>
        <Link to={checkSignIn()}>Sign In</Link>
      </div>
    </div>

  )
}

export default LandingPage