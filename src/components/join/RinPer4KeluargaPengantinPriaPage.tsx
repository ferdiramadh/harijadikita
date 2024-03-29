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

const RinPer4KeluargaPengantinPriaPage = ({ ayahWaliPria, ibuWaliPria, anakKeBerapaPria, jmlSaudaraPria, updateData }: UpdateFormProps & Partial<JoinPageType>) => {

    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    const handleChange = (e: any, isJumlah: boolean) => {
        if (isJumlah) {
            updateData({ jmlSaudaraPria: parseInt(e.target.value) })
        } else {
            updateData({ anakKeBerapaPria: parseInt(e.target.value) })
        }
    }
    return (
        <>
            <TopSection title="Keluarga Pengantin Pria" tagline="Masukkan profil keluarga pengantin pria." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" value={ayahWaliPria} onChange={e => updateData({ ayahWaliPria: e.target.value })} />
                <input placeholder="Nama ibu/wali" type="text" value={ibuWaliPria} onChange={e => updateData({ ibuWaliPria: e.target.value })} />
                <label>Pengantin pria anak ke berapa</label>
                <input placeholder="Pengantin pria anak ke berapa" value={setToZero(anakKeBerapaPria)} onChange={e => handleChange(e, false)} />
                <label>Jumlah saudara pengantin pria</label>
                <input placeholder="Jumlah saudara pengantin pria" value={setToZero(jmlSaudaraPria)} onChange={e => handleChange(e, true)} />
            </div>
        </>
    )
}

export default RinPer4KeluargaPengantinPriaPage