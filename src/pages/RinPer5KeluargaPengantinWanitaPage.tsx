import TopSection from "../components/TopSection"

const RinPer5KeluargaPengantinWanitaPage = () => {
    return (
        <>
            <TopSection title="Keluarga Pengantin Wanita" tagline="Masukkan profil keluarga pengantin wanita." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" />
                <input placeholder="Nama ibu/wali" type="text" />
                <input placeholder="Pengantin wanita anak ke berapa" type="text" />
                <input placeholder="Jumlah saudara pengantin wanita" type="text" />
            </div>
        </>
    )
}

export default RinPer5KeluargaPengantinWanitaPage