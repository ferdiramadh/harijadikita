import RincianPernikahanItem from "./RincianPernikahanItem"

type GenderType = {
    gender: string
}

const KeluargaPengantinItem = () => {
    return (
        <RincianPernikahanItem
            title="Keluarga pengantin"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <FamilyColumn gender="pria"/>
            <FamilyColumn gender="wanita"/>
        </div>
    )
}

const FamilyColumn = ({gender}: GenderType) => {

    return (
        <>
            <label className="label_input_bold">Pengantin {gender}</label>
            <input type="text" name='email' placeholder="Nama ayah/wali"/>
            <input type="text" name='email' placeholder="Nama ibu/wali"/>
            <input type="text" name='email' placeholder={`Pengantin ${gender} anak ke berapa`}/>
            <label className="ex_label_family">Contoh: pertama</label>
            <input type="text" name='email' placeholder={`Jumlah saudara pengantin ${gender}`}/>
            <label className="ex_label_family">Contoh: dua</label>
        </>
    )
}

export default KeluargaPengantinItem