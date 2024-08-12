import { FormDataType } from "../../../redux/state/rinper/rinperSlice"
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
            <label className="label_input_bold">Pengantin pria</label>
            <input type="text" value={editData.pengantinPriaLengkap} onChange={e => updateData({ pengantinPriaLengkap: e.target.value })} placeholder="Nama lengkap dan gelar (jika ada)" />
            <input type="text" value={editData.pengantinPria} onChange={e => updateData({ pengantinPria: e.target.value })} placeholder="Nama panggilan" />
            <label className="label_input_bold">Pengantin wanita</label>
            <input type="text" value={editData.pengantinWanitaLengkap} onChange={e => updateData({ pengantinWanitaLengkap: e.target.value })} placeholder="Nama lengkap dan gelar (jika ada)" />
            <input type="text" value={editData.pengantinWanita} onChange={e => updateData({ pengantinWanita: e.target.value })} placeholder="Nama panggilan" />
        </div>
    )
}

export default NamaPengantinItem