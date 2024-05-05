import RincianPernikahanItem from "./RincianPernikahanItem"

const NamaUndanganItem = () => {
    return (
        <RincianPernikahanItem
            title="Nama undangan"
            children={<Content />}
        />
    )
}

const Content = () => {
    return(
        <div className="content_wrapper">
            <input placeholder="Nama Undangan" type="text" name='email' />
        </div>
    )
}

export default NamaUndanganItem