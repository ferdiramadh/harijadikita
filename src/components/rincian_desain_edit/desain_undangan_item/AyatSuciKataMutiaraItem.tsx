import { useState } from 'react'
import DesainUndanganItem from './DesainUndanganItem'
import SearchableDropdown from '../../join/SearchableDropdown'

function AyatSuciKataMutiaraItem() {
    return (
        <DesainUndanganItem
            title="Ayat suci/kalimat mutiara"
            children={<Content />}
        />
    )
}

const Content = () => {
    const [isAyat, setIsAyat] = useState(true)
    const [religion, setReligion] = useState([
        {
            id: 1,
            name: "Buddha"
        },
        {
            id: 2,
            name: "Hindu"
        },
        {
            id: 3,
            name: "Islam"
        },
        {
            id: 4,
            name: "Katolik/Protestan"
        },
        {
            id: 5,
            name: "Khonghucu"
        },
    ]
    )
    const [value, setValue] = useState(religion[2].name)
    return (
        <div className="content_wrapper">
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={isAyat} onClick={() => setIsAyat(!isAyat)}/>
                <p>Pilih ayat suci</p>
            </div>
            <SearchableDropdown
                options={religion}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val: any) => setValue(val)}
                isRinPerPage={true}
                objectName='Agama'
            />
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={!isAyat} onClick={() => setIsAyat(!isAyat)}/>
                <p>Buat kalimat mutiara</p>
            </div>
            <textarea id="w3review" name="w3review" rows={6} cols={50} className='large_input_area'></textarea>
        </div>
    )
}

export default AyatSuciKataMutiaraItem