import LoginRegis from '../components/LoginRegis'

const VerificationPage = () => {
    return (
        <>
            <LoginRegis
                title='Verifikasi Email'
                isLogin={false}
                tagLine='Cek email kamu dan klik link verifikasi'
                isEmailVerification={true}
            />
        </>
    )
}

export default VerificationPage