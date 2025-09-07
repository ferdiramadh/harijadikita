import { UserAuth } from '../context/AuthContext'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const TemporerHomePage = () => {

  const { uid, email } = useSelector((state: RootState) => state.user)
  const { userAcc } = UserAuth()

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column', marginTop: 60 }}>
      {/* <HamburgerMenu /> */}
      <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column' }}>
        <h3>Welcome, {userAcc?.displayName} {uid} {email}</h3>
        {/* <button onClick={() => navigate("/rinciandesain")}>GO To Edit Rincian Desain </button> */}
      </div>
    </div>
  )
}

export default TemporerHomePage