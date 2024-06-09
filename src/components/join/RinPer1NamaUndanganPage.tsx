import { FormDataType } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { UserAuth } from "../../context/AuthContext"

const RinPer1NamaUndanganPage = () => {
    const { data, setData } = UserAuth()
    const { namaUndangan } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    return (
        <>
            <TopSection title="Nama undangan" tagline="Masukkan nama undangan yang akan ditampilkan di beberapa bagian fitur undangan." />
            <div className='form_container'>
                <input placeholder="Nama undangan" type="text" value={namaUndangan} onChange={e => updateData({ namaUndangan: e.target.value })} />
                <p className="example_text">contoh: Herlambang dan Nia wedding</p>
            </div>
        </>
    )
}

export default RinPer1NamaUndanganPage