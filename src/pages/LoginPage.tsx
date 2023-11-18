import Logo from '../components/Logo'
import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'

export default function LoginPage() {
    return (
        <section className='login'>
            <Logo />
            <div className='upperSection'>
                <h1>Masuk</h1>
                <div className='tagline'>
                    <p>Lanjutkan buat undangan nikah digital kamu hanya 5 menit.</p>
                </div>
                <InputEmailPassSection />
            </div>
            <hr />
            <GoogleFbSection />
            <a href=".">Lupa Password?</a>
            <p>Tidak punya akun?  <a href=".">Daftar</a></p>
        </section>
    )
}

const InputEmailPassSection = () => {
    return (
        <>
            <form action="" className='btn_form_container'>
                <input placeholder="Email" type="text" />
                <input placeholder="Password" type='password' />
                <button type="submit" id="submitBtn" className="submitBtn">
                    Masuk
                </button>
            </form>
        </>
    )
}

const GoogleFbSection = () => {
    return (
        <div className='btn_form_container'>
            <button type="submit" id="submitBtn" className="soc_med_btn" onClick={() => console.log('test')}>
                <img src={SvgGoogle} alt='google' />
                Masuk dengan Google
            </button>
            <button type="submit" id="submitBtn" className="soc_med_btn">
                <img src={SvgFb} alt='google' />
                Masuk dengan Facebook
            </button>
        </div>
    )
}