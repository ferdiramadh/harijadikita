import { useState } from "react"
import { IoIosCloseCircle } from "react-icons/io"
import { FormDataType } from "../../../context/AuthContext"
import RincianPernikahanItem from "./RincianPernikahanItem"
import SearchableDropdown from "../../join/SearchableDropdown"
import { BankList } from "../../../utils/BankList"

type UpdateDataType = {
    editData: FormDataType
    updateData(field: Partial<FormDataType>): void

}
const RekeningPengantinItem = ({ editData, updateData }: UpdateDataType) => {
    return (
        <RincianPernikahanItem
            title="Rekening pengantin"
            children={<Content editData={editData} updateData={updateData} />}
        />
    )
}

const Content = ({ editData, updateData }: UpdateDataType) => {
    return (
        <div className="content_wrapper">
            <RekeningSection editData={editData} updateData={updateData} />
        </div>
    )
}

const RekeningSection = ({ editData, updateData }: UpdateDataType) => {
    const [addRekening, setAddRekening] = useState(false)
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddRekening(!addRekening)
    }
    const additionalText = addRekening ? " ke-1" : ""
    const [value, setValue] = useState(editData.namaBank)
    const [value2, setValue2] = useState(editData.namaBank2)
    const isSecondRek = editData.noRek2
    return (
        <>
            <div className="title-reception">
                <h1 className="label_input_bold">Pemiliki rekening{additionalText}</h1>
            </div>
            <input
                placeholder="Nama pemilik rekening "
                type="text"
                value={editData.namaRekening}
                onChange={e => updateData({ namaRekening: e.target.value })}
            />
            <SearchableDropdown
                options={BankList}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val: any) => setValue(val)}
                isRinPerPage={true}
            />
            <input
                placeholder="Masukkan no. rekening"
                type="text"
                value={editData.noRek}
                onChange={e => updateData({ noRek: e.target.value })}
            />
            {
                isSecondRek && <>
                    <div className="title-reception">
                        <h1 className="label_input_bold">Pemiliki rekening ke-2</h1>
                        <button className="close_reception_btn" onClick={addingReception}> <IoIosCloseCircle color="#474747" size={20} /></button>
                    </div>
                    <input
                        placeholder="Nama pemilik rekening "
                        type="text"
                        value={editData.namaRekening2}
                        onChange={e => updateData({ namaRekening: e.target.value })}
                    />
                    <SearchableDropdown
                        options={BankList}
                        label="name"
                        id="id"
                        selectedVal={value2}
                        handleChange={(val: any) => setValue2(val)}
                        isRinPerPage={true}
                    />
                    <input
                        placeholder="Masukkan no. rekening"
                        type="text"
                        value={editData.noRek2}
                        onChange={e => updateData({ noRek2: e.target.value })}
                    />
                </>
            }
        </>
    )
}

export default RekeningPengantinItem