import { JoinPageType } from "../../pages/JoinPage"
import TopSection from "../TopSection"

type RinPer5KeluargaPengantinWanitaType = {
    ayahWaliWanita: string
    ibuWaliWanita: string
    anakKeBerapaWanita: number
    jmlSaudaraWanita: number
}

type UpdateFormProps = RinPer5KeluargaPengantinWanitaType & {
    updateData: (field: Partial<RinPer5KeluargaPengantinWanitaType>) => void
}

const RinPer5KeluargaPengantinWanitaPage = ({ ayahWaliWanita, ibuWaliWanita, anakKeBerapaWanita, jmlSaudaraWanita, updateData, storingData }: UpdateFormProps & Partial<JoinPageType>) => {

    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }

    return (
        <>
            <TopSection title="Keluarga Pengantin Wanita" tagline="Masukkan profil keluarga pengantin wanita." storingData={storingData} />
            <div className='form_container'>
                <input placeholder="Nama ayah/wali" type="text" value={ayahWaliWanita} onChange={e => updateData({ ayahWaliWanita: e.target.value })} />
                <input placeholder="Nama ibu/wali" type="text" value={ibuWaliWanita} onChange={e => updateData({ ibuWaliWanita: e.target.value })} />
                <label>Pengantin wanita anak ke berapa</label>
                <input placeholder="Pengantin wanita anak ke berapa" type="number" value={setToZero(anakKeBerapaWanita)} onChange={e => updateData({ anakKeBerapaWanita: parseInt(e.target.value) })} />
                <label>Jumlah saudara pengantin wanita</label>
                <input placeholder="Jumlah saudara pengantin wanita" type="number" value={setToZero(jmlSaudaraWanita)} onChange={e => updateData({ jmlSaudaraWanita: parseInt(e.target.value) })} />
            </div>
        </>
    )
}

export default RinPer5KeluargaPengantinWanitaPage