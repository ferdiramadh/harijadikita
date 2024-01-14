import TopSection from "../TopSection"

const RinPer9JumlahTamuPage = () => {
    return (
        <>
            <TopSection title="Jumlah Tamu" tagline="Masukkan estimasi jumlah tamu yang akan diundang." />
            <div className='form_container'>
                <input placeholder="Jumlah tamu yang diundang" type="text" />
            </div>
        </>
    )
}

export default RinPer9JumlahTamuPage