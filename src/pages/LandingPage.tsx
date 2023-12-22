import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <div>
        <h1>Landing Page Ceritanya</h1>
        <Link to='/signin'>Sign In</Link>
      </div>
    </div>

  )
}

export default LandingPage