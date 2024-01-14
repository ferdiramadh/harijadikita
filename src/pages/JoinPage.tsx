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
  
  const PageList = [
  <RinPer1NamaUndanganPage />,
  <RinPer2NamaPengantinPage />,
  <RinPer3UsernameInstagramPage />,
  <RinPer4KeluargaPengantinPriaPage />,
  <RinPer5KeluargaPengantinWanitaPage />,
  <RinPer6TanggalWaktuPage />,
  <RinPer7LokasiPage />,
  <RinPer8TambahRekPage />,
  <RinPer9JumlahTamuPage />,
  <RinPer10TahuDariManaPage />,
]
  const { step, steps, currentStepIndex, next, back, isFirstStep } = UseMultiStepForm(PageList)
  return (
    <section className='template'>
      <form>
        {step}
        <div className='form_container'>
          <RinPerButtonSection next={next} back={back} />
          <RinPerProgress count={currentStepIndex + 1} steps={steps}/>
        </div>
      </form>
    </section>
  )
}

export default JoinPage