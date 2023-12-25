import { useContext, createContext, useState, useEffect } from "react"
import { ReactNode } from "react"
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
    signInWithCredential,
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
    userName: string
    setUserName: React.Dispatch<React.SetStateAction<string>>
    facebookSignIn: () => void
    userAcc: DocumentData | UserCollectionProps | undefined
    setUserAcc: React.Dispatch<React.SetStateAction<DocumentData | UserCollectionProps | undefined>>
}
type UserCollectionProps = {
    email: string
    displayName: string
    uid: string
    email_verified: boolean
}
const AuthContext = createContext<UserContextType>({} as UserContextType)

export const AuthContextProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<any>({})
    const [userName, setUserName] = useState('')
    const [userAcc, setUserAcc] = useState<UserCollectionProps | DocumentData>()
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
                setUserAcc({
                    displayName: user.displayName,
                    email: user.email,
                    email_verified: user.emailVerified,
                    uid: user.uid
                })
            }

        } catch (err) {
            console.log(err)
        }
    }
    const addUser = async (email: string, name: string, uid: string, email_ver: boolean) => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                email: email,
                displayName: userName ? userName : name,
                uid: uid,
                email_verified: email_ver
            })
            console.log(docRef)
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
        <AuthContext.Provider value={{ googleSignIn, logOut, user, userName, setUserName, facebookSignIn, userAcc, setUserAcc }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}