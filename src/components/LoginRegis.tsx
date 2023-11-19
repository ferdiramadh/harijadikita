import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'
import TopSection from './TopSection'

type LoginRegisProps = {
    title: string
    tagLine: string
    isLogin: boolean
    isEmailVerification: boolean
}

type VerificationProp = {
    title: string
    isEmailVerification?: boolean
}

const LoginRegis = ({ title, tagLine, isLogin, isEmailVerification = false }: LoginRegisProps) => {
    const masuk = isLogin ? "Daftar" : "Masuk"
    const noAccount = isLogin ? "Tidak" : "Sudah"
    return (
        <section className='template'>
            <TopSection title={title} tagline={tagLine} />
            <InputEmailPassSection title={title} isEmailVerification={isEmailVerification} />
            {
                !isEmailVerification && <hr />

            }

            {
                !isEmailVerification && <GoogleFbSection title={title} />

            }

            {!isEmailVerification && isLogin && <a href=".">Lupa Password?</a>}
            {!isEmailVerification && <p>{noAccount} punya akun?  <a href=".">{masuk}</a></p>}
        </section>
    )
}

const InputEmailPassSection = ({ title, isEmailVerification }: VerificationProp) => {

    return (
        <>
            <form action="" className='btn_form_container'>
                {!isEmailVerification && <input placeholder="Email" type="text" />}
                {!isEmailVerification && <input placeholder="Password" type='password' />}
                <button type="submit" id="submitBtn" className="submitBtn">
                    {isEmailVerification? `Kirim ulang link verifikasi` : title}
                </button>
            </form>
        </>
    )
}

const GoogleFbSection = ({ title }: VerificationProp) => {

    return (
        <div className='btn_form_container'>
            <button type="submit" id="submitBtn" className="soc_med_btn" onClick={() => console.log('test')}>
                <img src={SvgGoogle} alt='google' />
                {title} dengan Google
            </button>
            <button type="submit" id="submitBtn" className="soc_med_btn">
                <img src={SvgFb} alt='google' />
                {title} dengan Facebook
            </button>
        </div>
    )
}

export default LoginRegis