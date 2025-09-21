import { EditProp, ShowModalProp } from "../pages/AccountPage"
import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'

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

export default SocmedButton