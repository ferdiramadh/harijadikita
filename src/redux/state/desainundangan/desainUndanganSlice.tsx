import { createSlice } from "@reduxjs/toolkit"

export interface UserDataDesainUndangan {
    id: string
    data: object[]
    createdAt: string
    latestUpdate: string
}

export type FormDesainUndanganType = {
    itemId: number
    isActive: boolean
    sectionName: string
}

export type SampulType = FormDesainUndanganType & {
    teksTombol: string
    gambarBackground: string | ArrayBuffer | null | undefined
}
export type PengantinType = FormDesainUndanganType & {
    gambarPengantinPria: string
    gambarPengantinWanita: string
}
export type AyatSuciKalimatMutiaraType = FormDesainUndanganType & {
    isAyatSuci: boolean
    agama: string
    ayatSuci: string
    kalimatMutiara: string
}

export type ItemValueType = SampulType | PengantinType | AyatSuciKalimatMutiaraType

export const INITIAL_EDIT_DESAIN_DATA = [
    
    {
        itemId: 1,
        isActive: false,
        sectionName: "Sampul",
        teksTombol: "",
        gambarBackground: ""
    },
    {
        itemId: 2,
        isActive: false,
        sectionName: "Pengantin",
        gambarPengantinPria: "",
        gambarPengantinWanita: ""
    },
    {
        itemId: 3,
        isActive: false,
        sectionName: "AyatSuciKalimatMutiara",
        isAyatSuci: false,
        agama: "Islam",
        ayatSuci: "",
        kalimatMutiara: ""

    }
]

const initialState: UserDataDesainUndangan = {
    id: "",
    data: INITIAL_EDIT_DESAIN_DATA,
    createdAt: "",
    latestUpdate: ""
}
const desainUndanganSlice = createSlice({
    name: "rinper",
    initialState,
    reducers: {
        setDesainUndangan: (state, action) => {
            return action.payload
        }
    }
})

export const { setDesainUndangan } = desainUndanganSlice.actions

export default desainUndanganSlice.reducer