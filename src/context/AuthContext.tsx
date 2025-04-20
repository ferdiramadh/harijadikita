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
import { useDispatch } from "react-redux"
import { setUserCredential } from '../redux/state/userCredential/userCredentialSlice'
import { AppDispatch } from "../redux/store"
import { getDataCollection } from "../database/Functions"
import { AyatSuciKalimatMutiaraType, initiateDesainUndangan, PengantinType, SampulType, setDesainUndangan } from "../redux/state/desainundangan/desainUndanganSlice"
import { DESAIN_UNDANGAN, RINCIAN_PERNIKAHAN } from "../database/Collections"

interface ChildrenProps {
    children?: ReactNode
}

type UserContextType = {
    googleSignIn: () => void
    logOut: () => void
    user: any
    facebookSignIn: () => void
    userAcc: DocumentData | UserCollectionProps | undefined
    setUserAcc: React.Dispatch<React.SetStateAction<DocumentData | UserCollectionProps>>
    setIsFinishJoin: React.Dispatch<React.SetStateAction<boolean>>
    data: FormDataType
    setData: React.Dispatch<React.SetStateAction<FormDataType>>
    INITIAL_DATA: FormDataType
    editDesainUndanganData: (Partial<SampulType> | Partial<PengantinType> | Partial<AyatSuciKalimatMutiaraType>)[]
    setEdiDesainUndangantData: React.Dispatch<React.SetStateAction<(Partial<SampulType> | Partial<PengantinType> | Partial<AyatSuciKalimatMutiaraType>)[]>>
}

type UserCollectionProps = {
    email: string
    displayName: string
    uid: string
    email_verified: boolean
    isFinishJoin: boolean
}

const AuthContext = createContext<UserContextType>({} as UserContextType)

const INITIAL_USER: UserCollectionProps = {
    email: "",
    displayName: "",
    uid: "",
    email_verified: false,
    isFinishJoin: false
}

export const AuthContextProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<any>(null)
    const [userAcc, setUserAcc] = useState<UserCollectionProps | DocumentData>(INITIAL_USER)
    const INITIAL_DATA: FormDataType = {
        pengantinPriaLengkap: "",
        pengantinPria: "",
        pengantinWanitaLengkap: "",
        pengantinWanita: "",
        instaPengantinPria: "",
        instaPengantinWanita: "",
        ayahWaliPria: "",
        ibuWaliPria: "",
        anakKeBerapaPria: "",
        jmlSaudaraPria: "",
        ayahWaliWanita: "",
        ibuWaliWanita: "",
        anakKeBerapaWanita: "",
        jmlSaudaraWanita: "",
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
        user: ''
    }
    const [isFinishJoin, setIsFinishJoin] = useState<boolean>(false)
    const [data, setData] = useState(INITIAL_DATA)
    const dispatch = useDispatch<AppDispatch>()
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
    }
    const logOut = () => {
        setUser(null)
        signOut(auth)
        localStorage.clear()
    }

    const getData = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid))

            const querySnapshot = await getDocs(q)
            const docLength = querySnapshot.docs.length
            if (docLength == 1) {
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    setUserAcc(data)

                })
            } else if (docLength == 0) {
                addUser(user.email, user.displayName, user.uid, user.emailVerified)
                setUserAcc(prev => ({
                    ...prev,
                    displayName: userAcc?.displayName ? userAcc?.displayName : user.displayName,
                    email: user.email,
                    email_verified: userAcc?.email_verified ? userAcc?.email_verified : user.emailVerified,
                    uid: user.uid,
                    isFinishJoin: user.isFinishJoin
                }))
            }

        } catch (err) {
            alert(err)
        }
    }

    const addUser = async (email: string, name: string, uid: string, email_ver: boolean) => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                email: email,
                displayName: userAcc?.displayName ? userAcc?.displayName : name,
                uid: uid,
                email_verified: userAcc?.email_verified ? userAcc?.email_verified : email_ver,
                isFinishJoin: isFinishJoin
            })
        } catch (err) {
            alert(err)
        }
    }
    const GetRinperDesainData = async () => {
        try {
            const result = await Promise.all([
                getDataCollection(RINCIAN_PERNIKAHAN, user.uid),
                getDataCollection(DESAIN_UNDANGAN, user.uid)
            ])
            return result
        } catch (error) {
            alert(error)
        }

    }
    const [editDesainUndanganData, setEdiDesainUndangantData] = useState<(Partial<SampulType> | Partial<PengantinType> | Partial<AyatSuciKalimatMutiaraType>)[]>([])
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(setUserCredential(currentUser))
                setUser(currentUser)
                localStorage.setItem('currentUser', JSON.stringify(currentUser))
            }

        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (user) {
            const getRinperDesainData = async () => {
                const test = await GetRinperDesainData()
                if (test?.[0]) {
                    dispatch(setRincianPernikahan(test?.[0]))
                }
                if (!test?.[1]) {
                    dispatch(initiateDesainUndangan())
                }
                if (test?.[1]) {
                    dispatch(setDesainUndangan(test?.[1]))
                }
            }
            getData()
            getRinperDesainData()
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, facebookSignIn, userAcc, setUserAcc, setIsFinishJoin, data, setData, INITIAL_DATA, editDesainUndanganData, setEdiDesainUndangantData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}