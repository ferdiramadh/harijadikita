import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'
import TopSection from './TopSection'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { FirebaseError } from '@firebase/util'

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
            {!isEmailVerification && <p>{noAccount} punya akun?  <NavLink to={isLogin ? '/regis' : '/signin'}>{masuk}</NavLink></p>}
        </section>
    )
}

const InputEmailPassSection = ({ title, isEmailVerification }: VerificationProp) => {

    const [error, setError] = useState('')
    const isRegis = () => {
        if (title === "Daftar") return true
        return false
    }
    const { setUserName } = UserAuth()
    const handleOnSubmit = async (e: any) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const name = isRegis()? e.target.nama.value : ''
        try {
            setUserName(name)
            const result = isRegis()? await createUserWithEmailAndPassword(auth, email, password) : await signInWithEmailAndPassword(auth, email, password)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setError(error.code)
            }
        }
    }
    return (
        <>
            <form action="" className='btn_form_container' onSubmit={(e) => handleOnSubmit(e)}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!isEmailVerification && <input placeholder="Email" type="text" name='email' />}
                {!isEmailVerification && isRegis() && <input placeholder="Nama" type="text" name="nama" />}
                {!isEmailVerification && <input placeholder="Password" type='password' name="password" />}
                <button type="submit" id="submitBtn" className="submitBtn">
                    {isEmailVerification ? `Kirim ulang link verifikasi` : title}
                </button>
            </form>
        </>
    )
}

const GoogleFbSection = ({ title }: VerificationProp) => {

    const navigate = useNavigate()
    const { googleSignIn, user } = UserAuth()
    const handleGoogleSignIn = async () => {
        try {
            googleSignIn()
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (user != null) {
            navigate('/home')
        }
    }, [user])

    return (
        <div className='btn_form_container'>
            <button type="submit" id="submitBtn" className="soc_med_btn" onClick={handleGoogleSignIn}>
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