import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'
import { useState } from 'react'
import { DesainUndanganAuth } from '../../../context/DesainUndanganContext'

const PengantinItem = () => {

    const { pengantinItemData, setPengantinItemData } = DesainUndanganAuth()
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
            children={<Content />}
            toggleVal={pengantinItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = () => {

    const { pengantinItemData, setPengantinItemData } = DesainUndanganAuth()
    const [photoUrlPengantinPria, setPhotoUrlPengantinPria] = useState({
        id: pengantinItemData?.gambarPengantinPria?.id,
        imageUrl: pengantinItemData?.gambarPengantinPria?.imageUrl
    })
    const [photoUrlPengantinWanita, setPhotoUrlPengantinWanita] = useState({
        id: pengantinItemData?.gambarPengantinWanita?.id,
        imageUrl: pengantinItemData?.gambarPengantinWanita?.imageUrl
    })
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
        setPhotoUrlPengantinPria({
            id,
            imageUrl: value
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
        setPhotoUrlPengantinWanita({
            id,
            imageUrl: value
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
        setPhotoUrlPengantinPria({
            id: 0,
            imageUrl: ""
        })
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
        setPhotoUrlPengantinWanita(
            {
                id: 0,
                imageUrl: ""
            }
        )
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
                    <UploadGambarSection titleLable="Gambar pengantin pria" onImageChange={onImageChangePengantinPria} sectionFolder='Pengatin_Pria' photoUrl={photoUrlPengantinPria.imageUrl} updateDeleteImageField={updateDeleteImageFieldPria} photoId={photoUrlPengantinPria.id} />
                    <UploadGambarSection titleLable="Gambar pengantin wanita" onImageChange={onImageChangePengantinWanita} sectionFolder='Pengatin_Wanita' photoUrl={photoUrlPengantinWanita.imageUrl} updateDeleteImageField={updateDeleteImageFieldWanita} photoId={photoUrlPengantinWanita.id} />
                </>
            }
        </div>
    )
}


export default PengantinItem