import logoImage from '../assets/logo/harijadikita_logo.png'
import { useNavigate } from 'react-router-dom'

export default function Logo() {
  const navigate = useNavigate()
  return (
    <div className='logo_wrapper' onClick={() => navigate('/')}>
        <img className='logo_image' src={logoImage} alt='logo'/>
        <h1 className='logo_text'>harijadikita</h1>
    </div>
  )
}
