import { Outlet, Navigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"

const PrivateHome = () => {
    const { userAcc } = UserAuth()
    const [isVerified, setIsVerified] = useState(false)
    useEffect(() => {
        if(userAcc?.email_verified) {
            console.log('verfikiasih nih')
            setIsVerified(true)
            // navigate('/home')
        }
    }, [userAcc])
    return (
        isVerified ? <Outlet /> : <Navigate to='/verification' />
    )
}

export default PrivateHome