import TopSection from "../TopSection"

const RinPer1NamaUndanganPage = () => {
    return (
        <>
            <TopSection title="Nama undangan" tagline="Masukkan nama undangan yang akan ditampilkan di beberapa bagian fitur undangan." />
            <div className='form_container'>
                <input placeholder="Nama undangan" type="text" />
                <p className="example_text">contoh: Herlambang dan Nia wedding</p>
            </div>
        </>
    )
}

export default RinPer1NamaUndanganPage