import { UserAuth } from '../context/AuthContext'

const TemporerHomePage = () => {
  const { user, logOut, userName } = UserAuth()
  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
      <div>
        <h3>Welcome, {user?.displayName || userName}</h3>
        {user ? <button onClick={handleLogout}>Logout</button> : null}
      </div>
    </div>
  )
}

export default TemporerHomePage