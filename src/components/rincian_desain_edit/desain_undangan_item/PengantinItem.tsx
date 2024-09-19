import { PengantinType } from '../../../redux/state/desainundangan/desainUndanganSlice'
import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

type PengantinItemType = {
    pengantinItemData: Partial<PengantinType>
    setPengantinItemData: React.Dispatch<React.SetStateAction<Partial<PengantinType>>>
}

const PengantinItem = ({ pengantinItemData, setPengantinItemData }: PengantinItemType) => {
    const onToggle = () => {
        setPengantinItemData(prev => {
            return {
                ...prev,
                isActive: !prev.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Pengantin"
            children={<Content pengantinItemData={pengantinItemData} setPengantinItemData={setPengantinItemData} />}
            toggleVal={pengantinItemData.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = ({ pengantinItemData, setPengantinItemData }: PengantinItemType) => {
    const onImageChangePengantinPria = (value: string | ArrayBuffer | null | undefined) => {
        setPengantinItemData(prev => {
            return {
                ...prev,
                gambarPengantinPria: value
            }
        })
    }
    const onImageChangePengantinWanita = (value: string | ArrayBuffer | null | undefined) => {
        setPengantinItemData(prev => {
            return {
                ...prev,
                gambarPengantinWanita: value
            }
        })
    }
    return (
        <div className="content_wrapper">
            <UploadGambarSection titleLable="Gambar pengantin pria" onImageChange={onImageChangePengantinPria} sectionFolder='Pengatin_Pria' photoUrl={pengantinItemData.gambarPengantinPria}/>
            <UploadGambarSection titleLable="Gambar pengantin wanita" onImageChange={onImageChangePengantinWanita} sectionFolder='Pengatin_Wanita' photoUrl={pengantinItemData.gambarPengantinWanita}/>
        </div>
    )
}


export default PengantinItem