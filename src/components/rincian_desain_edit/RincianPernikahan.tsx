import NamaUndanganItem from "./rincian_pernikahan_item/NamaUndanganItem"
import NamaPengantinItem from "./rincian_pernikahan_item/NamaPengantinItem"
import InstagramPengantinItem from "./rincian_pernikahan_item/InstagramPengantinItem"
import KeluargaPengantinItem from "./rincian_pernikahan_item/KeluargaPengantinItem"
import JadwalLokasiItem from "./rincian_pernikahan_item/JadwalLokasiItem"
import RekeningPengantinItem from "./rincian_pernikahan_item/RekeningPengantinItem"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useState } from "react"
import { FormDataType } from "../../context/AuthContext"

const RincianPernikahan = () => {
  const data = useSelector((state: RootState) => state.rinper.data)
  const [editData, setEditData] = useState<FormDataType>(data)
  function updateData(field: Partial<FormDataType>) {
    setEditData(prev => {
      return { ...prev, ...field }
    })
  }

  return (
    <div style={{ width: '100%', marginTop: "7vh" }}>
      <NamaUndanganItem editData={editData} updateData={updateData}/>
      <NamaPengantinItem editData={editData} updateData={updateData}/>
      <InstagramPengantinItem editData={editData} updateData={updateData}/>
      <KeluargaPengantinItem editData={editData} updateData={updateData}/>
      <JadwalLokasiItem editData={editData} updateData={updateData}/>
      <RekeningPengantinItem editData={editData} updateData={updateData} />
      <button onClick={() => {
        console.log(data)
        if(data == editData) {
          alert("sama nih")
        } else {
          alert("beda nih")
        }

      }}>Test Data</button>
    </div>
  )
}

export default RincianPernikahan