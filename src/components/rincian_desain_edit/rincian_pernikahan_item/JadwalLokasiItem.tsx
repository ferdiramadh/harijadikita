import { useState } from "react"
import { IoIosCloseCircle } from "react-icons/io"
import { FormDataType } from "../../../context/AuthContext"
import RincianPernikahanItem from "./RincianPernikahanItem"

type UpdateDataType = {
    editData: FormDataType
    updateData(field: Partial<FormDataType>): void

}

const JadwalLokasiItem = ({ editData, updateData }: UpdateDataType) => {
    return (
        <RincianPernikahanItem
            title="Jadwal dan lokasi"
            children={<Content editData={editData} updateData={updateData} />}
        />
    )
}

const Content = ({ editData, updateData }: UpdateDataType) => {
    return (
        <div className="content_wrapper">
            <AkadSection editData={editData} updateData={updateData} />
            <ResepsiSection editData={editData} updateData={updateData} />
        </div>
    )
}

const AkadSection = ({ editData, updateData }: UpdateDataType) => {
    return (
        <>
            <label className="label_input_bold">Akad</label>
            <input placeholder="Tanggal akad" type="date" value={editData.tglAkad} onChange={e => updateData({ tglAkad: e.target.value })} />
            <input placeholder="Waktu akad" type="time" value={editData.wktAkad} onChange={e => updateData({ wktAkad: e.target.value })} />
            <input placeholder="Cari lokasi akad" value={editData.lokasiAkad} onChange={e => updateData({ lokasiAkad: e.target.value })} />
        </>
    )
}

const ResepsiSection = ({ editData, updateData }: UpdateDataType) => {
    const [addReception, setAddReception] = useState(false)
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddReception(!addReception)
    }
    const additionalText = addReception ? "-1" : ""

    return (
        <>
            <div className="title-reception">
                <h1 className="label_input_bold">Resepsi</h1>
            </div>
            {addReception && <h1 className="label_input">Resepsi ke-1</h1>}
            <input placeholder={`Tanggal resepsi${additionalText}`} type="date" value={editData.tglResepsi} onChange={e => updateData({ tglResepsi: e.target.value })} />
            <input placeholder={`Waktu resepsi${additionalText}`} type="time" value={editData.wktResepsi} onChange={e => updateData({ wktResepsi: e.target.value })} />
            <input placeholder={`Cari lokasi resepsi${additionalText}`} value={editData.lokasiResepsi} onChange={e => updateData({ lokasiResepsi: e.target.value })} />
            {/* {!addReception && <a onClick={addingReception}>Tambah resepsi</a>}
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
            } */}
        </>
    )
}

export default JadwalLokasiItem