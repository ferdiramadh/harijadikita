import ItemContainer from "../rincian_desain_edit/ItemContainer"
import { useMemo, useState, useEffect } from "react"
import { LuSearch, LuListFilter } from "react-icons/lu"
import { FiDownloadCloud } from "react-icons/fi"
import { CountPart } from "./CountPart"
import TemplateWhatsapp from "./TemplateWhatsapp"
import UploadGambarBerkasSection from "./UploadGambarBerkasSection"

const KirimUndangan = () => {
    const [breakout, setBreakout] = useState(false)

    useEffect(() => {
        const onResize = () => setBreakout(window.innerWidth > 720)
        onResize()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const dummyData = useMemo(() => {
        const names = ["Ayu", "Budi", "Citra", "Dedi", "Eka", "Fajar", "Gita", "Hadi", "Intan", "Joko", "Kiki", "Lina", "Mega", "Nanda", "Oki", "Putu", "Rina", "Sari", "Tomi", "Uli", "Vina", "Wawan", "Xena", "Yuda", "Zara"]
        const messages = [
            "Selamat ya!",
            "Mohon maaf tidak bisa hadir",
            "Insya Allah hadir",
            "Sukses selalu",
            "Doa terbaik untuk kalian",
            "Akan konfirmasi kemudian",
            "Hadir dengan keluarga",
            "Terima kasih undangannya"
        ]
        return Array.from({ length: 50 }).map((_, i) => {
            const name = names[i % names.length] + (i % 5 === 0 ? ` ${i}` : "")
            const daysAgo = Math.floor(Math.random() * 30)
            const createdDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - Math.floor(Math.random() * 86400000)).toISOString()
            const message = messages[Math.floor(Math.random() * messages.length)]
            const present = Math.random() > 0.2 // ~80% hadir
            return { id: i + 1, name, createdDate, message, present }
        })
    }, [])

    const formatDate = (iso?: string) => {
        if (!iso) return "-"
        const d = new Date(iso)
        return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <ItemContainer isRsvp={true}>
            <CountPart count={350} text="Sudah dibaca" textColor="hijau" />
            <CountPart count={100} text="Centang dua" textColor="biru" />
            <CountPart count={20} text="Centang satu" />
            <TemplateWhatsapp />
            <UploadGambarBerkasSection section="gambar" formatFile="JPG, JPEG, PNG, ukuran berkas tidak lebih dari 10MB"/>
            <UploadGambarBerkasSection section="berkas" formatFile="XLS, XLSX, CSV, ukuran berkas tidak lebih dari 10MB"/>
        </ItemContainer>
    )
}

export default KirimUndangan