import { DesainUndanganAuth } from '../../../context/DesainUndanganContext'
import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const GaleriItem = () => {

    const { galeriItemData, setGaleriItemData } = DesainUndanganAuth()
    const onToggle = () => {
        setGaleriItemData(prev => {
            return {
                ...prev,
                isActive: !prev?.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Galeri"
            children={<Content />}
            toggleVal={galeriItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = () => {

    const { galeriItemData, setGaleriItemData } = DesainUndanganAuth()
    const onImageChange = (value: any) => {
        setGaleriItemData(prev => {
            return {
                ...prev,
                imageList: value
            }
        })
    }
    const updateDeleteImageField = (deletedId: number | undefined) => {
        setGaleriItemData(prevItems => ({
            ...prevItems,
            imageList: prevItems?.imageList?.filter(item => item.id !== deletedId)
        }))
    }
    return (
        <div className="content_wrapper">
            <UploadGambarSection
                titleLable="Galeri pengantin (kamu bisa unggah sampai 10 foto)"
                onImageChange={onImageChange}
                sectionFolder="Gallery"
                photoUrl={galeriItemData?.imageList}
                updateDeleteImageField={updateDeleteImageField}
                multiple={true}
            />
        </div>
    )
}

export default GaleriItem