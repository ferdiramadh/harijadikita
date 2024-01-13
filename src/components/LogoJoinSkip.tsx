import logoImage from '../assets/logo/harijadikita_logo.png'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"

export default function LogoJoinSkip() {
    const navigate = useNavigate()
    return (
        <div className='logo_wrapper_skip' onClick={() => navigate('/')}>
            <img className='logo_image' src={logoImage} alt='logo' />
            <button type='button' onClick={() => alert("skipped")} className='skip_btn'>
                <h2>Lewati</h2>
                <FaArrowRight size={20} color='#474747'/>
            </button>
        </div>
    )
}
