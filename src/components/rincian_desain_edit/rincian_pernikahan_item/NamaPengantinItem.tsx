import { FormDataType } from "../../../context/AuthContext"
import RincianPernikahanItem from "./RincianPernikahanItem"

type UpdateDataType = {
    editData: FormDataType
    updateData(field: Partial<FormDataType>): void

}

const NamaPengantinItem = ({ editData, updateData }: UpdateDataType) => {
    return (
        <RincianPernikahanItem
            title="Nama pengantin"
            children={<Content editData={editData} updateData={updateData} />}
        />
    )
}

const Content = ({ editData, updateData }: UpdateDataType) => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Nama pengantin pria</label>
            <input type="text" value={editData.pengantinPria} onChange={e => updateData({ pengantinPria: e.target.value })} />
            <label className="label_input">Nama pengantin wanita</label>
            <input type="text" value={editData.pengantinWanita} onChange={e => updateData({ pengantinWanita: e.target.value })} />
        </div>
    )
}

export default NamaPengantinItem