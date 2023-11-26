import logoImage from '../assets/logo/harijadikita_logo.png'
import { CiBellOn } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import sampleFoto from '../assets//foto_sample/Ellipse.png'
import { useState } from 'react';
import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'

type EditProp = {
    isEdit: boolean
    onClick?: () => void
}

const AccountPage = () => {
    const [isEdit, setIsEdit] = useState(false)
    const onClick = () => {
        setIsEdit(!isEdit)
    }
    return (
        <section className='account_page'>
            <nav>
                <img className='logo_image' src={logoImage} alt='logo' />
                <div className='btn_wrapper'>
                    <CiBellOn size={30} />
                    <RxHamburgerMenu size={30} />
                </div>
            </nav>
            <div className='acc_title_sec'>
                <h1>Akun</h1>
            </div>
            <div className="acc_photo">
                <div className="photo_circle">
                    {!isEdit ? <img className='sample_image' src={sampleFoto} alt='sample' /> :
                        <FiUploadCloud size={40} color='rgba(0, 0, 0, 0.40)' />}
                </div>
                <h1>Upload foto</h1>
            </div>
            <AccountMain isEdit={isEdit} onClick={onClick} />
            <SocmedButton isEdit={isEdit} />
            <div className='rinperbutton_container'>
                <button type="submit" className="keluar_btn">
                    Keluar
                </button>
            </div>
        </section>
    )
}

const AccountMain = ({ isEdit, onClick }: EditProp) => {
    return (
        <div className='acc_main'>
            {isEdit ? <EditAccountDetail /> :
                <AccountDetail />}
            <button className='save_btn' onClick={onClick}>{isEdit ? 'Simpan' : 'Ubah'}</button>
            <hr />
        </div>
    )

}

const AccountDetail = () => {
    return (
        <div className='display_container'>
            <p className='acc_text_display'>Nama</p>
            <p className='acc_text_display'>Email</p>
            <p className='acc_text_display'>Password</p>
        </div>
    )
}

const EditAccountDetail = () => {
    return (
        <div className='form_container'>
            <input placeholder="Email" type="text" />
            <input placeholder="Nama" type="text" />
            <input placeholder="Password" type="text" />
            <input placeholder="Konfirmasi password" type="text" />
        </div>
    )
}

const SocmedButton = ({ isEdit }: EditProp) => {
    const tautText = 'Tautkan akun'
    const acc = 'herlambangdes@gmail.com'
    const displayTxt = isEdit ? tautText : acc

    return (
        <div className='btn_form_container'>
            <button type="submit" id="submitBtn" className="soc_med_btn" onClick={() => console.log('test')}>
                <img src={SvgGoogle} alt='google' />
                {displayTxt}
            </button>
            <button type="submit" id="submitBtn" className="soc_med_btn">
                <img src={SvgFb} alt='google' />
                {displayTxt}
            </button>
        </div>
    )
}
export default AccountPage