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

const MenuPage = () => {

    return (
        <section className='menu_page'>
            <nav className='nav_bar'>
                <img className='logo_image' src={logoImage} alt='logo' />
                <div className='btn_wrapper'>
                    <IoMdClose size={30} />
                </div>
            </nav>
            <nav className='menu_list'>
                <div className='cust_profile'>
                    <img className='sample_image' src={sampleFoto} alt='sample' />
                    <h1>Hai, Nama Customer</h1>
                </div>
                <div className='item'>
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
                <div className='item left'>
                    <img src={Rings} alt='home' />
                    <h1>Rincian pernikahan</h1>
                </div>
                <div className='item left'>
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