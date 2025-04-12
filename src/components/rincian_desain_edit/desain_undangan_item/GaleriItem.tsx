import { GaleriType } from '../../../redux/state/desainundangan/desainUndanganSlice'
import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

type GaleriItemType = {
    galeriItemData: Partial<GaleriType>
    setGaleriItemData: React.Dispatch<React.SetStateAction<Partial<GaleriType>>>
}

const GaleriItem = ({ galeriItemData, setGaleriItemData }: GaleriItemType) => {
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
            children={<Content galeriItemData={galeriItemData} setGaleriItemData={setGaleriItemData} />}
            toggleVal={galeriItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = ({ galeriItemData, setGaleriItemData }: GaleriItemType) => {
    console.log(galeriItemData)
    const onImageChange = (value: any) => {
        setGaleriItemData(prev => {
            return {
                ...prev,
                imageList: value
            }
        })
    }
    return (
        <div className="content_wrapper">
            <UploadGambarSection
                titleLable="Galeri pengantin (kamu bisa unggah sampai 10 foto)"
                onImageChange={onImageChange}
                sectionFolder="Gallery"
                photoUrl={galeriItemData?.imageList}
                updateDeleteImageField={() => null}
                multiple={true}
            />
        </div>
    )
}

export default GaleriItem