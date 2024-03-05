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

export type FormDataType = {
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
    user: string
}


export const AuthContextProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<any>({})
    const [userAcc, setUserAcc] = useState<UserCollectionProps | DocumentData>(INITIAL_USER)
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
        namaBank: "Pilih Bank...",
        noRek: "",
        namaRekening2: "",
        namaBank2: "Pilih Bank...",
        noRek2: "",
        jmlTamu: 0,
        tahuDariMana: "",
        user: ''
    }
    const [isFinishJoin, setIsFinishJoin] = useState<boolean>(false)
    const [data, setData] = useState(INITIAL_DATA)
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
    }
    const logOut = () => {
        signOut(auth)
    }

    const getData = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid))

            const querySnapshot = await getDocs(q)
            const docLength = querySnapshot.docs.length
            if (docLength == 1) {
                console.log('cari cuy')
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    setUserAcc(data)

                })
            } else if (docLength == 0) {
                console.log('nambah nih')
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
            console.log(err)
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
            console.log("isFinishJoin " + isFinishJoin)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (user != null) {
            getData()
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, facebookSignIn, userAcc, setUserAcc, setIsFinishJoin, data, setData, INITIAL_DATA }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}