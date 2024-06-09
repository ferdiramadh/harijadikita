import { useDispatch, useSelector } from "react-redux"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { AppDispatch, RootState } from "../../redux/store"

const RinPer5KeluargaPengantinWanitaPage = () => {
    const { ayahWaliWanita, ibuWaliWanita, anakKeBerapaWanita, jmlSaudaraWanita } = useSelector((state: RootState) => state.rinper.data)
    const dispatch = useDispatch<AppDispatch>()
    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    const handleChange = (e: any, isJumlah: boolean) => {
        if (isJumlah) {
            dispatch(updateRincianPernikahan({ jmlSaudaraWanita: parseInt(e.target.value) }))
        } else {
            dispatch(updateRincianPernikahan({ anakKeBerapaWanita: parseInt(e.target.value) }))
        }
    }
    return (
        <>
            <TopSection title="Keluarga Pengantin Wanita" tagline="Masukkan profil keluarga pengantin wanita." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" value={ayahWaliWanita} onChange={e => dispatch(updateRincianPernikahan({ ayahWaliWanita: e.target.value }))} />
                <input placeholder="Nama ibu/wali" type="text" value={ibuWaliWanita} onChange={e => dispatch(updateRincianPernikahan({ ibuWaliWanita: e.target.value }))} />
                <label>Pengantin wanita anak ke berapa</label>
                <input placeholder="Pengantin wanita anak ke berapa" value={setToZero(anakKeBerapaWanita)} onChange={e => handleChange(e, false)} />
                <label>Jumlah saudara pengantin wanita</label>
                <input placeholder="Jumlah saudara pengantin wanita" value={setToZero(jmlSaudaraWanita)} onChange={e => handleChange(e, true)} />
            </div>
        </>
    )
}

export default RinPer5KeluargaPengantinWanitaPage