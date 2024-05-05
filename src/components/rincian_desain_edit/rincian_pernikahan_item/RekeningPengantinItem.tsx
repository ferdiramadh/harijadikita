import { useState } from "react"
import RincianPernikahanItem from "./RincianPernikahanItem"
import { IoIosCloseCircle } from "react-icons/io"

const RekeningPengantinItem = () => {
    return (
        <RincianPernikahanItem
            title="Rekening pengantin"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <RekeningSection />
        </div>
    )
}

const RekeningSection = () => {
    const [addRekening, setAddRekening] = useState(false)
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddRekening(!addRekening)
    }
    const additionalText = addRekening ? " ke-1" : ""

    return (
        <>
            <div className="title-reception">
                <h1 className="label_input_bold">Pemiliki rekening{additionalText}</h1>
            </div>
            <input type="text" name='email' placeholder="Nama pemilik rekening" />
            <input type="text" name='email' placeholder="Pilih bank" />
            <input type="text" name='email' placeholder="Masukkan no.rekening" />
            {!addRekening && <a onClick={addingReception}>Tambah rekening</a>}
            {
                addRekening && <>
                    <div className="title-reception">
                        <h1 className="label_input_bold">Pemiliki rekening ke-2</h1>
                        <button className="close_reception_btn" onClick={addingReception}> <IoIosCloseCircle color="#474747" size={20} /></button>
                    </div>
                    <input type="text" name='email' placeholder="Nama pemilik rekening" />
                    <input type="text" name='email' placeholder="Pilih bank" />
                    <input type="text" name='email' placeholder="Masukkan no.rekening" />
                </>
            }
        </>
    )
}

export default RekeningPengantinItem