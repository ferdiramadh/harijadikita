import SampulItem from "./desain_undangan_item/SampulItem"
import PengantinItem from "./desain_undangan_item/PengantinItem"
import GaleriItem from "./desain_undangan_item/GaleriItem"
import VideoItem from "./desain_undangan_item/VideoItem"
import MusikItem from "./desain_undangan_item/MusikItem"
import AyatSuciKataMutiaraItem from "./desain_undangan_item/AyatSuciKataMutiaraItem"
import ItemContainer from "./ItemContainer"
import LoveStoryItem from "./desain_undangan_item/LoveStoryItem"

const DesainUndangan = () => {

  return (
    <ItemContainer>
      <SampulItem />
      <PengantinItem />
      <AyatSuciKataMutiaraItem />
      <LoveStoryItem />
      <GaleriItem />
      <VideoItem />
      <MusikItem />
      {/* <AcaraPernikahanItem />
      <CountdownTimerItem />
      <RSVPUcapanItem />
      <HadiahUangItem /> */}
    </ItemContainer>
  )
}

export default DesainUndangan