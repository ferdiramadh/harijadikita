import DesainUndanganItem from "./DesainUndanganItem"
import UploadGambarSection from "./UploadGambarSection"

const MusikItem = () => {
    return (
        <DesainUndanganItem
            title="Musik"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Musik via link Spotify</label>
            <input type="text" placeholder="Masukkan link Spotify" />
            <label className="label_input">Pilih musik romantis pilihan harijadikita</label>
            <input type="text" placeholder="Thousand Years - Katy Perry"/>
            <UploadGambarSection titleLable="Unggah berkas musik"/>
        </div>
    )
}

export default MusikItem