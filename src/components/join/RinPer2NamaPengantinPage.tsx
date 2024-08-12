import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"

const RinPer2NamaPengantinPage = () => {
    const { data, setData } = UserAuth()
    const { pengantinWanitaLengkap, pengantinWanita } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    return (
        <>
            <TopSection title="Nama Pengantin Wanita" tagline="Masukkan nama lengkap dan gelar (jika ada) kamu." />
            <div className='form_container'>
                <input placeholder="Nama lengkap dan gelar (jika ada)" type="text" value={pengantinWanitaLengkap} onChange={e => updateData({ pengantinWanitaLengkap: e.target.value })} />
                <input placeholder="Nama panggilan" type="text" value={pengantinWanita} onChange={e => updateData({ pengantinWanita: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer2NamaPengantinPage