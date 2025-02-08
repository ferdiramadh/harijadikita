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
import { AyatSuciKalimatMutiaraType, MusicType, PengantinType, SampulType, VideoType } from "../../redux/state/desainundangan/desainUndanganSlice"
import { UserAuth } from "../../context/AuthContext"

const DesainUndangan = () => {
  const { editDesainUndanganData, setEdiDesainUndangantData } = UserAuth()
  const [sampulItemData, setSampulItemData] = useState<Partial<SampulType>>(editDesainUndanganData[0])
  const [pengantinItemData, setPengantinItemData] = useState<Partial<PengantinType>>(editDesainUndanganData[1])
  const [ayaSuciKataMutiaraItemData, setAyaSuciKataMutiaraItemData] = useState<Partial<AyatSuciKalimatMutiaraType>>(editDesainUndanganData[2])
  const [videoItemData, setVideoItemData] = useState<Partial<VideoType>>(editDesainUndanganData[3])
  const [musikItemData, setMusikItemData] = useState<Partial<MusicType>>(editDesainUndanganData[4])

  useEffect(() => {
    // console.log(musikItemData)
    setEdiDesainUndangantData([sampulItemData, pengantinItemData, ayaSuciKataMutiaraItemData, videoItemData, musikItemData])
  }, [sampulItemData, pengantinItemData, ayaSuciKataMutiaraItemData, videoItemData, musikItemData])

  return (
    <div style={{ width: '100%', marginTop: "7vh" }}>
      <SampulItem sampulItemData={sampulItemData} setSampulItemData={setSampulItemData} />
      <PengantinItem pengantinItemData={pengantinItemData} setPengantinItemData={setPengantinItemData} />
      <AyatSuciKataMutiaraItem ayaSuciKataMutiaraItemData={ayaSuciKataMutiaraItemData} setAyaSuciKataMutiaraItemData={setAyaSuciKataMutiaraItemData} />
      <VideoItem videoItemData={videoItemData} setVideoItemData={setVideoItemData} />
      <MusikItem musikItemData={musikItemData} setMusikItemData={setMusikItemData} />
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