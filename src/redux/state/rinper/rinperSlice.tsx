import { createSlice } from "@reduxjs/toolkit"

interface UserData {
    id: string
    data: FormDataType
    createdAt: string
    latestUpdate: string
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
const initialState: UserData = {
    id: "",
    data: {
        namaUndangan: "",
        pengantinPria: "",
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
        namaBank: "",
        noRek: "",
        namaRekening2: "",
        namaBank2: "",
        noRek2: "",
        jmlTamu: 0,
        tahuDariMana: "",
        user: ""
    },
    createdAt: "",
    latestUpdate: ""
}
const rinperSlice = createSlice({
    name: "rinper",
    initialState,
    reducers: {
        setState: (state, action) => {
            console.log(action)
            return action.payload
        },
        updateRincianPernikahan: (state, action) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        }
    }
})

export const { updateRincianPernikahan } = rinperSlice.actions

export default rinperSlice.reducer