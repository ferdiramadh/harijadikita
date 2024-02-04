import { JoinPageType } from "../../pages/JoinPage"
import TopSection from "../TopSection"

type RinPer1NamaUndanganType = {
    namaUndangan: string
}

type UpdateFormProps = RinPer1NamaUndanganType & {
    updateData: (field: RinPer1NamaUndanganType) => void
}

const RinPer1NamaUndanganPage = ({ namaUndangan, updateData, storingData }: UpdateFormProps & Partial<JoinPageType>) => {
    return (
        <>
            <TopSection title="Nama undangan" tagline="Masukkan nama undangan yang akan ditampilkan di beberapa bagian fitur undangan." storingData={storingData}/>
            <div className='form_container'>
                <input placeholder="Nama undangan" type="text" value={namaUndangan} onChange={e => updateData({ namaUndangan: e.target.value })} />
                <p className="example_text">contoh: Herlambang dan Nia wedding</p>
            </div>
        </>
    )
}

export default RinPer1NamaUndanganPage