import TopSection from "../TopSection"
import { IoIosCloseCircle } from "react-icons/io"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"
import { UserAuth } from "../../context/AuthContext"

type RinPer6TanggalWaktuType = {
    addReception: boolean
    setAddReception: React.Dispatch<React.SetStateAction<boolean>>
}

type AddReceptionProp = Partial<RinPer6TanggalWaktuType> & {
    onClick: (e: any) => void
    updateData(field: Partial<FormDataType>): void
    tglResepsi: string
    wktResepsi: string
}

const RinPer6TanggalWaktuPage = ({ addReception, setAddReception }: RinPer6TanggalWaktuType) => {
    const { data, setData } = UserAuth()
    const { tglAkad, wktAkad, tglResepsi, wktResepsi } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddReception(!addReception)
    }
    return (
        <>
            <TopSection title="Tanggal dan Waktu Pernikahan" tagline="Kamu bisa tambah lebih dari satu tanggal resepsi. Jika tidak ada resepsi, tidak perlu klik tombol ‘Tambah resepsi’" />


            <div className='form_container'>
                {addReception && <div className="title">
                    <h1 className="reception_title">Akad</h1>
                </div>}
                <label>Pilih tanggal akad</label>
                <input placeholder="Pilih tanggal akad" type="date" value={tglAkad} onChange={e => updateData({ tglAkad: e.target.value })} />
                <label>Pilih waktu akad</label>
                <input placeholder="Pilih waktu akad" type="time" value={wktAkad} onChange={e => updateData({ wktAkad: e.target.value })} />
                {/* {!addReception && <a href="/" onClick={addingReception}>Tambah resepsi</a>}
                {
                    addReception && <AddReception onClick={addingReception} updateData={updateData} tglResepsi={tglResepsi} wktResepsi={wktResepsi} />
                } */}
            </div>

        </>
    )
}

const AddReception = ({ onClick, updateData, tglResepsi, wktResepsi }: AddReceptionProp) => {

    return (
        <>
            <div className="title">
                <h1 className="reception_title">Resepsi</h1>
                <button className="close_reception_btn" onClick={onClick}> <IoIosCloseCircle color="#474747" size={20} /></button>
            </div>
            <label>Pilih tanggal Resepsi</label>
            <input placeholder="Pilih tanggal Resepsi" type="date" value={tglResepsi} onChange={e => updateData({ tglResepsi: e.target.value })} />
            <label>Pilih waktu Resepsi</label>
            <input placeholder="Pilih waktu Resepsi" type="time" value={wktResepsi} onChange={e => updateData({ wktResepsi: e.target.value })} />
        </>
    )
}

export default RinPer6TanggalWaktuPage