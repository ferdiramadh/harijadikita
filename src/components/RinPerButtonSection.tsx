type ButtonType = {
  next(): void
  back(): void
}

const RinPerButtonSection = ({ next, back }: ButtonType) => {
  return (
    <div className='rinperbutton_container'>
        <button type='button' className='next_btn' onClick={next}>Berikutnya</button>
        <button type='button' className='draft_btn' onClick={back}>Sebelumnya</button>
    </div>
  )
}

export default RinPerButtonSection