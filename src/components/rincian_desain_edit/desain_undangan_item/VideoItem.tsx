import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const VideoItem = () => {
    return (
        <DesainUndanganItem
            title="Video"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Video pengantin via link youtube</label>
            <input type="text" placeholder="Masukkan link youtube" />
            <UploadGambarSection titleLable="Video pengantin"/>
        </div>
    )
}

export default VideoItem