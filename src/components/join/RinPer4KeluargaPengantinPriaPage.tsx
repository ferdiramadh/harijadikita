import TopSection from "../TopSection"
import { FormDataType, UserAuth } from "../../context/AuthContext"

const RinPer4KeluargaPengantinPriaPage = () => {
    const { data, setData } = UserAuth()
    const { ayahWaliPria, ibuWaliPria, anakKeBerapaPria, jmlSaudaraPria } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
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