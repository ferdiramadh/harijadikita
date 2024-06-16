
type BottomMenuType = {
    getChanged: boolean
    saveDraft: () => void

}

function BottomMenu({ getChanged, saveDraft }: BottomMenuType) {

    return (
        <div className='bottomFixContainer'>
            <div className="bottomWrapper">
                <button className="draftBtn" onClick={saveDraft} disabled={!getChanged}>
                    Simpan draft
                </button>
                <button className="shareBtn" onClick={() => alert("Fitur belum tersedia.")}>
                    Publikasikan
                </button>
            </div>
        </div>
    )
}

export default BottomMenu