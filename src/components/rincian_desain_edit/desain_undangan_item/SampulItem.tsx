import DesainUndanganItem from "./DesainUndanganItem"
import UploadGambarSection from "./UploadGambarSection"
import { useState } from "react"
import { DesainUndanganAuth } from "../../../context/DesainUndanganContext"


const SampulItem = () => {
    const { sampulItemData, setSampulItemData } = DesainUndanganAuth()
    const onToggle = () => {
        setSampulItemData(prev => {
            return {
                ...prev,
                isActive: !prev?.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Sampul"
            children={<Content />}
            toggleVal={sampulItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = () => {
    const { sampulItemData, setSampulItemData } = DesainUndanganAuth()
    const [photoUrl, setPhotoUrl] = useState({
        id: sampulItemData?.gambarBackground?.id,
        imageUrl: sampulItemData?.gambarBackground?.imageUrl
    })
    const onImageChange = (value: string | ArrayBuffer | null | undefined, id: string) => {

        setSampulItemData(prev => {
            return {
                ...prev,
                gambarBackground: {
                    id: id,
                    imageUrl: value
                }
            }
        })
        setPhotoUrl({
            id: id,
            imageUrl: value
        })
    }
    const onToggle = () => {
        setSampulItemData(prev => {
            return {
                ...prev,
                isGunakanTema: !prev?.isGunakanTema
            }
        })
    }
    const updateDeleteImageField = () => {
        setPhotoUrl({
            id: 0,
            imageUrl: ""
        })
        setSampulItemData(prev => {
            return {
                ...prev,
                gambarBackground: {
                    id: "",
                    imageUrl: ""
                }
            }
        })
    }

    return (
        <div className="content_wrapper">
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={sampulItemData?.isGunakanTema} onChange={onToggle} />
                <p>Gunakan dari tema</p>
            </div>
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={!sampulItemData?.isGunakanTema} onChange={onToggle} />
                <p>Gunakan punya pengantin</p>
            </div>
            {
                !sampulItemData?.isGunakanTema &&
                <>
                    <label className="label_input" htmlFor="text-pada-tombol">Teks pada tombol</label>
                    <input 
                    id="text-pada-tombol"
                    type="text" 
                    placeholder="Buka undangan" 
                    value={sampulItemData?.teksTombol} onChange={e => setSampulItemData(prev => {
                        return {
                            ...prev,
                            teksTombol: e.target.value
                        }
                    })} />
                    <UploadGambarSection
                        titleLable="Gambar background"
                        onImageChange={onImageChange}
                        sectionFolder="Sampul"
                        photoUrl={photoUrl.imageUrl}
                        updateDeleteImageField={updateDeleteImageField}
                        photoId={photoUrl.id}
                    />
                </>
            }
        </div>
    )
}

export default SampulItem