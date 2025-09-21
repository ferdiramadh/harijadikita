import { useState } from 'react';
import { RiCloseLine } from "react-icons/ri";
import HamburgerMenu from '../components/HamburgerMenu';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { resetDesainUndangan } from '../redux/state/desainundangan/desainUndanganSlice';
// import SocmedButton from '../components/SocmedButton';

export type EditProp = {
    isEdit: boolean
    onClick?: () => void
    onCancel?: () => void
}

export type ShowModalProp = {
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
    const { logOut, setUserAcc, userAcc } = UserAuth()
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = async () => {
        try {
            dispatch(resetDesainUndangan())
            await logOut()
            setUserAcc({})
        } catch (error) {
            alert(error)
        }
    }
    return (
        <section className='account_page'>
            {/* <HamburgerMenu /> */}
            <div className='acc_title_sec'>
                <h1>Akun</h1>
            </div>
            <AccountMain isEdit={isEdit} onClick={onClick} onCancel={() => setIsEdit(false)} />
            {/* <SocmedButton isEdit={isEdit} showModal={showModal} setShowModal={setShowModal} /> */}
            <div className='rinperbutton_container'>
                <button type="submit" className="keluar_btn" onClick={handleLogout}>
                    Keluar
                </button>
            </div>
            {showModal && <ModalPutusTautan showModal={showModal} setShowModal={setShowModal} />}
        </section>
    )
}

const AccountMain = ({ isEdit, onClick, onCancel }: EditProp) => {
    const { user, userAcc } = UserAuth()
    const [name, setName] = useState<string>(userAcc?.displayName)
    const [currentEmail, setCurrentEmail] = useState<string>(userAcc?.email)
    const [password, setPassword] = useState("");
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