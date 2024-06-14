import { UserAuth } from "../context/AuthContext"
import { JoinPageType } from "../pages/JoinPage"
import { useNavigate } from "react-router-dom"
import { addDocWithId } from "../database/Functions"
import { RINCIAN_PERNIKAHAN } from "../database/Collections"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"
import { setRincianPernikahan } from "../redux/state/rinper/rinperSlice"

const RinPerButtonSection = ({ next, back, isLastStep, isFirstStep }: Partial<JoinPageType>) => {
  const { data, setData, INITIAL_DATA, userAcc } = UserAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const storingData = async () => {
    const result = await addDocWithId(RINCIAN_PERNIKAHAN, data, userAcc?.uid)
    dispatch(setRincianPernikahan(result))
    setData(INITIAL_DATA)
    navigate('/home')
  }

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