import { JoinPageType } from "../pages/JoinPage"

const RinPerButtonSection = ({ next, back, isLastStep, isFirstStep, storingData }: Partial<JoinPageType>) => {

  return (
    <div className='rinperbutton_container'>
      <button type='button' className='next_btn' onClick={isLastStep ? storingData : next}>{isLastStep ? "Selesai" : "Berikutnya"}</button>
      {
        !isFirstStep ? <button type='button' className='draft_btn' onClick={back}>Sebelumnya</button> : null
      }

    </div>
  )
}

export default RinPerButtonSection