import TopSection from "../components/TopSection"
import RinPerButtonSection from "../components/RinPerButtonSection"
import RinPerProgress from "../components/RinPerProgress"

const RinPer2NamaPengantin = () => {
    return (
        <section className='template'>
            <TopSection title="Nama Pengantin" tagline="Masukkan nama kamu dan pasangan." />
            <div className='form_container'>
                <input placeholder="Pengantin pria" type="text" />
                <input placeholder="Pengantin wanita" type="text" />
            </div>
            <RinPerButtonSection />
            <RinPerProgress count={2}/>
        </section>
    )
}

export default RinPer2NamaPengantin