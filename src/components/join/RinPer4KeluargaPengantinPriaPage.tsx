import { useDispatch, useSelector } from "react-redux"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { AppDispatch, RootState } from "../../redux/store"

const RinPer4KeluargaPengantinPriaPage = () => {
    const { ayahWaliPria, ibuWaliPria, anakKeBerapaPria, jmlSaudaraPria } = useSelector((state: RootState) => state.rinper.data)
    const dispatch = useDispatch<AppDispatch>()
    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    const handleChange = (e: any, isJumlah: boolean) => {
        if (isJumlah) {
            dispatch(updateRincianPernikahan({ jmlSaudaraPria: parseInt(e.target.value) }))
        } else {
            dispatch(updateRincianPernikahan({ anakKeBerapaPria: parseInt(e.target.value) }))
        }
    }
    return (
        <>
            <TopSection title="Keluarga Pengantin Pria" tagline="Masukkan profil keluarga pengantin pria." />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" value={ayahWaliPria} onChange={e => dispatch(updateRincianPernikahan({ ayahWaliPria: e.target.value }))} />
                <input placeholder="Nama ibu/wali" type="text" value={ibuWaliPria} onChange={e => dispatch(updateRincianPernikahan({ ibuWaliPria: e.target.value }))} />
                <label>Pengantin pria anak ke berapa</label>
                <input placeholder="Pengantin pria anak ke berapa" value={setToZero(anakKeBerapaPria)} onChange={e => handleChange(e, false)} />
                <label>Jumlah saudara pengantin pria</label>
                <input placeholder="Jumlah saudara pengantin pria" value={setToZero(jmlSaudaraPria)} onChange={e => handleChange(e, true)} />
            </div>
        </>
    )
}

export default RinPer4KeluargaPengantinPriaPage