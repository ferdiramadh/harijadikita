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
    isGunakanTema: boolean
}
export type PengantinType = FormDesainUndanganType & {
    gambarPengantinPria: string | ArrayBuffer | null | undefined
    gambarPengantinWanita: string | ArrayBuffer | null | undefined
    isNoImage: boolean
}
export type AyatSuciKalimatMutiaraType = FormDesainUndanganType & {
    isAyatSuci: boolean
    agama: string
    ayatSuci: string
    kalimatMutiara: string
}

export type VideoType = FormDesainUndanganType & {
    videoUrl: string
}

export type MusicType = FormDesainUndanganType & {
    ourMusicSelection: boolean
    spotifyMusicSelection: boolean
    userMusicSelection: boolean
    spotifyUrl: string
    chosenSong: number
}

export type ItemValueType = SampulType | PengantinType | AyatSuciKalimatMutiaraType | VideoType | MusicType

export const INITIAL_EDIT_DESAIN_DATA = [

    {
        itemId: 1,
        isActive: false,
        sectionName: "Sampul",
        teksTombol: "",
        gambarBackground: "",
        isGunakanTema: false
    },
    {
        itemId: 2,
        isActive: false,
        sectionName: "Pengantin",
        gambarPengantinPria: "",
        gambarPengantinWanita: "",
        isNoImage: true
    },
    {
        itemId: 3,
        isActive: false,
        sectionName: "AyatSuciKalimatMutiara",
        isAyatSuci: false,
        agama: "Islam",
        ayatSuci: "",
        kalimatMutiara: ""

    },
    {
        itemId: 4,
        isActive: false,
        sectionName: "VideoItem",
        videoUrl: ""
    },
    {
        itemId: 5,
        isActive: false,
        sectionName: "MusikItem",
        ourMusicSelection: true,
        spotifyMusicSelection: false,
        userMusicSelection: false,
        spotifyUrl: "",
        chosenSong: 0
    }
]

const initialState: UserDataDesainUndangan = {
    id: "",
    data: INITIAL_EDIT_DESAIN_DATA,
    createdAt: "",
    latestUpdate: ""
}

const desainUndanganSlice = createSlice({
    name: "desainUndangan",
    initialState,
    reducers: {
        setDesainUndangan: (state, action) => {
            return action.payload
        },
        initiateDesainUndangan: () => {
            return initialState
        },
        resetDesainUndangan: () => {
            return {
                id: "",
                data: [],
                createdAt: "",
                latestUpdate: ""
            }
        },
    }
})

export const { setDesainUndangan, initiateDesainUndangan, resetDesainUndangan } = desainUndanganSlice.actions

export default desainUndanganSlice.reducer