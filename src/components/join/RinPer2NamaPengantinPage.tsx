import TopSection from "../TopSection"

const RinPer2NamaPengantinPage = () => {
    return (
        <>
            <TopSection title="Nama Pengantin" tagline="Masukkan nama kamu dan pasangan." />
            <div className='form_container'>
                <input placeholder="Pengantin pria" type="text" />
                <input placeholder="Pengantin wanita" type="text" />
            </div>
        </>
    )
}

export default RinPer2NamaPengantinPage