import { useDispatch, useSelector } from "react-redux"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { AppDispatch, RootState } from "../../redux/store"

const RinPer1NamaUndanganPage = () => {
    const { namaUndangan } = useSelector((state: RootState) => state.rinper.data)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <TopSection title="Nama undangan" tagline="Masukkan nama undangan yang akan ditampilkan di beberapa bagian fitur undangan." />
            <div className='form_container'>
                <input placeholder="Nama undangan" type="text" value={namaUndangan} onChange={e => dispatch(updateRincianPernikahan({ namaUndangan: e.target.value }))} />
                <p className="example_text">contoh: Herlambang dan Nia wedding</p>
            </div>
        </>
    )
}

export default RinPer1NamaUndanganPage