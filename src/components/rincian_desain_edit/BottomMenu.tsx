
type BottomMenuType = {
    getChanged: boolean
    saveDraft: () => void
    publish: () => void
}

function BottomMenu({ getChanged, saveDraft, publish }: BottomMenuType) {

    return (
        <div className='bottomFixContainer'>
            <div className="bottomWrapper">
                <button className="draftBtn" onClick={saveDraft} disabled={!getChanged}>
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