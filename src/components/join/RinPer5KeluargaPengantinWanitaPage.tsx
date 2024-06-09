import { FormDataType } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"

const RinPer5KeluargaPengantinWanitaPage = () => {
    const { data, setData } = UserAuth()
    const { ayahWaliWanita, ibuWaliWanita, anakKeBerapaWanita, jmlSaudaraWanita } = data
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
            updateData({ jmlSaudaraWanita: parseInt(e.target.value) })
        } else {
            updateData({ anakKeBerapaWanita: parseInt(e.target.value) })
        }
    }
    return (
        <>
            <TopSection title="Keluarga Pengantin Wanita" tagline="Masukkan profil keluarga pengantin wanita." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" value={ayahWaliWanita} onChange={e => updateData({ ayahWaliWanita: e.target.value })} />
                <input placeholder="Nama ibu/wali" type="text" value={ibuWaliWanita} onChange={e => updateData({ ibuWaliWanita: e.target.value })} />
                <label>Pengantin wanita anak ke berapa</label>
                <input placeholder="Pengantin wanita anak ke berapa" value={setToZero(anakKeBerapaWanita)} onChange={e => handleChange(e, false)} />
                <label>Jumlah saudara pengantin wanita</label>
                <input placeholder="Jumlah saudara pengantin wanita" value={setToZero(jmlSaudaraWanita)} onChange={e => handleChange(e, true)} />
            </div>
        </>
    )
}

export default RinPer5KeluargaPengantinWanitaPage