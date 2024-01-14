import { JoinPageType } from "../pages/JoinPage"


const RinPerButtonSection = ({ next, back, isLastStep, isFirstStep }: Partial<JoinPageType>) => {

  return (
    <div className='rinperbutton_container'>
      <button type='button' className='next_btn' onClick={next}>Berikutnya</button>
      {
        !isFirstStep ? <button type='button' className='draft_btn' onClick={back}>{!isLastStep ? "Sebelumnya" : "Selesai"}</button> : null
      }

    </div>
  )
}

export default RinPerButtonSection