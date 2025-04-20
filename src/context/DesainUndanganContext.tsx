import { useContext, createContext, useState, useEffect } from "react"
import { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { addDocWithId, updateDataCollection } from "../database/Functions"
import { AyatSuciKalimatMutiaraType, GaleriType, MusicType, PengantinType, SampulType, setDesainUndangan, VideoType } from "../redux/state/desainundangan/desainUndanganSlice"
import { DESAIN_UNDANGAN } from "../database/Collections"

interface ChildrenProps {
    children?: ReactNode
}

type DesainUndanganContextType = {
    saveDesainUndangan: (userId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
    sampulItemData: Partial<SampulType>
    setSampulItemData: React.Dispatch<React.SetStateAction<Partial<SampulType>>>
    pengantinItemData: Partial<PengantinType>
    setPengantinItemData: React.Dispatch<React.SetStateAction<Partial<PengantinType>>>
    ayatSuciKataMutiaraItemData: Partial<AyatSuciKalimatMutiaraType>
    setAyatSuciKataMutiaraItemData: React.Dispatch<React.SetStateAction<Partial<AyatSuciKalimatMutiaraType>>>
    videoItemData: Partial<VideoType>
    setVideoItemData: React.Dispatch<React.SetStateAction<Partial<VideoType>>>
    musikItemData: Partial<MusicType>
    setMusikItemData: React.Dispatch<React.SetStateAction<Partial<MusicType>>>
    galeriItemData: Partial<GaleriType>
    setGaleriItemData: React.Dispatch<React.SetStateAction<Partial<GaleriType>>>
}

const DesainUndanganContext = createContext<DesainUndanganContextType>({} as DesainUndanganContextType)

export const DesainUndanganContextProvider = ({ children }: ChildrenProps) => {

    const { id, data } = useSelector((state: RootState) => state.desainUndangan)
    const [sampulItemData, setSampulItemData] = useState<Partial<SampulType>>({})
    const [pengantinItemData, setPengantinItemData] = useState<Partial<PengantinType>>({})
    const [ayatSuciKataMutiaraItemData, setAyatSuciKataMutiaraItemData] = useState<Partial<AyatSuciKalimatMutiaraType>>({})
    const [videoItemData, setVideoItemData] = useState<Partial<VideoType>>({})
    const [musikItemData, setMusikItemData] = useState<Partial<MusicType>>({})
    const [galeriItemData, setGaleriItemData] = useState<Partial<GaleriType>>({})
    const dispatch = useDispatch<AppDispatch>()
    const allData = [sampulItemData, pengantinItemData, ayatSuciKataMutiaraItemData, videoItemData, musikItemData, galeriItemData]
    const saveDesainUndangan = async (userId: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            setLoading(true)
            const result = id ? await updateDataCollection(DESAIN_UNDANGAN, allData, id) : await addDocWithId(DESAIN_UNDANGAN, allData, userId)
            if (result !== null) {
                dispatch(setDesainUndangan(result))
                alert("Data telah dipebaharui.")
                setLoading(false)
            } else {
                alert("Maaf, data anda gagal tersimpan")
                setLoading(false)
            }


        } catch (error) {
            setLoading(false)
        }

    }

    useEffect(() => {

        const sampulData = data[0]
        const pengantinData = data[1]
        const ayatKataMutiaraData = data[2]
        const videoData = data[3]
        const musikData = data[4]
        const galeriData = data[5]

        setSampulItemData(sampulData)
        setPengantinItemData(pengantinData)
        setAyatSuciKataMutiaraItemData(ayatKataMutiaraData)
        setVideoItemData(videoData)
        setMusikItemData(musikData)
        setGaleriItemData(galeriData)

    }, [data])

    return (
        <DesainUndanganContext.Provider value={{
            saveDesainUndangan,
            sampulItemData,
            setSampulItemData,
            pengantinItemData,
            setPengantinItemData,
            ayatSuciKataMutiaraItemData,
            setAyatSuciKataMutiaraItemData,
            videoItemData,
            setVideoItemData,
            musikItemData,
            setMusikItemData,
            galeriItemData,
            setGaleriItemData
        }}>
            {children}
        </DesainUndanganContext.Provider>
    )
}

export const DesainUndanganAuth = () => {
    return useContext(DesainUndanganContext)
}