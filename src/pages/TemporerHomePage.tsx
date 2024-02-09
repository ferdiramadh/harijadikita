import { FormDataType, UserAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { DocumentData, addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"

const TemporerHomePage = () => {
  const { logOut, userAcc, user, setUserAcc } = UserAuth()
  const [userData, setUserData] = useState<FormDataType | DocumentData>()
  const handleLogout = async () => {
    try {
      await logOut()
      setUserAcc({})
    } catch (error) {
      alert(error)
    }
  }

  const getUserData = async () => {

    try {
      console.log('cari user data ' + user.uid)
      const q = query(collection(db, "userdata"), where("user", "==", user.uid))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        console.log(data)
        setUserData(data)

      })

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
      <div>
        <h3>Welcome, {userAcc?.displayName}</h3>
        {user ? <button onClick={handleLogout}>Logout</button> : null}
      </div>
    </div>
  )
}

export default TemporerHomePage