import { ReactElement } from "react"

type ProgressCountProp = {
  count: number
  steps: ReactElement[]
}

const RinPerProgress = ({count, steps} : ProgressCountProp) => {

  const percentage = count/steps.length * 100 

  return (
    <div className='rinperprogress'>
        <div className='progress_wrapper'>
            <div className="progress_bar">
                <div className="progress_percentage" style={{ width: `${percentage}%`}}/>
            </div>
            <h1 className='progress_text' >{count} dari {steps.length} langkah</h1>
        </div>
    </div>
  )
}

export default RinPerProgress