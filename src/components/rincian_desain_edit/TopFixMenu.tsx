import React from 'react'

function TopFixMenu() {
  return (
    <div className='fixContainer'>
        <div className="upperSection">

        </div>
        <div className="lowerSection">
            <button className="rinPerBtn" onClick={() => console.log("woy")}>
                Rincian pernikahan
            </button>
            <button className="designBtn">
                Desain undangan
            </button>
        </div>
    </div>
  )
}

export default TopFixMenu