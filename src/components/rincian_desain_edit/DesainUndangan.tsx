import SampulItem from "./desain_undangan_item/SampulItem"
import PengantinItem from "./desain_undangan_item/PengantinItem"
import AcaraPernikahanItem from "./desain_undangan_item/AcaraPernikahanItem"
import CountdownTimerItem from "./desain_undangan_item/CountdownTimerItem"
import LoveStoryItem from "./desain_undangan_item/LoveStoryItem"
import GaleriItem from "./desain_undangan_item/GaleriItem"
import VideoItem from "./desain_undangan_item/VideoItem"
import RSVPUcapanItem from "./desain_undangan_item/RSVPUcapanItem"
import HadiahUangItem from "./desain_undangan_item/HadiahUangItem"
import MusikItem from "./desain_undangan_item/MusikItem"
import AyatSuciKataMutiaraItem from "./desain_undangan_item/AyatSuciKataMutiaraItem"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { AyatSuciKalimatMutiaraType, INITIAL_EDIT_DESAIN_DATA, ItemValueType, PengantinType, SampulType } from "../../redux/state/desainundangan/desainUndanganSlice"

export type DesainUndanganType = {
  editDesainUndanganData: (Partial<SampulType> | Partial<PengantinType> | Partial<AyatSuciKalimatMutiaraType>)[]
  setEdiDesainUndangantData: React.Dispatch<React.SetStateAction<(Partial<SampulType> | Partial<PengantinType> | Partial<AyatSuciKalimatMutiaraType>)[]>>

}

const DesainUndangan = ({editDesainUndanganData, setEdiDesainUndangantData}: DesainUndanganType) => {
  const { data, id } = useSelector((state: RootState) => state.desainUndangan)
  // const [editData, setEditData] = useState<ItemValueType[]>(INITIAL_EDIT_DESAIN_DATA)
  const [sampulItemData, setSampulItemData] = useState<Partial<SampulType>>(editDesainUndanganData[0])
  const [pengantinItemData, setPengantinItemData] = useState<Partial<PengantinType>>(editDesainUndanganData[1])
  const [ayaSuciKataMutiaraItemData, setAyaSuciKataMutiaraItemData] = useState<Partial<AyatSuciKalimatMutiaraType>>(editDesainUndanganData[2])
  const test = [{ id: 1, name: "abc" }, { id: 2, name: "xxx" }]
  const test2 = [{ id: 2, name: "xxx" }, { id: 1, name: "abc" }]
  // console.log(arraysEqual(test.sort((a,b) => a.id - b.id), test2.sort((a,b) => a.id - b.id)))
  function arraysEqual(a1: any, a2: any) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
  }
  function compareNumbers(a: any, b: any) {
    return a.id - b.id;
  }
  let tesx = [sampulItemData,pengantinItemData,ayaSuciKataMutiaraItemData]
  useEffect(() => {
    setEdiDesainUndangantData([sampulItemData,pengantinItemData,ayaSuciKataMutiaraItemData])
  }, [sampulItemData,pengantinItemData,ayaSuciKataMutiaraItemData])
  return (
    <div style={{ width: '100%', marginTop: "7vh" }}>
      <SampulItem sampulItemData={sampulItemData} setSampulItemData={setSampulItemData} />
      <PengantinItem pengantinItemData={pengantinItemData} setPengantinItemData={setPengantinItemData} />
      <AyatSuciKataMutiaraItem ayaSuciKataMutiaraItemData={ayaSuciKataMutiaraItemData} setAyaSuciKataMutiaraItemData={setAyaSuciKataMutiaraItemData}/> 
      {/* <button onClick={() => console.log(editDesainUndanganData)}>test</button> */}

      {/* <AcaraPernikahanItem />
      <CountdownTimerItem />
      <LoveStoryItem />
      <GaleriItem />
      <VideoItem />
      <RSVPUcapanItem />
      <HadiahUangItem />
      <MusikItem /> */}
    </div>
  )
}

export default DesainUndangan