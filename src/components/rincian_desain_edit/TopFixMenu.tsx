type ToggleType = {
  isActiveToggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

function TopFixMenu({ isActiveToggle, setToggle }: ToggleType) {
  return (
    <div className='fixContainer'>
      <div className="lowerSection">
        <button className={`rinPerBtn ${isActiveToggle && "active"}`} onClick={() => setToggle(true)}>
          Rincian pernikahan
        </button>
        <button className={`designBtn  ${!isActiveToggle && "active"}`} onClick={() => setToggle(false)}>
          Desain undangan
        </button>
      </div>
    </div>
  )
}

export default TopFixMenu