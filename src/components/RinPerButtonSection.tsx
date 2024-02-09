import { UserAuth } from "../context/AuthContext"
import { JoinPageType } from "../pages/JoinPage"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import { useNavigate } from "react-router-dom"

const RinPerButtonSection = ({ next, back, isLastStep, isFirstStep }: Partial<JoinPageType>) => {
  const { setIsFinishJoin, data, setData, INITIAL_DATA } = UserAuth()
  const navigate = useNavigate()
  const storingData = async () => {
    try {
      setIsFinishJoin(true)
      await addDoc(collection(db, "userdata"), data)
      setData(INITIAL_DATA)
      navigate('/home')
    } catch (err) {
      console.log(err)
    }
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