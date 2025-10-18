type ToggleType = {
    isActiveToggle: boolean
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

function TopSectionTamuUndangan({ isActiveToggle, setToggle }: ToggleType) {
    return (
        <>
            <div className='tamu_undangan'>
                <h1>Tamu Undangan</h1>
            </div>
            <div className="option">
                <div className={`option_item ${isActiveToggle && "active"}`} onClick={() => setToggle(true)}>
                    <h3>RSVP dan ucapan</h3>
                </div>
                <div className={`option_item ${!isActiveToggle && "active"}`} onClick={() => setToggle(false)}>
                    <h3>Kirim undangan</h3>
                </div>
            </div>
        </>

    )
}

export default TopSectionTamuUndangan