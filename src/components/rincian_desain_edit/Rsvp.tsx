import ItemContainer from "./ItemContainer"
import { useMemo, useState, useEffect } from "react"
import { LuSearch, LuListFilter } from "react-icons/lu"
import { FiDownloadCloud } from "react-icons/fi";
const Rsvp = () => {
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
            <div className="attendance-count">
                <h1>250</h1>
                <h2 className="hadir">Hadir</h2>
            </div>
            <div className="attendance-count">
                <h1>50</h1>
                <h2>Tidak Hadir</h2>
            </div>

            <div className={`table ${breakout ? 'breakout' : ''}`}>
                <div className="table-toolbar" role="row">
                    <div className="left">
                        <h4>Tabel kehadiran tamu</h4>
                    </div>
                    <div className="right">
                        <div className="search">
                            <LuSearch />
                            <input type="text" placeholder="Cari nama tamu..." />
                        </div>
                        <div className="filter">
                            <LuListFilter />
                            <div className="col date">Penyaringan</div>
                        </div>
                        <div className="download">
                            <FiDownloadCloud />
                            <div className="col message">Unduh</div>
                        </div>

                    </div>
                </div>
                <div className="table-head" role="row">
                    <div className="col name">Nama</div>
                    <div className="col date">Confirmation Date</div>
                    <div className="col message">Message</div>
                    <div className="col status">Presence Confirmation</div>
                </div>
                <div className="table-body">
                    {dummyData.map(row => (
                        <div className="table-row" key={row.id} role="row">
                            <div className="cell name" data-label="Nama">{row.name}</div>
                            <div className="cell date" data-label="Confirmation Date">{formatDate(row.createdDate)}</div>
                            <div className="cell message" data-label="Message">{row.message}</div>
                            <div className={`cell status ${row.present ? 'present' : 'absent'}`} data-label="Presence Confirmation">
                                {row.present ? 'Hadir' : 'Tidak Hadir'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ItemContainer>
    )
}

export default Rsvp