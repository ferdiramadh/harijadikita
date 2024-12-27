import { createSlice } from "@reduxjs/toolkit"

export interface UserCredential {
    uid: string
    displayName: string
    email: string
    emailVerified: boolean
}

const initialState: UserCredential = {
    uid: "",
    displayName: "", 
    email: "",
    emailVerified: false
}

const userCredentialSlice = createSlice({
    name: "rinper",
    initialState,
    reducers: {
        setUserCredential: (state, action) => {
            return {
                ...state,
                uid: action.payload.uid,
                displayName: action.payload.displayname,
                email: action.payload.email
            }
        },
    }
})

export const { setUserCredential } = userCredentialSlice.actions

export default userCredentialSlice.reducer