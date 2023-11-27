import logoImage from '../assets/logo/harijadikita_logo.png'
import { CiBellOn } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import sampleFoto from '../assets//foto_sample/Ellipse.png'
import { useState } from 'react';
import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'
import { RiCloseLine } from "react-icons/ri";

type EditProp = {
    isEdit: boolean
    onClick?: () => void
}

type ShowModalProp = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountPage = () => {
    const [isEdit, setIsEdit] = useState(false)
    const onClick = () => {
        setIsEdit(!isEdit)
    }
    const [showModal, setShowModal] = useState(false)
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
            <SocmedButton isEdit={isEdit} showModal={showModal} setShowModal={setShowModal} />
            <div className='rinperbutton_container'>
                <button type="submit" className="keluar_btn">
                    Keluar
                </button>
            </div>
            {showModal && <ModalPutusTautan showModal={showModal} setShowModal={setShowModal} />}
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

const SocmedButton = ({ isEdit, showModal, setShowModal }: EditProp & ShowModalProp) => {
    const tautText = 'Tautkan akun'
    const acc = 'herlambangdes@gmail.com'
    const displayTxt = isEdit ? tautText : acc

    return (
        <div className='btn_form_container'>
            <button type="submit" id="submitBtn" className="soc_med_btn" onClick={() => setShowModal(!showModal)}>
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

const ModalPutusTautan = ({ showModal, setShowModal }: ShowModalProp) => {

    return (
        <>
            <div className="darkBG" onClick={() => setShowModal(!showModal)} />
            <div className="centered">
                <div className="modal">
                    <button className="closeBtn" onClick={() => setShowModal(!showModal)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="modalContent">
                        <h1>Putuskan tautan?</h1>
                        <button className="deleteBtn" onClick={() => setShowModal(!showModal)}>
                            Ya, putuskan
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AccountPage