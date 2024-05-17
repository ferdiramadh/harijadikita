import DesainUndanganItem from "./DesainUndanganItem"
import UploadGambarSection from "./UploadGambarSection"

const SampulItem = () => {
    return (
        <DesainUndanganItem
            title="Sampul"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Teks pada tombol</label>
            <input type="text" placeholder="Buka undangan" />
            <UploadGambarSection titleLable="Gambar background"/>
        </div>
    )
}

export default SampulItem