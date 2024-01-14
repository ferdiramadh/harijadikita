import TopSection from "../components/TopSection"
import { useState } from "react"
import { IoIosCloseCircle } from "react-icons/io"

type AddReceptionProp = {
    onClick: (e: any) => void
}

const RinPer6TanggalWaktuPage = () => {

    const [addReception, setAddReception] = useState<boolean>(false)
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddReception(!addReception)
    }
    return (
        <>
            <TopSection title="Tanggal dan Waktu Pernikahan" tagline="Kamu bisa tambah lebih dari satu tanggal resepsi. Jika tidak ada resepsi, tidak perlu klik tombol ‘Tambah resepsi’" />
            {
                addReception && <AddReception onClick={addingReception} />
            }
            {
                !addReception &&

                <div className='form_container'>
                    <input placeholder="Pilih tanggal akad" type="text" />
                    <input placeholder="Pilih waktu akad" type="text" />
                    <a href="/" onClick={addingReception}>Tambah resepsi</a>
                </div>
            }
        </>
    )
}

const AddReception = ({ onClick }: AddReceptionProp) => {

    return (
        <div className='form_container'>
            <div className="title">
                <h1 className="reception_title">Akad</h1>
            </div>
            <input placeholder="Pilih tanggal akad" type="text" />
            <input placeholder="Pilih waktu akad" type="text" />
            <div className="title">
                <h1 className="reception_title">Resepsi</h1>
                <button className="close_reception_btn" onClick={onClick}> <IoIosCloseCircle color="#474747" size={20} /></button>
            </div>
            <input placeholder="Pilih tanggal resepsi" type="text" />
            <input placeholder="Pilih waktu resepsi" type="text" />
        </div>
    )
}

export default RinPer6TanggalWaktuPage