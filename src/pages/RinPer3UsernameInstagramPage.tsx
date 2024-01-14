import TopSection from "../components/TopSection"

const RinPer3UsernameInstagramPage = () => {
    return (
        <>
            <TopSection title="Username Instagram" tagline="Masukkan username Instagram pengantin untuk ditampilkan di undangan, kosongkan jika pengantin tidak memiliki akun instagram." />
            <div className='form_container'>
                <input placeholder="Instagram pengantin pria" type="text" />
                <input placeholder="Instagram pengantin wanita" type="text" />
            </div>
        </>
    )
}

export default RinPer3UsernameInstagramPage