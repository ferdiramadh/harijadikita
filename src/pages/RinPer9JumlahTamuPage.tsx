import TopSection from "../components/TopSection"
import RinPerButtonSection from "../components/RinPerButtonSection"
import RinPerProgress from "../components/RinPerProgress"

const RinPer9JumlahTamuPage = () => {
    return (
        <section className='template'>
            <TopSection title="Jumlah Tamu" tagline="Masukkan estimasi jumlah tamu yang akan diundang." />
            <div className='form_container'>
                <input placeholder="Jumlah tamu yang diundang" type="text" />
            </div>
            <RinPerButtonSection />
            <RinPerProgress count={9}/>
        </section>
    )
}

export default RinPer9JumlahTamuPage