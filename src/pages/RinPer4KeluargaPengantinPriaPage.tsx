import TopSection from "../components/TopSection"
import RinPerButtonSection from "../components/RinPerButtonSection"
import RinPerProgress from "../components/RinPerProgress"

const RinPer4KeluargaPengantinPriaPage = () => {
    return (
        <section className='template'>
            <TopSection title="Keluarga Pengantin Pria" tagline="Masukkan profil keluarga pengantin pria." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" />
                <input placeholder="Nama ibu/wali" type="text" />
                <input placeholder="Pengantin pria anak ke berapa" type="text" />
                <input placeholder="Jumlah saudara pengantin pria" type="text" />
            </div>
            <RinPerButtonSection />
            <RinPerProgress count={4}/>
        </section>
    )
}

export default RinPer4KeluargaPengantinPriaPage