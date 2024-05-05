import RincianPernikahanItem from "./RincianPernikahanItem"

const InstagramPengantinItem = () => {
    return (
        <RincianPernikahanItem
            title="Username instagram"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Username instagram pengantin pria</label>
            <input type="text" name='email' />
            <label className="label_input">Username instagram Nama pengantin wanita</label>
            <input type="text" name='email' />
        </div>
    )
}

export default InstagramPengantinItem