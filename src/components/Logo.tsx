import logoImage from '../assets/logo/harijadikita_logo.png'

export default function Logo() {
  return (
    <div className='logo_wrapper'>
        <img className='logo_image' src={logoImage} alt='logo'/>
        <h1 className='logo_text'>harijadikita</h1>
    </div>
  )
}
