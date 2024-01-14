import { JoinPageType } from "../pages/JoinPage"


const RinPerButtonSection = ({ next, back }: Partial<JoinPageType>) => {

  return (
    <div className='rinperbutton_container'>
        <button type='button' className='next_btn' onClick={next}>Berikutnya</button>
        <button type='button' className='draft_btn' onClick={back}>Sebelumnya</button>
    </div>
  )
}

export default RinPerButtonSection