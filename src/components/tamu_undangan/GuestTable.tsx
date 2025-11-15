import React from "react"
import { LuSearch, LuListFilter } from "react-icons/lu"
import { TbTrash } from "react-icons/tb"
import { FiDownloadCloud } from "react-icons/fi"
import { IoMdSend } from "react-icons/io"
import { guests } from "../../database/DummyGuest"

const GuestTable: React.FC = () => {
    return (
        <div className="guest-table-container">
            {/* inner scroll region containing toolbar + table */}
            <div className="scroll-inner">
                <div className="toolbar">
                    <h2 className="toolbar-title">Tabel tamu untuk WhatsApp Broadcast</h2>
                    <div className="toolbar-actions">
                        <button><LuSearch size={16} /> Cari</button>
                        <button><LuListFilter size={16} /> Penyaringan</button>
                        <button><TbTrash size={16} /> Hapus</button>
                        <button><FiDownloadCloud size={16} /> Unduh</button>
                        <button className="send-all"><IoMdSend size={16} /> Kirim masal</button>
                    </div>
                </div>

                <table className="guest-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nomor</th>
                            <th>Nama</th>
                            <th>No. HP</th>
                            <th>Pesan</th>
                            <th>Tanggal kirim pesan</th>
                            <th>Status</th>
                            <th>Tautan</th>
                            <th>Kirim personal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map((guest, idx) => (
                            <tr key={idx}>
                                <td><input type="checkbox" /></td>
                                <td>{guest.nomor}</td>
                                <td>{guest.nama}</td>
                                <td>{guest.hp}</td>
                                <td>{guest.pesan}</td>
                                <td>{guest.tanggal}</td>
                                <td>{guest.status}</td>
                                <td><a href={guest.tautan}>Link</a></td>
                                <td>
                                    <button className="send-btn"><IoMdSend size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GuestTable
