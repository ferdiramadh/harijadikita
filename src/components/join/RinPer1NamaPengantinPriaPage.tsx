import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"

const RinPer1NamaPengantinPriaPage = () => {
    const { data, setData } = UserAuth()
    const { pengantinPria, pengantinPriaLengkap } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    return (
        <>
            <TopSection title="Nama Pengantin Pria" tagline="Masukkan nama lengkap dan gelar (jika ada) kamu." />
            <div className='form_container'>
                <input placeholder="Nama lengkap dan gelar (jika ada)" type="text" value={pengantinPriaLengkap} onChange={e => updateData({ pengantinPriaLengkap: e.target.value })} />
                <input placeholder="Nama panggilan" type="text" value={pengantinPria} onChange={e => updateData({ pengantinPria: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer1NamaPengantinPriaPage