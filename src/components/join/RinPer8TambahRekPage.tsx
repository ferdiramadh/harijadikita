import TopSection from "../TopSection"
import { IoIosCloseCircle } from "react-icons/io"
import SearchableDropdown from "./SearchableDropdown"
import { useEffect, useState } from "react"
import { BankList } from "../../utils/BankList"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"

type RinPer8TambahRekType = {
    addRekening: boolean
    setAddRekening: React.Dispatch<React.SetStateAction<boolean>>
}
type AddRekeningProp = Partial<RinPer8TambahRekType> & {
    onClick?: (e: any) => void
}

const RinPer8TambahRekPage = ({
    addRekening,
    setAddRekening
}: RinPer8TambahRekType) => {

    const { namaRekening, namaBank, noRek } = useSelector((state: RootState) => state.rinper.data)
    const dispatch = useDispatch<AppDispatch>()
    const addingRekening = (e: any) => {
        e.preventDefault()
        setAddRekening(!addRekening)
    }
    const [value, setValue] = useState(namaBank)
    useEffect(() => {
        dispatch(updateRincianPernikahan({ namaBank: value }))
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
                    onChange={e => dispatch(updateRincianPernikahan({ namaRekening: e.target.value }))}
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
                    onChange={e => dispatch(updateRincianPernikahan({ noRek: e.target.value }))}
                />
                {!addRekening && <a href="/" onClick={addingRekening}>Tambah rekening</a>}
                {
                    addRekening
                    &&
                    <AddRekening
                        onClick={addingRekening}
                    />
                }
            </div>
        </>
    )
}

const AddRekening = ({
    onClick
}: AddRekeningProp) => {
    const { namaRekening2, namaBank2, noRek2 } = useSelector((state: RootState) => state.rinper.data)
    const dispatch = useDispatch<AppDispatch>()
    const [value, setValue] = useState(namaBank2)
    useEffect(() => {
        dispatch(updateRincianPernikahan({ namaBank2: value }))
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
                onChange={e => dispatch(updateRincianPernikahan({ namaRekening2: e.target.value }))}
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
                onChange={e => dispatch(updateRincianPernikahan({ noRek2: e.target.value }))}
            />
        </>
    )
}

export default RinPer8TambahRekPage