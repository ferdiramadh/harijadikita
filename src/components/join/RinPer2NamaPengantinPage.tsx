import { useDispatch, useSelector } from "react-redux"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { AppDispatch, RootState } from "../../redux/store"

const RinPer2NamaPengantinPage = () => {
    const { pengantinPria, pengantinWanita } = useSelector((state: RootState) => state.rinper.data)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <TopSection title="Nama Pengantin" tagline="Masukkan nama kamu dan pasangan." />
            <div className='form_container'>
                <input placeholder="Pengantin pria" type="text" value={pengantinPria} onChange={e => dispatch(updateRincianPernikahan({ pengantinPria: e.target.value }))} />
                <input placeholder="Pengantin wanita" type="text" value={pengantinWanita} onChange={e => dispatch(updateRincianPernikahan({ pengantinWanita: e.target.value }))} />
            </div>
        </>
    )
}

export default RinPer2NamaPengantinPage