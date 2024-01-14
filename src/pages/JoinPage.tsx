import React, { ReactElement } from 'react'
import RinPer1NamaUndanganPage from './RinPer1NamaUndanganPage'
import RinPer2NamaPengantinPage from './RinPer2NamaPengantinPage'
import { UseMultiStepForm } from '../hooks/Join/UseMultiStepForm'
import RinPerButtonSection from '../components/RinPerButtonSection'
import RinPer3UsernameInstagramPage from './RinPer3UsernameInstagramPage'
import RinPer4KeluargaPengantinPriaPage from './RinPer4KeluargaPengantinPriaPage'
import RinPer5KeluargaPengantinWanitaPage from './RinPer5KeluargaPengantinWanitaPage'
import RinPer6TanggalWaktuPage from './RinPer6TanggalWaktuPage'
import RinPer7LokasiPage from './RinPer7LokasiPage'
import RinPer8TambahRekPage from './RinPer8TambahRekPage'
import RinPer9JumlahTamuPage from './RinPer9JumlahTamuPage'
import RinPer10TahuDariManaPage from './RinPer10TahuDariManaPage'
import RinPerProgress from '../components/RinPerProgress'
export type ButtonType = {
  next(): void
  back(): void
}

export type JoinPageType = ButtonType & {
  currentStepIndex: number
  steps: ReactElement[]
}
const JoinPage = () => {
  const { step, steps, currentStepIndex, next, back, isFirstStep } = UseMultiStepForm([

    <RinPer1NamaUndanganPage next={() => next()} back={() => back()} />,
    <RinPer2NamaPengantinPage next={() => next()} back={() => back()} />,
    // <RinPer3UsernameInstagramPage next={() => next()} back={() => back()} />,
    // <RinPer4KeluargaPengantinPriaPage next={() => next()} back={() => back()} />,
    // <RinPer5KeluargaPengantinWanitaPage next={() => next()} back={() => back()} />,
    // <RinPer6TanggalWaktuPage next={() => next()} back={() => back()} />,
    // <RinPer7LokasiPage next={() => next()} back={() => back()} />,
    // <RinPer8TambahRekPage next={() => next()} back={() => back()} />,
    // <RinPer9JumlahTamuPage next={() => next()} back={() => back()} />,
    // <RinPer10TahuDariManaPage next={() => next()} back={() => back()} />,

  ])
  return (
    <section className='template'>
      <form>
        {/* <div>
          {currentStepIndex + 1}/{steps.length}
        </div> */}
        {step}
        <RinPerButtonSection next={next} back={back} />
        <RinPerProgress count={currentStepIndex} />
      </form>
    </section>
  )
}

export default JoinPage