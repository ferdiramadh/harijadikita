import TopSection from "../components/TopSection"
import RinPerButtonSection from "../components/RinPerButtonSection"
import RinPerProgress from "../components/RinPerProgress"

const RinPer6TanggalWaktuPage = () => {
    return (
        <section className='template'>
            <TopSection title="Tanggal dan Waktu Pernikahan" tagline="Kamu bisa tambah lebih dari satu tanggal resepsi. Jika tidak ada resepsi, tidak perlu klik tombol ‘Tambah resepsi’" />
            <div className='form_container'>
                <input placeholder="Pilih tanggal akad" type="text" />
                <input placeholder="Pilih waktu akad" type="text" />
                <a href=".">Tambah resepsi</a>
            </div>
            <RinPerButtonSection />
            <RinPerProgress count={6}/>
        </section>
    )
}

export default RinPer6TanggalWaktuPage