import { UserAuth } from '../context/AuthContext'

const TemporerHomePage = () => {
  const { logOut, userAcc, user, setUserAcc } = UserAuth()
  const handleLogout = async () => {
    try {
      await logOut()
      setUserAcc({})
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
      <div>
        <h3>Welcome, {userAcc?.displayName}</h3>
        {user ? <button onClick={handleLogout}>Logout</button> : null}
      </div>
    </div>
  )
}

export default TemporerHomePage