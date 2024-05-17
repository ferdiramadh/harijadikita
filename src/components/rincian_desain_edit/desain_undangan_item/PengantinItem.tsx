import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const PengantinItem = () => {
    return (
        <DesainUndanganItem
            title="Pengantin"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <UploadGambarSection titleLable="Gambar pengantin pria"/>
            <UploadGambarSection titleLable="Gambar pengantin wanita"/>
        </div>
    )
}


export default PengantinItem