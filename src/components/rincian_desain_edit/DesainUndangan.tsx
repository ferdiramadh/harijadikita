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
import { useEffect, useState } from "react"
import { AyatSuciKalimatMutiaraType, PengantinType, SampulType } from "../../redux/state/desainundangan/desainUndanganSlice"
import { UserAuth } from "../../context/AuthContext"

const DesainUndangan = () => {
  const { editDesainUndanganData, setEdiDesainUndangantData } = UserAuth()
  const [sampulItemData, setSampulItemData] = useState<Partial<SampulType>>(editDesainUndanganData[0])
  const [pengantinItemData, setPengantinItemData] = useState<Partial<PengantinType>>(editDesainUndanganData[1])
  const [ayaSuciKataMutiaraItemData, setAyaSuciKataMutiaraItemData] = useState<Partial<AyatSuciKalimatMutiaraType>>(editDesainUndanganData[2])

  useEffect(() => {
    setEdiDesainUndangantData([sampulItemData, pengantinItemData, ayaSuciKataMutiaraItemData])
  }, [sampulItemData, pengantinItemData, ayaSuciKataMutiaraItemData])
  
  return (
    <div style={{ width: '100%', marginTop: "7vh" }}>
      <SampulItem sampulItemData={sampulItemData} setSampulItemData={setSampulItemData} />
      <PengantinItem pengantinItemData={pengantinItemData} setPengantinItemData={setPengantinItemData} />
      <AyatSuciKataMutiaraItem ayaSuciKataMutiaraItemData={ayaSuciKataMutiaraItemData} setAyaSuciKataMutiaraItemData={setAyaSuciKataMutiaraItemData} />
      {/* <button onClick={() => console.log(editDesainUndanganData)}>test</button>

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