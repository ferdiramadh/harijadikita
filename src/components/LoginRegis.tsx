import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'
import TopSection from './TopSection'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase'
import { FirebaseError } from '@firebase/util'

type LoginRegisProps = {
    title: string
    tagLine: string
    isLogin: boolean
    isEmailVerification: boolean
}

type VerificationProp = Partial<LoginRegisProps> & {
    title: string
    isEmailVerification?: boolean
}

const LoginRegis = ({ title, tagLine, isLogin, isEmailVerification = false }: LoginRegisProps) => {
    const masuk = isLogin ? "Daftar" : "Masuk"
    const noAccount = isLogin ? "Tidak" : "Sudah"

    return (
        <section className='template'>
            <TopSection title={title} tagline={tagLine} isLoginPage={true} />
            <InputEmailPassSection title={title} isEmailVerification={isEmailVerification} />
            {
                !isEmailVerification && <hr />

            }

            {
                !isEmailVerification && <GoogleFbSection title={title} isLogin={isLogin} />

            }

            {!isEmailVerification && isLogin && <p><NavLink to='/resetpassword' style={({ isActive, isPending, isTransitioning }) => {
                return {
                    color: isPending ? "red" : "#474747",
                };
            }}>Lupa Password?</NavLink></p>}
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
    const { setUserAcc, user } = UserAuth()
    const handleVerification = async (e: any) => {
        e.preventDefault()
        console.log('email ver')
        // const resultEmailVer = await sendEmailVerification(user)
        // if(resultEmailVer == null) {
        //     setUserAcc(prev => ({...prev, email_verified: true}))
        // }
    }
    const handleOnSubmit = async (e: any) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const name = isRegis() ? e.target.nama.value : ''
        try {
            setUserAcc(prev => ({ ...prev, displayName: name }))
            const result = isRegis() ? await createUserWithEmailAndPassword(auth, email, password) : await signInWithEmailAndPassword(auth, email, password)
            const {user} = result
            if (user) {
                localStorage.setItem('items', JSON.stringify(user));
            }
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setError(error.code)
            }
        }
    }
    return (
        <>
            <form action="" className='btn_form_container' onSubmit={isEmailVerification ? (e) => handleVerification(e) : (e) => handleOnSubmit(e)}>
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

const GoogleFbSection = ({ title, isLogin }: VerificationProp) => {

    const navigate = useNavigate()
    const { googleSignIn, userAcc, facebookSignIn, setUserAcc, user } = UserAuth()
    const handleGoogleSignIn = async () => {
        try {
            googleSignIn()
            // navigate('/home')
            // setUserAcc(prev => ({ ...prev, email_verified: true }))
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFacebookSignIn = async () => {
        try {
            facebookSignIn()
        }
        catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => {
    //     const email_verified  = userAcc?.email_verified
    //     if (email_verified == true) {
    //         navigate('/home')
    //     } else if (email_verified == false) {
    //         navigate('/verification')
    //     }
    // }, [userAcc])
    useEffect(() => {
        if (user != null) {
            if (isLogin) {
                navigate('/home')
            } else {
                navigate('/join')
            }

        }
    }, [user])

    return (
        <div className='btn_form_container'>
            <button type="submit" id="submitBtn" className="soc_med_btn" onClick={handleGoogleSignIn}>
                <img src={SvgGoogle} alt='google' />
                {title} dengan Google
            </button>
            <button type="submit" id="submitBtn" className="soc_med_btn" onClick={handleFacebookSignIn}>
                <img src={SvgFb} alt='google' />
                {title} dengan Facebook
            </button>
        </div>
    )
}

export default LoginRegis