import TopSection from "../TopSection"
import { IoIosCloseCircle } from "react-icons/io"
import SearchableDropdown from "./SearchableDropdown"
import { useEffect, useState } from "react"
import { BankList } from "../../utils/BankList"
import { UserAuth } from "../../context/AuthContext"
import { FormDataType } from "../../redux/state/rinper/rinperSlice"

type RinPer8TambahRekType = {
    addRekening: boolean
    setAddRekening: React.Dispatch<React.SetStateAction<boolean>>
}
type AddRekeningProp = Partial<RinPer8TambahRekType> & {
    onClick?: (e: any) => void
    updateData(field: Partial<FormDataType>): void
    namaRekening2: string
    namaBank2: string
    noRek2: string
}

const RinPer8TambahRekPage = ({
    addRekening,
    setAddRekening
}: RinPer8TambahRekType) => {

    const { data, setData } = UserAuth()
    const { namaBank, namaRekening, noRek, namaRekening2, namaBank2, noRek2 } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
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
                        updateData={updateData}
                        namaRekening2={namaRekening2}
                        namaBank2={namaBank2}
                        noRek2={noRek2}
                    />
                }
            </div>
        </>
    )
}

const AddRekening = ({
    onClick, updateData, namaRekening2, namaBank2, noRek2
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