import logoImage from '../assets/logo/harijadikita_logo.png'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import { JoinPageType } from '../pages/JoinPage'

export default function LogoJoinSkip({ storingData }: Partial<JoinPageType>) {
    const navigate = useNavigate()
    return (
        <div className='logo_wrapper_skip'>
            <img className='logo_image' src={logoImage} alt='logo' onClick={() => navigate('/')}/>
            <button type='button' onClick={storingData} className='skip_btn'>
                <h2>Lewati</h2>
                <FaArrowRight size={20} color='#474747' />
            </button>
        </div>
    )
}
