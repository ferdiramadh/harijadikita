import React, { ReactElement, useState } from 'react'
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

type FormDataType = {
  namaUndangan: string
  pengantinPria: string
  pengantinWanita: string
  instaPengantinPria: string
  instaPengantinWanita: string
  ayahWaliPria: string
  ibuWaliPria: string
  anakKeBerapaPria: number
  jmlSaudaraPria: number
  ayahWaliWanita: string
  ibuWaliWanita: string
  anakKeBerapaWanita: number
  jmlSaudaraWanita: number
  tglAkad: string
  wktAkad: string
  tglResepsi: string
  wktResepsi: string
  lokasiAkad: string
  lokasiResepsi: string
  namaRekening: string
  namaBank: string
  noRek: string
  namaRekening2: string
  namaBank2: string
  noRek2: string
  jmlTamu: number
  tahuDariMana: string
}

const INITIAL_DATA: FormDataType = {
  namaUndangan: '',
  pengantinPria: '',
  pengantinWanita: "",
  instaPengantinPria: "",
  instaPengantinWanita: "",
  ayahWaliPria: "",
  ibuWaliPria: "",
  anakKeBerapaPria: 0,
  jmlSaudaraPria: 0,
  ayahWaliWanita: "",
  ibuWaliWanita: "",
  anakKeBerapaWanita: 0,
  jmlSaudaraWanita: 0,
  tglAkad: "",
  wktAkad: "",
  tglResepsi: "",
  wktResepsi: "",
  lokasiAkad: "",
  lokasiResepsi: "",
  namaRekening: "",
  namaBank: "",
  noRek: "",
  namaRekening2: "",
  namaBank2: "",
  noRek2: "",
  jmlTamu: 0,
  tahuDariMana: "",
}
const JoinPage = () => {

  const [data, setData] = useState(INITIAL_DATA)
  const [addReception, setAddReception] = useState<boolean>(false)
  const [addRekening, setAddRekening] = useState<boolean>(false)

  function updateData(field: Partial<FormDataType>) {
    console.log(field)
    setData(prev => {
      return { ...prev, ...field }
    })
  }

  const { step, steps, currentStepIndex, next, back, isFirstStep, isLastStep } = UseMultiStepForm([
    <RinPer1NamaUndanganPage {...data} updateData={updateData} />,
    <RinPer2NamaPengantinPage {...data} updateData={updateData} />,
    <RinPer3UsernameInstagramPage {...data} updateData={updateData} />,
    <RinPer4KeluargaPengantinPriaPage {...data} updateData={updateData} />,
    <RinPer5KeluargaPengantinWanitaPage {...data} updateData={updateData} />,
    <RinPer6TanggalWaktuPage {...data} updateData={updateData} addReception={addReception} setAddReception={setAddReception} />,
    <RinPer7LokasiPage {...data} updateData={updateData} />,
    <RinPer8TambahRekPage {...data} updateData={updateData} addRekening={addRekening} setAddRekening={setAddRekening} />,
    <RinPer9JumlahTamuPage {...data} updateData={updateData}/>,
    <RinPer10TahuDariManaPage {...data} updateData={updateData}/>,
  ])

  return (
    <section className='template'>
      <form>
        {step}
        <div className='form_container'>
          <RinPerButtonSection next={next} back={back} isFirstStep={isFirstStep} isLastStep={isLastStep} />
          <RinPerProgress count={currentStepIndex + 1} steps={steps} />
          {/* <button type='button' onClick={() => console.log(data)}>Test</button> */}
        </div>
      </form>
    </section>
  )
}

export default JoinPage