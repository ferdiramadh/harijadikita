import TopSection from "../components/TopSection"
import { useState } from "react"

const RinPer7LokasiPage = () => {

    const [addReception, setAddReception] = useState<boolean>(false)
    const addingReception = (e: any) => {
        e.preventDefault()
        setAddReception(!addReception)
    }
    const locAd = `*Lokasi terhubung dengan Google Maps, jika lokasi tidak ditemukan, kamu bisa masukkan lintang dan bujur:`
    return (
        <>
            <TopSection title="Lokasi Pernikahan" tagline="Masukkan lokasi akad dan resepsi pernikahan kamu." locAd={locAd} />
            {
                !addReception && <AddReception />
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

const AddReception = () => {

    return (
        <div className='form_container'>
            <div className="title">
                <h1 className="reception_title">Akad</h1>
            </div>
            <input placeholder="Cari lokasi akad" type="text" />
            <div className="title">
                <h1 className="reception_title">Resepsi</h1>
            </div>
            <input placeholder="Cari lokasi resepsi ke-1" type="text" />
            <input placeholder="Cari lokasi resepsi ke-2" type="text" />
        </div>
    )
}

export default RinPer7LokasiPage