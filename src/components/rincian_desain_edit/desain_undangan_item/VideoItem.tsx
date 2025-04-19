import { DesainUndanganAuth } from '../../../context/DesainUndanganContext'
import { VideoType } from '../../../redux/state/desainundangan/desainUndanganSlice'
import DesainUndanganItem from './DesainUndanganItem'

type VideoItemType = {
    videoItemData: Partial<VideoType>
    setVideoItemData: React.Dispatch<React.SetStateAction<Partial<VideoType>>>
}

const VideoItem = () => {
    const { videoItemData, setVideoItemData } = DesainUndanganAuth()
    const onToggle = () => {
        setVideoItemData(prev => {
            return {
                ...prev,
                isActive: !prev?.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Video"
            children={<Content />}
            toggleVal={videoItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = () => {
    
    const { videoItemData, setVideoItemData } = DesainUndanganAuth()
    const splitYtId = (value: string | undefined) => {
        if (value) {
            if (value.indexOf("v/") > -1) {
                const stringArray = value.split("v/")
                return stringArray[1]
            }
            if (value.indexOf("?v=") > -1) {
                const stringArray = value.split("?v=")
                return stringArray[1]
            }
            if (value.indexOf("tu.be/") > -1) {
                const stringArray = value.split("tu.be/")
                return stringArray[1]
            }
            return ""
        }
        return ""
    }

    return (
        <div className="content_wrapper">
            <label className="label_input">Video pengantin via link youtube</label>
            <input type="text" placeholder="Masukkan link youtube" value={videoItemData?.videoUrl} onChange={e => setVideoItemData(prev => {
                return {
                    ...prev,
                    videoUrl: e.target.value
                }
            })} />
            {
                videoItemData.videoUrl && splitYtId(videoItemData.videoUrl) ? <iframe className='video'
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                    src={`https://youtube.com/embed/${splitYtId(videoItemData.videoUrl)}?autoplay=0`}>
                </iframe> : null
            }
        </div>
    )
}

export default VideoItem