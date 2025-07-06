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
            <label className="label_input" htmlFor='judul_rsvp'>Judul RSVP</label>
            <input id='judul_rsvp' type="text" placeholder="RSVP" />
            <label className="label_input" htmlFor='sub_judul'>Sub-judul RSVP</label>
            <input id='sub_judul' type="text" placeholder="Mohon konfirmasi kehadiran Anda" />
            <label className="label_input" htmlFor='judul_ucapan'>Judul Ucapan</label>
            <input id='judul_ucapan' type="text" placeholder="Ucapan dan Doa" />
            <label className="label_input" htmlFor='sub_judul_ucapan'>Sub-judul Ucapan</label>
            <input id='sub_judul_ucapan' type="text" placeholder="Berikan ucapan dan doa Anda..." />
        </div>
    )
}

export default RSVPUcapanItem