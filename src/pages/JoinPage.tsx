import React, { ReactElement } from 'react'
import RinPer1NamaUndanganPage from '../components/join/RinPer1NamaUndanganPage'
import RinPer2NamaPengantinPage from '../components/join/RinPer2NamaPengantinPage'
import { UseMultiStepForm } from '../hooks/Join/UseMultiStepForm'
import RinPerButtonSection from '../components/RinPerButtonSection'
import RinPer3UsernameInstagramPage from '../components/join/RinPer3UsernameInstagramPage'
import RinPer4KeluargaPengantinPriaPage from '../components/join/RinPer4KeluargaPengantinPriaPage'
import RinPer5KeluargaPengantinWanitaPage from '../components/join/RinPer5KeluargaPengantinWanitaPage'
import RinPer6TanggalWaktuPage from '../components/join/RinPer6TanggalWaktuPage'
import RinPer7LokasiPage from '../components/join/RinPer7LokasiPage'
import RinPer8TambahRekPage from '../components/join/RinPer8TambahRekPage'
import RinPer9JumlahTamuPage from '../components/join/RinPer9JumlahTamuPage'
import RinPer10TahuDariManaPage from '../components/join/RinPer10TahuDariManaPage'
import RinPerProgress from '../components/RinPerProgress'

export type ButtonType = {
  next(): void
  back(): void
}

export type JoinPageType = ButtonType & {
  currentStepIndex: number
  steps: ReactElement[]
  isLastStep: boolean
  isFirstStep: boolean
}
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

const JoinPage = () => {

  const { step, steps, currentStepIndex, next, back, isFirstStep, isLastStep } = UseMultiStepForm(PageList)

  return (
    <section className='template'>
      <form>
        {step}
        <div className='form_container'>
          <RinPerButtonSection next={next} back={back} isFirstStep={isFirstStep} isLastStep={isLastStep} />
          <RinPerProgress count={currentStepIndex + 1} steps={steps} />
        </div>
      </form>
    </section>
  )
}

export default JoinPage