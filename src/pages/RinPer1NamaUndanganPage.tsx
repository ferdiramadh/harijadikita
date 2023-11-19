import TopSection from "../components/TopSection"

const RinPer1NamaUndanganPage = () => {
    return (
        <section className='template'>
            <TopSection title="Nama undangan" tagline="Masukkan nama undangan yang akan ditampilkan di beberapa bagian fitur undangan." />
            <div className='form_container'>
                <input placeholder="Nama undangan" type="text" />
                <p className="example_text">contoh: Herlambang dan Nia wedding</p>
            </div>
            
        </section>
    )
}

export default RinPer1NamaUndanganPage