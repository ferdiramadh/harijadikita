import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const AcaraPernikahanItem = () => {
    return (
        <DesainUndanganItem
            title="Acara pernikahan"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <UploadGambarSection titleLable="Gambar bersama pengantin pria dan wanita"/>
        </div>
    )
}

export default AcaraPernikahanItem