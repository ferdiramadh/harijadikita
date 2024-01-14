import TopSection from "../TopSection"

const RinPer4KeluargaPengantinPriaPage = () => {
    return (
        <>
            <TopSection title="Keluarga Pengantin Pria" tagline="Masukkan profil keluarga pengantin pria." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" />
                <input placeholder="Nama ibu/wali" type="text" />
                <input placeholder="Pengantin pria anak ke berapa" type="text" />
                <input placeholder="Jumlah saudara pengantin pria" type="text" />
            </div>
        </>
    )
}

export default RinPer4KeluargaPengantinPriaPage