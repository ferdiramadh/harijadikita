import types from './types'
import { Auth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Dispatch } from 'react'

export interface UserProps {
    DisplayName: string
    Email: string
    UID: string
    EmailVerified: boolean
}

const initialUserState: UserProps = {
    DisplayName: 'Test',
    Email: '',
    UID: '',
    EmailVerified: false
}
type Action = {
    type: string
    payload?: any
}
export const action = {
    registeringMember: (auth: Auth, email: string, name: string, password: string) => async (dispatch: Dispatch<any>) => {
        await dispatch({ type: types.REGISTER, payload: { email, password } })
        const result = await createUserWithEmailAndPassword(auth, email, password)
        dispatch({
            type: types.SET_USER,
            payload: { result, name }
        })
    }
}

export const UserReducer = (state = initialUserState, action: Action) => {
    const { type, payload } = action
    switch (type) {
        case types.REGISTER: {
            const { email, name, password } = payload
            return {
                ...state
            }
        }
        case types.SET_USER: {
            const { result, name } = payload
            const { displayName, email, uid, emailVerified } = result
            return {
                DisplayName: name || displayName,
                Email: email,
                UID: uid,
                EmailVerified: emailVerified

            }
        }
        default: return { ...state }
    }
}