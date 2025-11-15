import ItemContainer from "../rincian_desain_edit/ItemContainer"
import { useMemo, useState, useEffect } from "react"
import { LuSearch, LuListFilter } from "react-icons/lu"
import { FiDownloadCloud } from "react-icons/fi"
import { CountPart } from "./CountPart"
import TemplateWhatsapp from "./TemplateWhatsapp"
import UploadGambarBerkasSection from "./UploadGambarBerkasSection"
import GuestTable from "./GuestTable"

const KirimUndangan = () => {
    const [breakout, setBreakout] = useState(false)

    useEffect(() => {
        const onResize = () => setBreakout(window.innerWidth > 720)
        onResize()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <ItemContainer isRsvp={true}>
            <CountPart count={350} text="Sudah dibaca" textColor="hijau" />
            <CountPart count={100} text="Centang dua" textColor="biru" />
            <CountPart count={20} text="Centang satu" />
            <TemplateWhatsapp />
            <UploadGambarBerkasSection section="gambar" formatFile="JPG, JPEG, PNG, ukuran berkas tidak lebih dari 10MB"/>
            <UploadGambarBerkasSection section="berkas" formatFile="XLS, XLSX, CSV, ukuran berkas tidak lebih dari 10MB"/>
            <GuestTable />
        </ItemContainer>
    )
}

export default KirimUndangan