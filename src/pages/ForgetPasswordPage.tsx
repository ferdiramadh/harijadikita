import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase"
import { useEffect, useState } from "react"
import { FirebaseError } from "firebase/app"

const ForgetPasswordPage = () => {

  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState(false)

  const onChangeHandler = (event: any) => {
    setEmail(event.target.value)

  }
  const handleResetPassword = async (e: any) => {
    e.preventDefault()

    try {
      const result = await sendPasswordResetEmail(auth, email)
      if (result == null)
        setNotification(true)

    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.code)
      }
    }
  }
  useEffect(() => {
    setNotification(false)
  }, [email])
  return (
    <div style={{ padding: 20}}>
      <h2 style={{ marginBottom: 20}}>Lupa Password</h2>
      <input placeholder="Email" type="text" name='email' onChange={onChangeHandler} style={{ marginRight: 20}}/>
      <button type="submit" id="submitBtn" className="submitBtn" onClick={(e) => handleResetPassword(e)}>
        Reset Password
      </button>
      {notification && <h3 style={{ marginTop: 20, color: 'red' }}>Reset Password Telah Dikirim ke email {email}</h3>}
    </div>
  )
}

export default ForgetPasswordPage