import { useSelector } from "react-redux"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { RootState } from "../../redux/store"


const RinPer9JumlahTamuPage = () => {
    const { jmlTamu } = useSelector((state: RootState) => state.rinper.data)
    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    return (
        <>
            <TopSection title="Jumlah Tamu" tagline="Masukkan estimasi jumlah tamu yang akan diundang." />
            <div className='form_container'>
                <input placeholder="Jumlah tamu yang diundang" value={setToZero(jmlTamu)} onChange={e => updateRincianPernikahan({ jmlTamu: parseInt(e.target.value) })} />
            </div>
        </>
    )
}

export default RinPer9JumlahTamuPage