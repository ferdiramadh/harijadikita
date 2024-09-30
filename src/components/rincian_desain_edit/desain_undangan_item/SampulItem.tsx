import DesainUndanganItem from "./DesainUndanganItem"
import UploadGambarSection from "./UploadGambarSection"
import { SampulType } from "../../../redux/state/desainundangan/desainUndanganSlice"

type SampulItemType = {
    sampulItemData: Partial<SampulType>
    setSampulItemData: React.Dispatch<React.SetStateAction<Partial<SampulType>>>
}
const SampulItem = ({ sampulItemData, setSampulItemData }: SampulItemType) => {
    const onToggle = () => {
        setSampulItemData(prev => {
            return {
                ...prev,
                isActive: !prev.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Sampul"
            children={<Content sampulItemData={sampulItemData} setSampulItemData={setSampulItemData} />}
            toggleVal={sampulItemData.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = ({ sampulItemData, setSampulItemData }: SampulItemType) => {
    const onImageChange = (value: string | ArrayBuffer | null | undefined) => {
        setSampulItemData(prev => {
            return {
                ...prev,
                gambarBackground: value
            }
        })
    }
    const onToggle = () => {
        setSampulItemData(prev => {
            return {
                ...prev,
                isGunakanTema: !prev.isGunakanTema
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
                !sampulItemData.isGunakanTema &&
                <>
                    <label className="label_input">Teks pada tombol</label>
                    <input type="text" placeholder="Buka undangan" value={sampulItemData.teksTombol} onChange={e => setSampulItemData(prev => {
                        return {
                            ...prev,
                            teksTombol: e.target.value
                        }
                    })} />
                    <UploadGambarSection titleLable="Gambar background" onImageChange={onImageChange} sectionFolder="Sampul" photoUrl={sampulItemData.gambarBackground} />
                </>
            }

        </div>
    )
}

export default SampulItem