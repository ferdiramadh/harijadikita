import SvgGoogle from '../assets/Icon/Google.svg'
import SvgFb from '../assets/Icon/Facebook.svg'
import TopSection from './TopSection'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { FirebaseError } from '@firebase/util'
import LoadingOverlay from 'react-loading-overlay-ts'

type LoginRegisProps = {
    title: string
    tagLine: string
    isLogin: boolean
    isEmailVerification: boolean
}

type VerificationProp = Partial<LoginRegisProps> & {
    title: string
    isEmailVerification?: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginRegis = ({ title, tagLine, isLogin, isEmailVerification = false }: LoginRegisProps) => {
    const masuk = isLogin ? "Daftar" : "Masuk"
    const noAccount = isLogin ? "Tidak" : "Sudah"
    const [loading, setLoading] = useState(false)
    return (
        <LoadingOverlay
            active={loading}
            spinner
            text='Mohon tunggu...'
        >
            <section className='template'>
                <TopSection title={title} tagline={tagLine} isLoginPage={true} />
                <InputEmailPassSection title={title} isEmailVerification={isEmailVerification} setLoading={setLoading} />
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
        </LoadingOverlay>
    )
}

const InputEmailPassSection = ({ title, isEmailVerification, setLoading }: VerificationProp) => {

    const [error, setError] = useState('')
    const isRegis = () => {
        if (title === "Daftar") return true
        return false
    }
    const { setUserAcc, user } = UserAuth()
    const handleVerification = async (e: any) => {
        e.preventDefault()
        // console.log('email ver')
        // const resultEmailVer = await sendEmailVerification(user)
        // if(resultEmailVer == null) {
        //     setUserAcc(prev => ({...prev, email_verified: true}))
        // }
    }
    const handleOnSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value
        const password = e.target.password.value
        const name = isRegis() ? e.target.nama.value : ''
        try {
            setUserAcc(prev => ({ ...prev, displayName: name }))
            const result = isRegis() ? await createUserWithEmailAndPassword(auth, email, password) : await signInWithEmailAndPassword(auth, email, password)
            const { user } = result
            if (user) {
                localStorage.setItem('items', JSON.stringify(user));
            }
            setLoading(false)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setError(error.code)
            }
            setLoading(false)
        }
    }
    return (
        <>
            <form
                action=""
                className='btn_form_container'
                onSubmit={isEmailVerification ? (e) => handleVerification(e) : (e) => handleOnSubmit(e)}
            >
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

const GoogleFbSection = ({ title, isLogin }: Partial<VerificationProp>) => {

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