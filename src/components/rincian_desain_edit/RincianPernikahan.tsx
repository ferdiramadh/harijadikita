import NamaUndanganItem from "./rincian_pernikahan_item/NamaUndanganItem"
import NamaPengantinItem from "./rincian_pernikahan_item/NamaPengantinItem"
import InstagramPengantinItem from "./rincian_pernikahan_item/InstagramPengantinItem"
import KeluargaPengantinItem from "./rincian_pernikahan_item/KeluargaPengantinItem"
import JadwalLokasiItem from "./rincian_pernikahan_item/JadwalLokasiItem"
import RekeningPengantinItem from "./rincian_pernikahan_item/RekeningPengantinItem"

const RincianPernikahan = () => {
  return (
    <div style={{ width: '100%' }}>
      <NamaUndanganItem />
      <NamaPengantinItem />
      <InstagramPengantinItem />
      <KeluargaPengantinItem />
      <JadwalLokasiItem />
      <RekeningPengantinItem />
    </div>
  )
}

export default RincianPernikahan