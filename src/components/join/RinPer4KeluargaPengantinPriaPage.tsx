import { JoinPageType } from "../../pages/JoinPage"
import TopSection from "../TopSection"

type RinPer4KeluargaPengantinPriaType = {
    ayahWaliPria: string
    ibuWaliPria: string
    anakKeBerapaPria: number
    jmlSaudaraPria: number
}

type UpdateFormProps = RinPer4KeluargaPengantinPriaType & {
    updateData: (field: Partial<RinPer4KeluargaPengantinPriaType>) => void
}

const RinPer4KeluargaPengantinPriaPage = ({ ayahWaliPria, ibuWaliPria, anakKeBerapaPria, jmlSaudaraPria, updateData, storingData }: UpdateFormProps & Partial<JoinPageType>) => {

    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    return (
        <>
            <TopSection title="Keluarga Pengantin Pria" tagline="Masukkan profil keluarga pengantin pria." storingData={storingData} />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" value={ayahWaliPria} onChange={e => updateData({ ayahWaliPria: e.target.value })} />
                <input placeholder="Nama ibu/wali" type="text" value={ibuWaliPria} onChange={e => updateData({ ibuWaliPria: e.target.value })} />
                <label>Pengantin pria anak ke berapa</label>
                <input type="number" value={setToZero(anakKeBerapaPria)} onChange={e => updateData({ anakKeBerapaPria: parseInt(e.target.value) })} />
                <label>Jumlah saudara pengantin pria</label>
                <input type="number" value={setToZero(jmlSaudaraPria)} onChange={e => updateData({ jmlSaudaraPria: parseInt(e.target.value) })} />
            </div>
        </>
    )
}

export default RinPer4KeluargaPengantinPriaPage