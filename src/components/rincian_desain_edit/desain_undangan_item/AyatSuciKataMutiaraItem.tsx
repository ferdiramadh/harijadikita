import { useEffect, useState } from 'react'
import DesainUndanganItem from './DesainUndanganItem'
import SearchableDropdown from '../../join/SearchableDropdown'
import { DesainUndanganAuth } from '../../../context/DesainUndanganContext'

const RELIGION = [
    {
        id: 1,
        name: "Buddha",
        verse: `“Kebahagiaan duniawi terbesar yang dapat dialami manusia adalah perpaduan dari pernikahan yang mengikat dua hati yang saling mencintai menjadi satu.”
(Sutta Pitaka – Digha Nikaya)`
    },
    {
        id: 2,
        name: "Hindu",
        verse: `Dalam sebuah pernikahan kalian disatukan demi sebuah kebahagiaan dengan janji hati untuk saling membahagiakan. Bersamaku engkau akan hidup selamanya karena Tuhan pasti akan memberikan karunia sebagai pelindung dan saksi dalam pernikahan ini. Untuk itulah kalian dipersatukan dalam satu keluarga. (Rgveda : X.85.36)`
    },
    {
        id: 3,
        name: "Islam",
        verse: `"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.” (Surah Ar Rum Ayat 21)`
    },
    {
        id: 4,
        name: "Katolik/Protestan",
        verse: `“Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.” (Matius 19:6)`
    },
    {
        id: 5,
        name: "Khonghucu",
        verse: `“Keselarasan hidup bersama anak istri itu laksana alat musik yang ditabuh harmonis. Kerukunan diantara kakak dan adik itu membangun damai dan bahagia. Maka demikianlah hendaknya engkau berbuat di dalam rumah tanggamu, bahagiakanlah istri dan anak-anakmu.” (Kitab Shi Jing BAB XIV. Setapak Demi Setapak)`
    },
]

const AyatSuciKataMutiaraItem = () => {

    const { ayatSuciKataMutiaraItemData, setAyatSuciKataMutiaraItemData } = DesainUndanganAuth()
    const onToggle = () => {
        setAyatSuciKataMutiaraItemData(prev => {
            return {
                ...prev,
                isActive: !prev?.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Ayat suci/kalimat mutiara"
            children={<Content />}
            toggleVal={ayatSuciKataMutiaraItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = () => {

    const { ayatSuciKataMutiaraItemData, setAyatSuciKataMutiaraItemData } = DesainUndanganAuth()
    const [value, setValue] = useState(RELIGION[2].name)
    const onToggleIsAyatSuci = () => {
        setAyatSuciKataMutiaraItemData(prev => {
            return {
                ...prev,
                isAyatSuci: !prev.isAyatSuci
            }
        })
    }

    useEffect(() => {
        if (value)
            setAyatSuciKataMutiaraItemData(prev => {
                let selectedReligion = RELIGION.filter((item, i) => item.name == value)
                return {
                    ...prev,
                    agama: selectedReligion[0].name,
                    ayatSuci: selectedReligion[0].verse
                }
            })
    }, [value])

    return (
        <div className="content_wrapper">
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={ayatSuciKataMutiaraItemData?.isAyatSuci} onChange={onToggleIsAyatSuci} />
                <p>Pilih ayat suci</p>
            </div>
            {
                ayatSuciKataMutiaraItemData.isAyatSuci
                &&
                <SearchableDropdown
                    options={RELIGION}
                    label="name"
                    id="id"
                    selectedVal={value}
                    handleChange={(val: any) => setValue(val)}
                    isRinPerPage={true}
                    objectName='Agama'
                />
            }

            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={!ayatSuciKataMutiaraItemData?.isAyatSuci} onChange={onToggleIsAyatSuci} />
                <p>Buat kalimat mutiara</p>
            </div>
            {
                !ayatSuciKataMutiaraItemData.isAyatSuci
                &&
                <textarea id="w3review" name="w3review" rows={6} cols={50} className='large_input_area' value={ayatSuciKataMutiaraItemData.kalimatMutiara} onChange={e => setAyatSuciKataMutiaraItemData(prev => {
                    return {
                        ...prev,
                        kalimatMutiara: e.target.value
                    }
                })} />
            }

        </div>
    )
}

export default AyatSuciKataMutiaraItem