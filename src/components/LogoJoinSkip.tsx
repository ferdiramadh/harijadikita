import logoImage from '../assets/logo/harijadikita_logo.png'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import { UserAuth } from '../context/AuthContext'
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"

export default function LogoJoinSkip() {

  const navigate = useNavigate()
  const { setIsFinishJoin, data } = UserAuth()
  const skipData = async () => {
    try {
      setIsFinishJoin(false)
      const docRef = await addDoc(collection(db, "userdata"), data)
      console.log(docRef)
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
