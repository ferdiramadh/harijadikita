import { JoinPageType } from "../../pages/JoinPage"
import TopSection from "../TopSection"

type RinPer9JumlahTamuType = {
    jmlTamu: number
}

type UpdateFormProps = RinPer9JumlahTamuType & {
    updateData: (field: Partial<RinPer9JumlahTamuType>) => void
}

const RinPer9JumlahTamuPage = ({ jmlTamu, updateData, storingData }: UpdateFormProps & Partial<JoinPageType>) => {
    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    return (
        <>
            <TopSection title="Jumlah Tamu" tagline="Masukkan estimasi jumlah tamu yang akan diundang." storingData={storingData} />
            <div className='form_container'>
                <input placeholder="Jumlah tamu yang diundang" type="number" value={setToZero(jmlTamu)} onChange={e => updateData({ jmlTamu: parseInt(e.target.value) })} />
            </div>
        </>
    )
}

export default RinPer9JumlahTamuPage