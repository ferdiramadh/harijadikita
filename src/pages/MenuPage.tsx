import logoImage from '../assets/logo/harijadikita_logo.png'
import { IoMdClose } from "react-icons/io";
import sampleFoto from '../assets//foto_sample/Ellipse.png'
import { BsEye } from "react-icons/bs"
import { RiShareForwardLine } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import Home from '../assets/menu/home.svg'
import Rings from '../assets/menu/rings.svg'
import Envelope from '../assets/menu/envelope.svg'
import Guest from '../assets/menu/guest.svg'
import Payment from '../assets/menu/payment.svg'
import Help from '../assets/menu/help.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

type MenuPageType = {
    isOpen: boolean
    toggleMenu: () => void
}
const MenuPage = ({ isOpen, toggleMenu }: MenuPageType) => {
    const navigate = useNavigate()
    const [accountClassName, setAccountClassName] = useState('cust_profile')
    const { userAcc, setOpenMenu } = UserAuth()
    const userName = userAcc?.displayName ? userAcc.displayName : "User"
    const onClick = () => {
        // setAccountClassName('cust_profile colored')
        setTimeout(() => {
            navigate('/akun')
            setOpenMenu(false)
        }, 500)
    }
    const goToAturUndangan = () => {

        setTimeout(() => {
            navigate("/rinciandesain")
            setOpenMenu(false)
        }, 500)
    }

    return (
        <section className='menu_page'>
            <nav className='nav_bar'>
                <img className='logo_image' src={logoImage} alt='logo' onClick={() => {
                    navigate('/home')
                    setOpenMenu(false)
                }} />
                <button className="hamburger-button" onClick={toggleMenu}>
                    <div className={`icon ${isOpen ? 'open' : ''}`}>
                        <span />
                        <span />
                        <span />
                    </div>
                </button>
            </nav>
            <nav className='menu_list'>
                <div className={accountClassName}
                    onClick={onClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onClick();
                        }
                    }}>
                    <div className='photo_circle'>
                        <p className='user_name'>{userName[0].toUpperCase()}</p>
                    </div>
                    <h1>Hai, {userName}</h1>
                </div>
                <div className='item' >
                    <h1>Lihat undangan</h1>
                    <BsEye size={30} color='#474747' />
                </div>
                <div className='item'>
                    <h1>Bagikan undangan</h1>
                    <RiShareForwardLine size={30} color='#474747' />
                </div>
                <div className='item'>
                    <h1>Salin undangan</h1>
                    <IoCopyOutline size={30} color='#474747' />
                </div>
                <div className='item colored'>
                    <img src={Home} alt='home' />
                    <h1>Beranda</h1>
                </div>
                <div className='item left'
                    onClick={goToAturUndangan}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            goToAturUndangan();
                        }
                    }}
                >
                    <img src={Envelope} alt='home' />
                    <h1>Atur undangan</h1>
                </div>
                <div className='item left'>
                    <img src={Guest} alt='home' />
                    <h1>Tamu dan undangan</h1>
                </div>
                <div className='item left'>
                    <img src={Payment} alt='home' />
                    <h1>Pembayaran</h1>
                </div>
                <div className='item left'>
                    <img src={Help} alt='home' />
                    <h1>Bantuan</h1>
                </div>
            </nav>

        </section>
    )
}


export default MenuPage 