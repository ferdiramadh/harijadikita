import { UserAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { DocumentData, addDoc, collection, doc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { updateRincianPernikahan, setRincianPernikahan, FormDataType } from '../redux/state/rinper/rinperSlice'
import { addDocWithId, getDataCollection } from '../database/Functions'
import { RINCIAN_PERNIKAHAN } from '../database/Collections'
import { useNavigate } from 'react-router-dom'
import { initiateDesainUndangan } from '../redux/state/desainundangan/desainUndanganSlice'

const TemporerHomePage = () => {

  const navigate = useNavigate()
  const { logOut, userAcc, user, setUserAcc } = UserAuth()
  // console.log({userAcc})
  const [userData, setUserData] = useState<FormDataType | DocumentData>()
  const data = useSelector((state: RootState) => state.rinper.data)
  const dispatch = useDispatch<AppDispatch>()
  const handleLogout = async () => {
    try {
      dispatch(initiateDesainUndangan())
      await logOut()
      setUserAcc({})
    } catch (error) {
      alert(error)
    }
  }

  const getUserData = async () => {
    try {
      const rinperData = await getDataCollection(RINCIAN_PERNIKAHAN, user.uid)
      console.log({ rinperData })
      dispatch(setRincianPernikahan(rinperData))

    } catch (err) {
      console.log(err)
    }
  }
  const { uid, email} = useSelector((state: RootState) => state.user)
  useEffect(() => {
    if (data?.user == "") {
      getUserData()
    }

  }, [data])
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column' }}>
      <div style={{ display: 'flex', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, flexDirection: 'column' }}>
        <h3>Welcome, {userAcc?.displayName} { uid} {email}</h3>
        {user ? <button onClick={handleLogout}>Logout</button> : null}
        <button onClick={() => navigate("/rinciandesain")}>GO To Edit Rincian Desain </button>
      </div>
      {/* <DisplayUserData /> */}

    </div>
  )
}

const DisplayUserData = () => {
  const {
    pengantinPriaLengkap,
    pengantinWanitaLengkap,
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
  } = useSelector((state: RootState) => state.rinper.data)
  const dispatch = useDispatch<AppDispatch>()
  let collectionId = "Cars";
  let docId;
  let firestore = getFirestore();

  const [testx, setTestX] = useState({
    id: "1",
    car: {
      test: 'Benzo',
      afeafe: "efef"
    },
    createdAt: serverTimestamp()
  })
  const docRef = doc(db, 'Cars', '7ltSXKH4WCDUjezMaof6');
  async function addDocWithIdX() {
    let collectionRef = collection(firestore, collectionId)

    await addDoc(collectionRef, {}).then(res => {
      docId = res.id
      let docRefX = doc(firestore, collectionId + "/" + docId)

      setDoc(docRefX, testx)
    })

  };
  const updateData = async () => {
    try {

      console.log(docRef)
      // Update the timestamp field with the value from the server
      await updateDoc(docRef,
        {
          car: {
            test: 'Benzo',
            afeafe: "efef"
          },
        });
    } catch (error) {

    }
  }

  return (
    <div>
      {/* <button onClick={() => dispatch(updateRincianPernikahan({ namaUndangan: "bebas" }))}>Increment</button>
      <button onClick={() => addDocWithId("Bola", {Name: "Beckham", Skills: { control: 75, freeKick: 90}}, "jc7MWeFLJbM2GAlHjvZAPY0krZB3")}>testAddData</button>
      <button onClick={updateData}>updateData</button> */}
      <h1>Data User: {user}</h1>
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