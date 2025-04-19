import { useSelector } from 'react-redux'
import { DESAIN_UNDANGAN } from '../../../database/Collections'
import { updateDataCollection } from '../../../database/Functions'
import { PengantinType } from '../../../redux/state/desainundangan/desainUndanganSlice'
import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'
import { RootState } from '../../../redux/store'
import { useEffect, useState } from 'react'
import { UserAuth } from '../../../context/AuthContext'
import { DesainUndanganAuth } from '../../../context/DesainUndanganContext'

// type PengantinItemType = {
//     pengantinItemData: Partial<PengantinType>
//     setPengantinItemData: React.Dispatch<React.SetStateAction<Partial<PengantinType>>>
// }

const PengantinItem = () => {
    const { pengantinItemData, setPengantinItemData } = DesainUndanganAuth()
    const onToggle = () => {
        console.log(pengantinItemData)
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
            children={<Content />}
            toggleVal={pengantinItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = () => {
    const { pengantinItemData, setPengantinItemData } = DesainUndanganAuth()
    const { id: idDesainUndangan } = useSelector((state: RootState) => state.desainUndangan)
    const { editDesainUndanganData } = UserAuth()
    const [photoUrlPengantinPria, setPhotoUrlPengantinPria] = useState(pengantinItemData?.gambarPengantinPria?.imageUrl)
    const [photoUrlPengantinWanita, setPhotoUrlPengantinWanita] = useState(pengantinItemData?.gambarPengantinWanita?.imageUrl)
    const onImageChangePengantinPria = (value: string | ArrayBuffer | null | undefined, id: string) => {
        setPengantinItemData(prev => {
            return {
                ...prev,
                gambarPengantinPria: {
                    id: id,
                    imageUrl: value
                }
            }
        })
    }
    const onImageChangePengantinWanita = (value: string | ArrayBuffer | null | undefined, id: string) => {
        setPengantinItemData(prev => {
            return {
                ...prev,
                gambarPengantinWanita: {
                    id: id,
                    imageUrl: value
                }
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
                gambarPengantinPria: {
                    id: "",
                    imageUrl: ""
                }
            }
        })
    }
    const updateDeleteImageFieldWanita = () => {
        setPhotoUrlPengantinWanita("")
        setPengantinItemData(prev => {
            return {
                ...prev,
                gambarPengantinWanita: {
                    id: "",
                    imageUrl: ""
                }
            }
        })
    }
    // useEffect(() => {
    //     if ((pengantinItemData.gambarPengantinPria == "" && photoUrlPengantinPria == "" && idDesainUndangan) || pengantinItemData.gambarPengantinWanita == "" && photoUrlPengantinWanita == "" && idDesainUndangan) {
    //         console.log("pengantinitem set kosong")
    //         updateDataCollection(DESAIN_UNDANGAN, editDesainUndanganData, idDesainUndangan)
    //     }

    // }, [pengantinItemData, photoUrlPengantinPria, photoUrlPengantinWanita])

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