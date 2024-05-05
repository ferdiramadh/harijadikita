import RincianPernikahanItem from "./RincianPernikahanItem"

const NamaPengantinItem = () => {
    return (
        <RincianPernikahanItem
            title="Nama pengantin"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Nama pengantin pria</label>
            <input type="text" name='email' />
            <label className="label_input">Nama pengantin wanita</label>
            <input type="text" name='email' />
        </div>
    )
}

export default NamaPengantinItem