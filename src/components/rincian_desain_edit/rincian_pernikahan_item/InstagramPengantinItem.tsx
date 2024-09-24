import { FormDataType } from "../../../redux/state/rinper/rinperSlice"
import RincianPernikahanItem from "./RincianPernikahanItem"

type UpdateDataType = {
    editData: FormDataType
    updateData(field: Partial<FormDataType>): void

}

const InstagramPengantinItem = ({ editData, updateData }: UpdateDataType) => {
    return (
        <RincianPernikahanItem
            title="Username instagram"
            children={<Content editData={editData} updateData={updateData} />}
        />
    )
}

const Content = ({ editData, updateData }: UpdateDataType) => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Username instagram pengantin pria</label>
            <input type="text" value={editData?.instaPengantinPria} onChange={e => updateData({ instaPengantinPria: e.target.value })} />
            <label className="label_input">Username instagram Nama pengantin wanita</label>
            <input type="text" value={editData?.instaPengantinWanita} onChange={e => updateData({ instaPengantinWanita: e.target.value })} />
        </div>
    )
}

export default InstagramPengantinItem