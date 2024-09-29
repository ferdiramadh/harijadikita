import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"

const RinPer4KeluargaPengantinPriaPage = () => {
    const { data, setData } = UserAuth()
    const { ayahWaliPria, ibuWaliPria, anakKeBerapaPria, jmlSaudaraPria } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    const handleChange = (e: any, isJumlah: boolean) => {
        if (isJumlah) {
            updateData({ jmlSaudaraPria: e.target.value })
        } else {
            updateData({ anakKeBerapaPria: e.target.value })
        }
    }
    return (
        <>
            <TopSection title="Keluarga Pengantin Pria" tagline="Masukkan profil keluarga pengantin pria." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" value={ayahWaliPria} onChange={e => updateData({ ayahWaliPria: e.target.value })} />
                <input placeholder="Nama ibu/wali" type="text" value={ibuWaliPria} onChange={e => updateData({ ibuWaliPria: e.target.value })} />
                <input placeholder="Pengantin pria anak ke berapa" value={anakKeBerapaPria} onChange={e => handleChange(e, false)} />
                <label className="ex_label_family">Contoh: pertama</label>
                <input placeholder="Jumlah saudara pengantin pria" value={jmlSaudaraPria} onChange={e => handleChange(e, true)} />
                <label className="ex_label_family">Contoh: dua</label>
            </div>
        </>
    )
}

export default RinPer4KeluargaPengantinPriaPage