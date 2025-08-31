import logoImage from '../assets/logo/harijadikita_logo.png'
import { CiBellOn } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import sampleFoto from '../assets//foto_sample/Ellipse.png'
import { useState } from 'react';
import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'
import { RiCloseLine } from "react-icons/ri";
import HamburgerMenu from '../components/HamburgerMenu';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth';

type EditProp = {
    isEdit: boolean
    onClick?: () => void
    onCancel?: () => void
}

type ShowModalProp = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

type AccountProp = {
    name: string
    email: string
}
const AccountPage = () => {
    const [isEdit, setIsEdit] = useState(false)
    const onClick = () => {
        setIsEdit(!isEdit)
    }
    const [showModal, setShowModal] = useState(false)
    return (
        <section className='account_page'>
            {/* <HamburgerMenu /> */}
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
            <AccountMain isEdit={isEdit} onClick={onClick} onCancel={() => setIsEdit(false)} />
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

const AccountMain = ({ isEdit, onClick, onCancel }: EditProp) => {
    const { user, userAcc } = UserAuth()
    console.log(userAcc)
    const [name, setName] = useState<string>(userAcc?.displayName)
    const [currentEmail, setCurrentEmail] = useState<string>(userAcc?.email)
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const reset = () => {
        setName(userAcc?.displayName)
        setCurrentEmail(userAcc?.email)
        onCancel && onCancel()
    }
    const handleUpdate = async () => {

        const user = auth.currentUser;

        if (user && currentEmail) {
            try {
                // Reauthenticate with current credentials
                const credential = EmailAuthProvider.credential(currentEmail, password);
                await reauthenticateWithCredential(user, credential);
                // Update email (if entered)
                if (newEmail) {
                    await updateEmail(user, newEmail);
                    console.log("Email updated!");
                }

                // Update password (if entered)
                if (newPassword) {
                    await updatePassword(user, newPassword);
                    console.log("Password updated!");
                }

                alert("Account updated!");
            } catch (error: any) {
                alert(error.message);
            }
        }
    };
    return (
        <div className='acc_main'>
            {isEdit ?
                <div className='form_container'>
                    <input placeholder="Email baru" type="text" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                    <input placeholder="Nama" type="text" value={name} onChange={e => setName(e.target.value)} />
                    <input placeholder="Password lama" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <input placeholder="Password baru" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                :
                <AccountDetail name={userAcc?.displayName} email={userAcc?.email} />}
            {isEdit && <button className='cancel_btn' onClick={reset}>Batal</button>}
            <button className='save_btn' onClick={isEdit ? handleUpdate : onClick}>{isEdit ? 'Simpan' : 'Ubah'}</button>
            <hr />
        </div>
    )

}

const AccountDetail = ({ name, email }: AccountProp) => {
    return (
        <div className='display_container'>
            <p className='acc_text_display'>Nama: {name}</p>
            <p className='acc_text_display'>Emai: {email}</p>
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