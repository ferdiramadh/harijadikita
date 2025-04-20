import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useEffect, useState } from "react"

const VerifyMePage = () => {
    const navigate = useNavigate()
    const { userAcc, setUserAcc } = UserAuth()

    const verifyMe = () => {
        // setUserAcc(prev => ({...prev, email_verified: true}))
    }
    const [isVerified, setIsVerified] = useState(false)
    useEffect(() => {
        if (userAcc?.email_verified) {
            // setIsVerified(true)
            navigate('/home')
        }
    }, [userAcc])
    return (
        <div style={{ flexDirection: 'column', padding: 50 }}>
            <h1>Verifikasi Akun Saya</h1>
            <button style={{ padding: 10, marginTop: 15 }} onClick={() => setUserAcc(prev => ({ ...prev, email_verified: true }))}>Verifikasi Email Saya</button>
        </div>
    )
}

export default VerifyMePage