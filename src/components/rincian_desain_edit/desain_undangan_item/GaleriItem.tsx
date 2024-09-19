import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const GaleriItem = () => {
    return (
        <DesainUndanganItem
            title="Galeri"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            {/* <UploadGambarSection titleLable="Galeri pengantin (kamu bisa unggah sampai 10 foto)" /> */}
        </div>
    )
}

export default GaleriItem