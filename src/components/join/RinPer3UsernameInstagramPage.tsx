import { useSelector } from "react-redux"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import TopSection from "../TopSection"
import { RootState } from "../../redux/store"

const RinPer3UsernameInstagramPage = () => {
    const { instaPengantinPria, instaPengantinWanita } = useSelector((state: RootState) => state.rinper.data)
    return (
        <>
            <TopSection title="Username Instagram" tagline="Masukkan username Instagram pengantin untuk ditampilkan di undangan, kosongkan jika pengantin tidak memiliki akun instagram." />
            <div className='form_container'>
                <input placeholder="Instagram pengantin pria" type="text" value={instaPengantinPria} onChange={e => updateRincianPernikahan({ instaPengantinPria: e.target.value })} />
                <input placeholder="Instagram pengantin wanita" type="text" value={instaPengantinWanita} onChange={e => updateRincianPernikahan({ instaPengantinWanita: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer3UsernameInstagramPage