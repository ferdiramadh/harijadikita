import { useContext, createContext, useState, useEffect } from "react"
import { ReactNode } from "react"
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    FacebookAuthProvider
} from 'firebase/auth'
import { auth } from "../firebase"
import { DocumentData, addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { FormDataType, setRincianPernikahan } from "../redux/state/rinper/rinperSlice"
import { useDispatch, useSelector } from "react-redux"
import { setUserCredential } from '../redux/state/userCredential/userCredentialSlice'
import { AppDispatch, RootState } from "../redux/store"
import { addDocWithId, getDataCollection, updateDataCollection } from "../database/Functions"
import { AyatSuciKalimatMutiaraType, GaleriType, initiateDesainUndangan, MusicType, PengantinType, SampulType, setDesainUndangan, UserDataDesainUndangan, VideoType } from "../redux/state/desainundangan/desainUndanganSlice"
import { DESAIN_UNDANGAN, RINCIAN_PERNIKAHAN } from "../database/Collections"

interface ChildrenProps {
    children?: ReactNode
}
type DesainUndanganContextType = {
    sampulItemData: Partial<SampulType>
    setSampulItemData: React.Dispatch<React.SetStateAction<Partial<SampulType>>>
    saveDesainUndangan: (userId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setGetChanged: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
    pengantinItemData: Partial<PengantinType>
    setPengantinItemData: React.Dispatch<React.SetStateAction<Partial<PengantinType>>>
    ayatSuciKataMutiaraItemData: Partial<AyatSuciKalimatMutiaraType>
    setAyatSuciKataMutiaraItemData: React.Dispatch<React.SetStateAction<Partial<AyatSuciKalimatMutiaraType>>>
    videoItemData: Partial<VideoType>
    setVideoItemData: React.Dispatch<React.SetStateAction<Partial<VideoType>>>
    musikItemData: Partial<MusicType>
    setMusikItemData: React.Dispatch<React.SetStateAction<Partial<MusicType>>>
    galeriItemData: Partial<GaleriType>
    setGaleriItemData: React.Dispatch<React.SetStateAction<Partial<GaleriType>>>
}

const DesainUndanganContext = createContext<DesainUndanganContextType>({} as DesainUndanganContextType)

export const DesainUndanganContextProvider = ({ children }: ChildrenProps) => {
    const { id, data } = useSelector((state: RootState) => state.desainUndangan)
    const [sampulItemData, setSampulItemData] = useState<Partial<SampulType>>({})
    const [pengantinItemData, setPengantinItemData] = useState<Partial<PengantinType>>({})
    const [ayatSuciKataMutiaraItemData, setAyatSuciKataMutiaraItemData] = useState<Partial<AyatSuciKalimatMutiaraType>>({})
    const [videoItemData, setVideoItemData] = useState<Partial<VideoType>>({})
    const [musikItemData, setMusikItemData] = useState<Partial<MusicType>>({})
    const [galeriItemData, setGaleriItemData] = useState<Partial<GaleriType>>({})
    const dispatch = useDispatch<AppDispatch>()
    const allData = [sampulItemData, pengantinItemData, ayatSuciKataMutiaraItemData, videoItemData, musikItemData, galeriItemData]
    const saveDesainUndangan = async (userId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setGetChanged: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            setLoading(true)

            // console.log(idDesainUndangan)
            const result = id ? await updateDataCollection(DESAIN_UNDANGAN, allData, id) : await addDocWithId(DESAIN_UNDANGAN, allData, userId)
            // console.log(result)
            if (result !== null) {
                dispatch(setDesainUndangan(result))
                alert("Data telah dipebaharui.")
                setGetChanged(false)
                setLoading(false)
            } else {
                alert("Maaf, data anda gagal tersimpan")
                setLoading(false)
            }


        } catch (error) {
            setLoading(false)
        }

    }

    useEffect(() => {

        const sampulData = data[0]
        const pengantinData = data[1]
        const ayatKataMutiaraData = data[2]
        const videoData = data[3]
        const musikData = data[4]
        const galeriData = data[5]

        setSampulItemData(sampulData)
        setPengantinItemData(pengantinData)
        setAyatSuciKataMutiaraItemData(ayatKataMutiaraData)
        setVideoItemData(videoData)
        setMusikItemData(musikData)
        setGaleriItemData(galeriData)

    }, [data])

    return (
        <DesainUndanganContext.Provider value={{
            sampulItemData,
            setSampulItemData,
            saveDesainUndangan,
            pengantinItemData,
            setPengantinItemData,
            ayatSuciKataMutiaraItemData,
            setAyatSuciKataMutiaraItemData,
            videoItemData,
            setVideoItemData,
            musikItemData,
            setMusikItemData,
            galeriItemData,
            setGaleriItemData
        }}>
            {children}
        </DesainUndanganContext.Provider>
    )
}

export const DesainUndanganAuth = () => {
    return useContext(DesainUndanganContext)
}