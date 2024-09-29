import { createSlice } from "@reduxjs/toolkit"

export interface UserData {
    id: string
    data: FormDataType
    createdAt: string
    latestUpdate: string
}

export type FormDataType = {
    pengantinPriaLengkap: string
    pengantinPria: string
    pengantinWanitaLengkap: string
    pengantinWanita: string
    instaPengantinPria: string
    instaPengantinWanita: string
    ayahWaliPria: string
    ibuWaliPria: string
    anakKeBerapaPria: string
    jmlSaudaraPria: string
    ayahWaliWanita: string
    ibuWaliWanita: string
    anakKeBerapaWanita: string
    jmlSaudaraWanita: string
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
        pengantinPriaLengkap: "",
        pengantinPria: "",
        pengantinWanitaLengkap: "",
        pengantinWanita: "",
        instaPengantinPria: "",
        instaPengantinWanita: "",
        ayahWaliPria: "",
        ibuWaliPria: "",
        anakKeBerapaPria: "",
        jmlSaudaraPria: "",
        ayahWaliWanita: "",
        ibuWaliWanita: "",
        anakKeBerapaWanita: "",
        jmlSaudaraWanita: "",
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
        setRincianPernikahan: (state, action) => {
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

export const { updateRincianPernikahan, setRincianPernikahan } = rinperSlice.actions

export default rinperSlice.reducer