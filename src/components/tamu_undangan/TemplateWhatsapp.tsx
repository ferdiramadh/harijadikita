import React from 'react'

function TemplateWhatsapp() {
    const [value, setValue] = React.useState(`Dear {{Nama}},

Kamu diundang ke acara pernikahan Kami! Kamu bisa melakukan RSVP dan berikan ucapan dan doa kepada Kami juga pada undangan nikah digital Kami pada:
https://namapengantin.harijadikita.com

Ini adalah pesan otomatis yang dikirim dari penyedia undangan nikah digital harijadikita.com`)
    return (
        <div className='whatsapp-template'>
            <h1>Template WhatsApp Broadcast</h1>
            <textarea id="w3review"
                name="w3review"
                rows={10}
                cols={50}
                className='large_input_area'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Dear {{Nama}},...'
            />
            <button className="save-template-btn" onClick={() => alert('Template WhatsApp Broadcast disimpan!')}>
                Simpan
            </button>
        </div>
    )
}

export default TemplateWhatsapp