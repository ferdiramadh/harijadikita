import TopSection from "../TopSection"
import { useState } from "react"
import { IoIosCloseCircle } from "react-icons/io"

type AddReceptionProp = {
    onClick: (e: any) => void
}

const RinPer8TambahRekPage = () => {

    const [addReception, setAddReception] = useState<boolean>(false)
    const test = (e: any) => {
        e.preventDefault()
        setAddReception(!addReception)
    }
    return (
        <>
            <TopSection title="Tambah Rekening" tagline="Masukkan rekening kamu untuk menerima hadiah uang cashless dari tamu yang kamu undang." />
            {
                addReception && <AddReception onClick={test} />
            }
            {
                !addReception &&

                <div className='form_container'>
                    <input placeholder="Nama pemilik rekening " type="text" />
                    <input placeholder="Pilih bank" type="text" />
                    <input placeholder="Masukkan no. rekening" type="text" />
                    <a href="/" onClick={test}>Tambah rekening</a>
                </div>
            }
        </>
    )
}

const AddReception = ({ onClick }: AddReceptionProp) => {

    return (
        <div className='form_container'>
            <div className="title">
                <h1 className="reception_title">Pemilik rekening ke-1</h1>
            </div>
            <input placeholder="Nama pemilik rekening " type="text" />
            <input placeholder="Pilih bank" type="text" />
            <input placeholder="Masukkan no. rekening" type="text" />
            <div className="title">
                <h1 className="reception_title">Pemilik rekening ke-2</h1>
                <button className="close_reception_btn" onClick={onClick}> <IoIosCloseCircle color="#474747" size={20} /></button>
            </div>
            <input placeholder="Nama pemilik rekening " type="text" />
            <input placeholder="Pilih bank" type="text" />
            <input placeholder="Masukkan no. rekening" type="text" />
        </div>
    )
}

export default RinPer8TambahRekPage