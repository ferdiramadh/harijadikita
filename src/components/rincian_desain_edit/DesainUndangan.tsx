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
import { AyatSuciKalimatMutiaraType, GaleriType, MusicType, PengantinType, SampulType, VideoType } from "../../redux/state/desainundangan/desainUndanganSlice"
import { UserAuth } from "../../context/AuthContext"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const DesainUndangan = () => {
  const { editDesainUndanganData, setEdiDesainUndangantData } = UserAuth()
  const { id, data } = useSelector((state: RootState) => state.desainUndangan)
  // const [sampulItemData, setSampulItemData] = useState<Partial<SampulType>>(data[0])
  // const [pengantinItemData, setPengantinItemData] = useState<Partial<PengantinType>>(data[1])
  // const [ayaSuciKataMutiaraItemData, setAyaSuciKataMutiaraItemData] = useState<Partial<AyatSuciKalimatMutiaraType>>(editDesainUndanganData[2])
  // const [videoItemData, setVideoItemData] = useState<Partial<VideoType>>(editDesainUndanganData[3])
  // const [musikItemData, setMusikItemData] = useState<Partial<MusicType>>(editDesainUndanganData[4])
  // const [galeriItemData, setGaleriItemData] = useState<Partial<GaleriType>>(editDesainUndanganData[5])

  // useEffect(() => {
  //   console.log("kabeh")
  //   setEdiDesainUndangantData([sampulItemData, pengantinItemData, ayaSuciKataMutiaraItemData, videoItemData, musikItemData, galeriItemData])
  // }, [sampulItemData, pengantinItemData, ayaSuciKataMutiaraItemData, videoItemData, musikItemData, galeriItemData])

  return (
    <div style={{ width: '100%', marginTop: "7vh" }}>
      <SampulItem />
      <PengantinItem />
      <AyatSuciKataMutiaraItem />
      <VideoItem />
      <MusikItem />
      <GaleriItem />
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