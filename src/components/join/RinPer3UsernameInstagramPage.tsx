import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"

const RinPer3UsernameInstagramPage = () => {
    const { data, setData } = UserAuth()
    const { instaPengantinPria, instaPengantinWanita } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    return (
        <>
            <TopSection title="Username Instagram" tagline="Masukkan username Instagram pengantin untuk ditampilkan di undangan, kosongkan jika pengantin tidak memiliki akun instagram." />
            <div className='form_container'>
                <input placeholder="Instagram pengantin pria" type="text" value={instaPengantinPria} onChange={e => updateData({ instaPengantinPria: e.target.value })} />
                <input placeholder="Instagram pengantin wanita" type="text" value={instaPengantinWanita} onChange={e => updateData({ instaPengantinWanita: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer3UsernameInstagramPage