import LoginRegis from '../components/LoginRegis'

const LoginPage = () => {
    return <LoginRegis
        title='Masuk'
        isLogin={true}
        tagLine='Lanjutkan buat undangan nikah digital kamu hanya 5 menit.'
        isEmailVerification={false}
    />
}

export default LoginPage