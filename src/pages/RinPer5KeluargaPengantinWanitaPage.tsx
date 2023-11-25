import TopSection from "../components/TopSection"
import RinPerButtonSection from "../components/RinPerButtonSection"
import RinPerProgress from "../components/RinPerProgress"

const RinPer5KeluargaPengantinWanitaPage = () => {
    return (
        <section className='template'>
            <TopSection title="Keluarga Pengantin Wanita" tagline="Masukkan profil keluarga pengantin wanita." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" />
                <input placeholder="Nama ibu/wali" type="text" />
                <input placeholder="Pengantin wanita anak ke berapa" type="text" />
                <input placeholder="Jumlah saudara pengantin wanita" type="text" />
            </div>
            <RinPerButtonSection />
            <RinPerProgress count={5}/>
        </section>
    )
}

export default RinPer5KeluargaPengantinWanitaPage