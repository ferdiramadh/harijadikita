import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const LoveStoryItem = () => {
    return (
        <DesainUndanganItem
            title="Love story"
            children={<Content />}
        />
    )
}

const Content = () => {
    return (
        <div className="content_wrapper">
            <label className="label_input">Judul</label>
            <input type="text" placeholder="Bertemu saat kuliah" />
            <label className="label_input">Cerita</label>
            <textarea id="w3review" name="w3review" rows={6} cols={50} className='story_input_area'></textarea>
            <UploadGambarSection titleLable="Gambar" />
            <button type="submit" id="submitBtn" className="add_story_btn">
                Tambah cerita
            </button>
        </div>
    )
}

export default LoveStoryItem