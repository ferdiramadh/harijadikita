import { FormDataType } from "../../../redux/state/rinper/rinperSlice"
import RincianPernikahanItem from "./RincianPernikahanItem"

type UpdateDataType = {
    editData: FormDataType
    updateData(field: Partial<FormDataType>): void

}

type GenderType = UpdateDataType & {
    gender: string
}

const KeluargaPengantinItem = ({ editData, updateData }: UpdateDataType) => {
    return (
        <RincianPernikahanItem
            title="Keluarga pengantin"
            children={<Content editData={editData} updateData={updateData} />}
        />
    )
}

const Content = ({ editData, updateData }: UpdateDataType) => {
    return (
        <div className="content_wrapper">
            <FamilyColumn gender="pria" editData={editData} updateData={updateData} />
            <FamilyColumn gender="wanita" editData={editData} updateData={updateData} />
        </div>
    )
}

const FamilyColumn = ({ gender, editData, updateData }: GenderType) => {
    const isPria = gender == "pria"
    const ayahValue = isPria ? editData.ayahWaliPria : editData.ayahWaliWanita
    const ibuValue = isPria ? editData.ibuWaliPria : editData.ibuWaliWanita
    const anakKe = isPria ? setToZero(editData.anakKeBerapaPria) : setToZero(editData.anakKeBerapaWanita)
    const jmlSaudara = isPria ? setToZero(editData.jmlSaudaraPria) : setToZero(editData.jmlSaudaraWanita)
    const setParent = (e: React.ChangeEvent<HTMLInputElement>, isFather: boolean) => {
        if (isPria) {
            if (isFather) {
                updateData({ ayahWaliPria: e.target.value })
            } else {
                updateData({ ibuWaliPria: e.target.value })
            }
        } else {
            if (isFather) {
                updateData({ ayahWaliWanita: e.target.value })
            } else {
                updateData({ ibuWaliWanita: e.target.value })
            }
        }
    }
    const setAnakKe = (e: React.ChangeEvent<HTMLInputElement>, isAnakKe: boolean) => {
        if (isAnakKe) {
            handleChange(e, false)
        } else {
            handleChange(e, true)
        }
    }
    function setToZero(field: number) {
        if (isNaN(field)) return 0
        return field
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>, isJumlah: boolean) {
        if (isPria) {
            if (isJumlah) {
                updateData({ jmlSaudaraPria: parseInt(e.target.value) })
            } else {
                updateData({ anakKeBerapaPria: parseInt(e.target.value) })
            }
        } else {
            if (isJumlah) {
                updateData({ jmlSaudaraWanita: parseInt(e.target.value) })
            } else {
                updateData({ anakKeBerapaWanita: parseInt(e.target.value) })
            }
        }

    }
    return (
        <>
            <label className="label_input_bold">Pengantin {gender}</label>
            <input type="text" placeholder="Nama ayah/wali" value={ayahValue} onChange={e => setParent(e, true)} />
            <input type="text" placeholder="Nama ibu/wali" value={ibuValue} onChange={e => setParent(e, false)} />
            <input type="text" placeholder={`Pengantin ${gender} anak ke berapa`} value={anakKe} onChange={e => setAnakKe(e, true)} />
            <label className="ex_label_family">Contoh: pertama</label>
            <input type="text" placeholder={`Jumlah saudara pengantin ${gender}`} value={jmlSaudara} onChange={e => setAnakKe(e, false)} />
            <label className="ex_label_family">Contoh: dua</label>
        </>
    )
}

export default KeluargaPengantinItem