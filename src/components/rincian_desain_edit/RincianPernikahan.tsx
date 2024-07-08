import NamaPengantinItem from "./rincian_pernikahan_item/NamaPengantinItem"
import InstagramPengantinItem from "./rincian_pernikahan_item/InstagramPengantinItem"
import KeluargaPengantinItem from "./rincian_pernikahan_item/KeluargaPengantinItem"
import JadwalLokasiItem from "./rincian_pernikahan_item/JadwalLokasiItem"
import RekeningPengantinItem from "./rincian_pernikahan_item/RekeningPengantinItem"
import { FormDataType } from "../../context/AuthContext"

type UpdateDataType = {
  editData: FormDataType
  updateData(field: Partial<FormDataType>): void

}

const RincianPernikahan = ({ editData, updateData }: UpdateDataType) => {

  return (
    <div style={{ width: '100%', marginTop: "7vh" }}>
      <NamaPengantinItem editData={editData} updateData={updateData} />
      <InstagramPengantinItem editData={editData} updateData={updateData} />
      <KeluargaPengantinItem editData={editData} updateData={updateData} />
      <JadwalLokasiItem editData={editData} updateData={updateData} />
      <RekeningPengantinItem editData={editData} updateData={updateData} />
      <div style={{ flex: 1, marginBottom: 500, width: "100%", height: 200 }} />
      {/* <button onClick={() => {
        console.log(data)
        if (data == editData) {
          alert("sama nih")
        } else {
          alert("beda nih")
        }

      }}>Test Data</button> */}
    </div>
  )
}

export default RincianPernikahan