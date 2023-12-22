import { useContext, createContext, useState, useEffect } from "react"
import { ReactNode } from "react"
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
    signInWithCredential
} from 'firebase/auth'
import { auth } from "../firebase"

interface ChildrenProps {
    children?: ReactNode
}
type UserContextType = {
    googleSignIn: () => void
    logOut: () => void
    user: any
    userName: string
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext<UserContextType>({} as UserContextType)

export const AuthContextProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<any>({})
    const [userName, setUserName] = useState('')
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    const logOut = () => {
        signOut(auth)
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
    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, userName, setUserName }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}