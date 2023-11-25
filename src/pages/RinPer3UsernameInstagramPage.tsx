import TopSection from "../components/TopSection"
import RinPerButtonSection from "../components/RinPerButtonSection"
import RinPerProgress from "../components/RinPerProgress"

const RinPer3UsernameInstagramPage = () => {
    return (
        <section className='template'>
            <TopSection title="Username Instagram" tagline="Masukkan username Instagram pengantin untuk ditampilkan di undangan, kosongkan jika pengantin tidak memiliki akun instagram." />
            <div className='form_container'>
                <input placeholder="Instagram pengantin pria" type="text" />
                <input placeholder="Instagram pengantin wanita" type="text" />
            </div>
            <RinPerButtonSection />
            <RinPerProgress count={3}/>
        </section>
    )
}

export default RinPer3UsernameInstagramPage