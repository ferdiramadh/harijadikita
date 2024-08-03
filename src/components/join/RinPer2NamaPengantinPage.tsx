import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"

const RinPer2NamaPengantinPage = () => {
    const { data, setData } = UserAuth()
    const { pengantinPria, pengantinWanita } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    return (
        <>
            <TopSection title="Nama Pengantin" tagline="Masukkan nama kamu dan pasangan." />
            <div className='form_container'>
                <input placeholder="Pengantin pria" type="text" value={pengantinPria} onChange={e => updateData({ pengantinPria: e.target.value })} />
                <input placeholder="Pengantin wanita" type="text" value={pengantinWanita} onChange={e => updateData({ pengantinWanita: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer2NamaPengantinPage