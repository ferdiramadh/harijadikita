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

const DesainUndangan = () => {
  return (
    <div style={{ width: '100%' }}>
      <SampulItem />
      <PengantinItem />
      <AcaraPernikahanItem />
      <CountdownTimerItem />
      <LoveStoryItem />
      <GaleriItem />
      <VideoItem />
      <RSVPUcapanItem />
      <HadiahUangItem />
      <MusikItem />
    </div>
  )
}

export default DesainUndangan