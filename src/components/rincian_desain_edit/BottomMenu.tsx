
type BottomMenuType = {
    saveDraft: () => void
    publish: () => void
}

function BottomMenu({ saveDraft, publish }: BottomMenuType) {

    return (
        <div className='bottomFixContainer'>
            <div className="bottomWrapper">
                <button className="draftBtn" onClick={saveDraft} >
                    Simpan
                </button>
                <button className="shareBtn" onClick={publish}>
                    Publikasikan
                </button>
            </div>
        </div>
    )
}

export default BottomMenu