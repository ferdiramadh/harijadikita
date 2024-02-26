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
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column' }}>
      <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column' }}>
        <h3>Welcome, {userAcc?.displayName}</h3>
        {user ? <button onClick={handleLogout}>Logout</button> : null}
        {/* <button onClick={() => console.log(userData)}>userData</button> */}
      </div>
      {userData ? <DisplayUserData itemData={userData} /> : null}

    </div>
  )
}

const DisplayUserData = ({ itemData }: DocumentData | FormDataType | any) => {
  const {
    namaUndangan,
    pengantinPria,
    pengantinWanita,
    instaPengantinPria,
    instaPengantinWanita,
    ayahWaliPria,
    ibuWaliPria,
    anakKeBerapaPria,
    jmlSaudaraPria,
    ayahWaliWanita,
    ibuWaliWanita,
    anakKeBerapaWanita,
    jmlSaudaraWanita,
    tglAkad,
    wktAkad,
    tglResepsi,
    wktResepsi,
    lokasiAkad,
    lokasiResepsi,
    namaRekening,
    namaBank,
    noRek,
    namaRekening2,
    namaBank2,
    noRek2,
    jmlTamu,
    tahuDariMana,
    user
  } = itemData
  return (
    <div>
      <h1>Data User</h1>
      <h5>Nama Undangan: {namaUndangan}</h5>
      <h5>Pengantin Pria: {pengantinPria}</h5>
      <h5>Pengantin Wanita: {pengantinWanita}</h5>
      <h5>Instagram Pengantin Pria: {instaPengantinPria}</h5>
      <h5>Instagram Pengantin Wanita: {instaPengantinWanita}</h5>
      <h5>Ayah Wali Pria: {ayahWaliPria}</h5>
      <h5>Ibu Wali Pria: {ibuWaliPria}</h5>
      <h5>Pengantin Pria Anak Ke Berapa: {anakKeBerapaPria}</h5>
      <h5>Jumlah Saudara Pengantin Pria: {jmlSaudaraPria}</h5>
      <h5>Ayah Wali Wanita: {ayahWaliWanita}</h5>
      <h5>Ibu Wali Wanita: {ibuWaliWanita}</h5>
      <h5>Pengantin Wanita Anak Ke Berapa: {anakKeBerapaWanita}</h5>
      <h5>Jumlah Saudara Pengantin Wanita: {jmlSaudaraWanita}</h5>
      <h5>Tanggal Akad: {tglAkad}</h5>
      <h5>Waktu Akad: {wktAkad}</h5>
      <h5>Tanggal Resepsi: {tglResepsi}</h5>
      <h5>Waktu Resepsi: {wktResepsi}</h5>
      <h5>Lokasi Akad: {lokasiAkad}</h5>
      <h5>Lokasi Resepsi: {lokasiResepsi}</h5>
      <h5>Nama Rekening: {namaRekening}</h5>
      <h5>Nama Bank: {namaBank}</h5>
      <h5>Nomor Rekening: {noRek}</h5>
      <h5>Nama Rekening 2: {namaRekening2}</h5>
      <h5>Nama Bank 2: {namaBank2}</h5>
      <h5>Nomor Rekening 2: {noRek2}</h5>
      <h5>Jumlah Tamu: {jmlTamu}</h5>
      <h5>Tahu Dari Mana: {tahuDariMana}</h5>
    </div>
  )
}
export default TemporerHomePage