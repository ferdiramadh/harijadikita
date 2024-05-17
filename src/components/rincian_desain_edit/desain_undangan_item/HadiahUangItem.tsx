import DesainUndanganItem from './DesainUndanganItem'

const HadiahUangItem = () => {
    return (
        <DesainUndanganItem
            title="Hadiah uang"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Judul</label>
            <input type="text" placeholder="Wedding Gift" />
            <label className="label_input">Sub-judul</label>
            <input type="text" placeholder="Kirimkan hadiah uang kepada pengantin." />
            <label className="label_input">Teks pada tombol</label>
            <input type="text" placeholder="Kirim hadiah" />
        </div>
    )
}

export default HadiahUangItem