import { createSlice } from "@reduxjs/toolkit"

interface UserData {
    id: number
    data: FormDataType
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
    id: 0,
    data: {
        namaUndangan: 'zzz',
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
        namaBank: "",
        noRek: "",
        namaRekening2: "",
        namaBank2: "",
        noRek2: "",
        jmlTamu: 0,
        tahuDariMana: "",
        user: ''
    }
}
const rinperSlice = createSlice({
    name: "rinper",
    initialState,
    reducers: {
        setState: (state, action) => {
            return action.payload
        },
        updateRincianPernikahan: (state, action) => {
            console.log()
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