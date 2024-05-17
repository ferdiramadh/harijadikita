import DesainUndanganItem from './DesainUndanganItem'

const RSVPUcapanItem = () => {
    return (
        <DesainUndanganItem
            title="RSVP dan Ucapan"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Judul RSVP</label>
            <input type="text" placeholder="RSVP" />
            <label className="label_input">Sub-judul RSVP</label>
            <input type="text" placeholder="Mohon konfirmasi kehadiran Anda" />
            <label className="label_input">Judul Ucapan</label>
            <input type="text" placeholder="Ucapan dan Doa" />
            <label className="label_input">Sub-judul Ucapan</label>
            <input type="text" placeholder="Berikan ucapan dan doa Anda..." />
        </div>
    )
}

export default RSVPUcapanItem