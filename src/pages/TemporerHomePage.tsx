import { UserAuth } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { resetDesainUndangan } from '../redux/state/desainundangan/desainUndanganSlice'

const TemporerHomePage = () => {

  const navigate = useNavigate()
  const { uid, email } = useSelector((state: RootState) => state.user)
  const { logOut, userAcc, user, setUserAcc } = UserAuth()
  const dispatch = useDispatch<AppDispatch>()
  const handleLogout = async () => {
    try {
      dispatch(resetDesainUndangan())
      await logOut()
      setUserAcc({})
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column' }}>
      <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column' }}>
        <h3>Welcome, {userAcc?.displayName} {uid} {email}</h3>
        {user ? <button onClick={handleLogout}>Logout</button> : null}
        <button onClick={() => navigate("/rinciandesain")}>GO To Edit Rincian Desain </button>
      </div>
    </div>
  )
}

export default TemporerHomePage