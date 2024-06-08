import { useSelector } from "react-redux"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { RootState } from "../../redux/store"

const RinPer2NamaPengantinPage = () => {
    const { pengantinPria, pengantinWanita } = useSelector((state: RootState) => state.rinper.data)
    return (
        <>
            <TopSection title="Nama Pengantin" tagline="Masukkan nama kamu dan pasangan." />
            <div className='form_container'>
                <input placeholder="Pengantin pria" type="text" value={pengantinPria} onChange={e => updateRincianPernikahan({ pengantinPria: e.target.value })} />
                <input placeholder="Pengantin wanita" type="text" value={pengantinWanita} onChange={e => updateRincianPernikahan({ pengantinWanita: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer2NamaPengantinPage