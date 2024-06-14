import { FormDataType } from "../../../context/AuthContext"
import RincianPernikahanItem from "./RincianPernikahanItem"

type UpdateDataType = {
    editData: FormDataType
    updateData(field: Partial<FormDataType>): void

}

const NamaUndanganItem = ({editData, updateData}: UpdateDataType) => {
    return (
        <RincianPernikahanItem
            title="Nama undangan"
            children={<Content updateData={updateData} editData={editData}/>}
        />
    )
}

const Content = ({updateData, editData}: UpdateDataType) => {
    return(
        <div className="content_wrapper">
            <input placeholder="Nama Undangan" type="text" value={editData.namaUndangan}  onChange={e => updateData({ namaUndangan: e.target.value })} />
        </div>
    )
}

export default NamaUndanganItem