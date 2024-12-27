import { useSelector } from 'react-redux'
import { DESAIN_UNDANGAN } from '../../../database/Collections'
import { updateDataCollection } from '../../../database/Functions'
import { PengantinType } from '../../../redux/state/desainundangan/desainUndanganSlice'
import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'
import { RootState } from '../../../redux/store'
import { useEffect, useState } from 'react'
import { UserAuth } from '../../../context/AuthContext'

type PengantinItemType = {
    pengantinItemData: Partial<PengantinType>
    setPengantinItemData: React.Dispatch<React.SetStateAction<Partial<PengantinType>>>
}

const PengantinItem = ({ pengantinItemData, setPengantinItemData }: PengantinItemType) => {
    const onToggle = () => {
        setPengantinItemData(prev => {
            return {
                ...prev,
                isActive: !prev?.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Pengantin"
            children={<Content pengantinItemData={pengantinItemData} setPengantinItemData={setPengantinItemData} />}
            toggleVal={pengantinItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = ({ pengantinItemData, setPengantinItemData }: PengantinItemType) => {

    const { id: idDesainUndangan } = useSelector((state: RootState) => state.desainUndangan)
    const { editDesainUndanganData } = UserAuth()
    const [photoUrlPengantinPria, setPhotoUrlPengantinPria] = useState(pengantinItemData?.gambarPengantinPria)
    const [photoUrlPengantinWanita, setPhotoUrlPengantinWanita] = useState(pengantinItemData?.gambarPengantinWanita)
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
    const onToggle = () => {
        setPengantinItemData(prev => {
            return {
                ...prev,
                isNoImage: !prev?.isNoImage
            }
        })
    }
    const updateDeleteImageFieldPria = () => {
        setPhotoUrlPengantinPria("")
        setPengantinItemData(prev => {
            return {
                ...prev,
                gambarPengantinPria: ""
            }
        })
    }
    const updateDeleteImageFieldWanita = () => {
        setPhotoUrlPengantinWanita("")
        setPengantinItemData(prev => {
            return {
                ...prev,
                gambarPengantinWanita: ""
            }
        })
    }
    useEffect(() => {
        if ((pengantinItemData.gambarPengantinPria == "" && photoUrlPengantinPria == "") || pengantinItemData.gambarPengantinWanita == "" && photoUrlPengantinWanita == "") {
            updateDataCollection(DESAIN_UNDANGAN, editDesainUndanganData, idDesainUndangan)
        }

    }, [pengantinItemData, photoUrlPengantinPria, photoUrlPengantinWanita])

    return (
        <div className="content_wrapper">
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={pengantinItemData?.isNoImage} onChange={onToggle} />
                <p>Tanpa gambar atau foto</p>
            </div>
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={!pengantinItemData?.isNoImage} onChange={onToggle} />
                <p>Pakai gambar atau foto</p>
            </div>
            {
                !pengantinItemData?.isNoImage &&
                <>
                    <UploadGambarSection titleLable="Gambar pengantin pria" onImageChange={onImageChangePengantinPria} sectionFolder='Pengatin_Pria' photoUrl={photoUrlPengantinPria} updateDeleteImageField={updateDeleteImageFieldPria} />
                    <UploadGambarSection titleLable="Gambar pengantin wanita" onImageChange={onImageChangePengantinWanita} sectionFolder='Pengatin_Wanita' photoUrl={photoUrlPengantinWanita} updateDeleteImageField={updateDeleteImageFieldWanita} />
                </>
            }
        </div>
    )
}


export default PengantinItem