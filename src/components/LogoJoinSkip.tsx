import logoImage from '../assets/logo/harijadikita_logo.png'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import { UserAuth } from '../context/AuthContext'
import { RINCIAN_PERNIKAHAN } from '../database/Collections'
import { addDocWithId } from '../database/Functions'
import { setRincianPernikahan } from '../redux/state/rinper/rinperSlice'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'

export default function LogoJoinSkip() {

  const navigate = useNavigate()
  const { setIsFinishJoin, userAcc, setData, INITIAL_DATA, data } = UserAuth()
  const dispatch = useDispatch<AppDispatch>()
  const skipData = async () => {
    try {
      setIsFinishJoin(false)
      const result = await addDocWithId(RINCIAN_PERNIKAHAN, data, userAcc?.uid)
      dispatch(setRincianPernikahan(result))
      setData(INITIAL_DATA)
      navigate('/home')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='logo_wrapper_skip'>
      <img className='logo_image' src={logoImage} alt='logo' onClick={() => navigate('/')} />
      <button type='button' onClick={skipData} className='skip_btn'>
        <h2>Lewati</h2>
        <FaArrowRight size={20} color='#474747' />
      </button>
    </div>
  )
}

