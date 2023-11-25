type ProgressCountProp = {
  count: number
}

const RinPerProgress = ({count} : ProgressCountProp) => {

  const percentage = count/11 * 100 

  return (
    <div className='rinperprogress'>
        <div className='progress_wrapper'>
            <div className="progress_bar">
                <div className="progress_percentage" style={{ width: `${percentage}%`}}/>
            </div>
            <h1 className='progress_text' >{count} dari 11 langkah</h1>
        </div>
    </div>
  )
}

export default RinPerProgress