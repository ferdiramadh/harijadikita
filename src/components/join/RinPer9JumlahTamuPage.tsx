import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"

const RinPer9JumlahTamuPage = () => {
    const { data, setData } = UserAuth()
    const { jmlTamu } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    return (
        <>
            <TopSection title="Jumlah Tamu" tagline="Masukkan estimasi jumlah tamu yang akan diundang." />
            <div className='form_container'>
                <input placeholder="Jumlah tamu yang diundang" value={setToZero(jmlTamu)} onChange={e => updateData({ jmlTamu: parseInt(e.target.value) })} />
            </div>
        </>
    )
}

export default RinPer9JumlahTamuPage