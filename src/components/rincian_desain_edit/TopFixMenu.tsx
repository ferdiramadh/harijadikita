type ToggleType = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

function TopFixMenu({ setToggle }: ToggleType) {
  return (
    <div className='fixContainer'>
      {/* <div className="upperSection">
      </div> */}
      <div className="lowerSection">
        <button className="rinPerBtn" onClick={() => setToggle(true)}>
          Rincian pernikahan
        </button>
        <button className="designBtn" onClick={() => setToggle(false)}>
          Desain undangan
        </button>
      </div>
    </div>
  )
}

export default TopFixMenu