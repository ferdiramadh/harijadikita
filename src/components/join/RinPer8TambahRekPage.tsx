import { JoinPageType } from "../../pages/JoinPage"
import TopSection from "../TopSection"
import { IoIosCloseCircle } from "react-icons/io"
import SearchableDropdown from "./SearchableDropdown"
import { useEffect, useState } from "react"
import { BankList } from "../../utils/BankList"

type RinPer8TambahRekType = {
    namaRekening: string
    namaBank: string
    noRek: string
    namaRekening2: string
    namaBank2: string
    noRek2: string
    addRekening: boolean
    setAddRekening: React.Dispatch<React.SetStateAction<boolean>>
}

type UpdateFormProps = RinPer8TambahRekType & {
    updateData: (field: Partial<RinPer8TambahRekType>) => void
}

type AddRekeningProp = Partial<RinPer8TambahRekType> & {
    onClick?: (e: any) => void
    updateData: (field: Partial<RinPer8TambahRekType>) => void
}

const RinPer8TambahRekPage = ({
    namaRekening,
    namaBank,
    noRek,
    namaRekening2,
    namaBank2,
    noRek2,
    updateData,
    addRekening,
    setAddRekening
}: UpdateFormProps & Partial<JoinPageType>) => {

    const addingRekening = (e: any) => {
        e.preventDefault()
        setAddRekening(!addRekening)
    }
    const [value, setValue] = useState(namaBank)
    useEffect(() => {
        updateData({ namaBank: value })
    }, [value])
    
    return (
        <>
            <TopSection
                title="Tambah Rekening"
                tagline="Masukkan rekening kamu untuk menerima hadiah uang cashless dari tamu yang kamu undang."
            />
            <div className='form_container'>
                {addRekening && <div className="title">
                    <h1 className="reception_title">Pemilik rekening ke-1</h1>
                </div>}
                <input
                    placeholder="Nama pemilik rekening "
                    type="text"
                    value={namaRekening}
                    onChange={e => updateData({ namaRekening: e.target.value })}
                />
                <SearchableDropdown
                    options={BankList}
                    label="name"
                    id="id"
                    selectedVal={value}
                    handleChange={(val: any) => setValue(val)}
                />
                <input
                    placeholder="Masukkan no. rekening"
                    type="text"
                    value={noRek}
                    onChange={e => updateData({ noRek: e.target.value })}
                />
                {!addRekening && <a href="/" onClick={addingRekening}>Tambah rekening</a>}
                {
                    addRekening
                    &&
                    <AddRekening
                        onClick={addingRekening}
                        namaRekening2={namaRekening2}
                        namaBank2={namaBank2}
                        noRek2={noRek2}
                        updateData={updateData}
                    />
                }
            </div>
        </>
    )
}

const AddRekening = ({
    onClick,
    namaRekening2,
    namaBank2,
    noRek2,
    updateData
}: AddRekeningProp) => {

    const [value, setValue] = useState(namaBank2)
    useEffect(() => {
        updateData({ namaBank2: value })
    }, [value])

    return (
        <>
            <div className="title">
                <h1 className="reception_title">Pemilik rekening ke-2</h1>
                <button className="close_reception_btn" onClick={onClick}> <IoIosCloseCircle color="#474747" size={20} /></button>
            </div>
            <input
                placeholder="Nama pemilik rekening "
                type="text"
                value={namaRekening2}
                onChange={e => updateData({ namaRekening2: e.target.value })}
            />
            <SearchableDropdown
                options={BankList}
                label="name"
                id="id"
                selectedVal={value}
                handleChange={(val: any) => setValue(val)}
            />
            <input
                placeholder="Masukkan no. rekening"
                type="text"
                value={noRek2}
                onChange={e => updateData({ noRek2: e.target.value })}
            />
        </>
    )
}

export default RinPer8TambahRekPage