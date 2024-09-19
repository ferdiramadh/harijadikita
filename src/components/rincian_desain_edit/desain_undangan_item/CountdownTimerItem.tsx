import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const CountdownTimerItem = () => {
    return (
        <DesainUndanganItem
            title="Countdown timer"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            {/* <UploadGambarSection titleLable="Gambar bersama pengantin pria dan wanita"/> */}
        </div>
    )
}

export default CountdownTimerItem