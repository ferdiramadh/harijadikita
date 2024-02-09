import { JoinPageType } from "../../pages/JoinPage"
import TopSection from "../TopSection"
import { useState } from "react"

type RinPer7LokasiType = {
    lokasiAkad: string
    lokasiResepsi: string
}

type UpdateFormProps = RinPer7LokasiType & {
    updateData: (field: Partial<RinPer7LokasiType>) => void
}

type AddReceptionProp = Partial<RinPer7LokasiType> & {
    onClick?: (e: any) => void
    updateData: (field: Partial<RinPer7LokasiType>) => void
}

const RinPer7LokasiPage = ({ lokasiAkad, updateData, lokasiResepsi }: UpdateFormProps & Partial<JoinPageType>) => {

    const [addReception, setAddReception] = useState<boolean>(false)
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddReception(!addReception)
    }
    const locAd = `*Lokasi terhubung dengan Google Maps, jika lokasi tidak ditemukan, kamu bisa masukkan lintang dan bujur:`
    return (
        <>
            <TopSection title="Lokasi Pernikahan" tagline="Masukkan lokasi akad dan resepsi pernikahan kamu." locAd={locAd}  />
            {
                !addReception && <AddReception updateData={updateData} lokasiAkad={lokasiAkad} lokasiResepsi={lokasiResepsi} />
            }
            {
                addReception &&

                <div className='form_container'>
                    <input placeholder="Cari lokasi akad" type="text" />
                    <input placeholder="Cari lokasi resepsi" type="text" />
                </div>
            }
        </>
    )
}

const AddReception = ({ lokasiAkad, updateData, lokasiResepsi }: AddReceptionProp) => {

    return (
        <div className='form_container'>
            <div className="title">
                <h1 className="reception_title">Akad</h1>
            </div>
            <input placeholder="Cari lokasi akad" type="text" value={lokasiAkad} onChange={e => updateData({ lokasiAkad: e.target.value })} />
            <div className="title">
                <h1 className="reception_title">Resepsi</h1>
            </div>
            <input placeholder="Cari lokasi resepsi" type="text" value={lokasiResepsi} onChange={e => updateData({ lokasiResepsi: e.target.value })} />
            {/* <input placeholder="Cari lokasi resepsi ke-2" type="text" /> */}
        </div>
    )
}

export default RinPer7LokasiPage