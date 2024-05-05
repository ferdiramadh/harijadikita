import { useState } from "react"
import RincianPernikahanItem from "./RincianPernikahanItem"
import { IoIosCloseCircle } from "react-icons/io"

const JadwalLokasiItem = () => {
    return (
        <RincianPernikahanItem
            title="Jadwal dan lokasi"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <AkadSection />
            <ResepsiSection />
        </div>
    )
}

const AkadSection = () => {
    return (
        <>
            <label className="label_input_bold">Akad</label>
            <input type="text" name='email' placeholder="Tanggal akad" />
            <input type="text" name='email' placeholder="Waktu akad" />
            <input type="text" name='email' placeholder="Cari lokasi akad" />
        </>
    )
}

const ResepsiSection = () => {
    const [addReception, setAddReception] = useState(false)
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddReception(!addReception)
    }
    const additionalText = addReception?  "-1" : ""

    return (
        <>
            <div className="title-reception">
                <h1 className="label_input_bold">Resepsi</h1>
            </div>
            {addReception && <h1 className="label_input">Resepsi ke-1</h1>}
            <input type="text" name='email' placeholder={`Tanggal resepsi${additionalText}`} />
            <input type="text" name='email' placeholder={`Waktu resepsi${additionalText}`} />
            <input type="text" name='email' placeholder={`Cari lokasi resepsi${additionalText}`} />
            {!addReception && <a onClick={addingReception}>Tambah resepsi</a>}
            {
                addReception && <>
                    <div className="title-reception">
                        <h1 className="label_input_bold">Resepsi</h1>
                        <button className="close_reception_btn" onClick={addingReception}> <IoIosCloseCircle color="#474747" size={20} /></button>
                    </div>
                    <h1 className="label_input">Resepsi ke-2</h1>
                    <input type="text" name='email' placeholder="Tanggal resepsi-2" />
                    <input type="text" name='email' placeholder="Waktu resepsi-2" />
                    <input type="text" name='email' placeholder="Cari lokasi resepsi-2" /></>
            }
        </>
    )
}

export default JadwalLokasiItem