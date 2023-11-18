import Logo from './Logo'
import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'

type LoginRegisProps = {
    title: string
    tagLine: string
    isLogin: boolean
}

const LoginRegis = ({ title, tagLine, isLogin }: LoginRegisProps) => {
    const noAccount = isLogin ? "Tidak" : "Sudah"
    return (
        <section className='login'>
            <Logo />
            <div className='upperSection'>
                <h1>{title}</h1>
                <div className='tagline'>
                    <p>{tagLine}</p>
                </div>
                <InputEmailPassSection title={title} />
            </div>
            <hr />
            <GoogleFbSection title={title} />
            {isLogin && <a href=".">Lupa Password?</a>}
            <p>{noAccount} punya akun?  <a href=".">Daftar</a></p>
        </section>
    )
}

const InputEmailPassSection = (prop: any) => {
    const title = prop.title
    return (
        <>
            <form action="" className='btn_form_container'>
                <input placeholder="Email" type="text" />
                <input placeholder="Password" type='password' />
                <button type="submit" id="submitBtn" className="submitBtn">
                    {title}
                </button>
            </form>
        </>
    )
}

const GoogleFbSection = (prop: any) => {
    const title = prop.title
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