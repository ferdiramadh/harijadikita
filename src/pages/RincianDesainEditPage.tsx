import { useEffect, useState } from 'react'
import TopFixMenu from '../components/rincian_desain_edit/TopFixMenu'
import RincianPernikahan from '../components/rincian_desain_edit/RincianPernikahan'
import DesainUndangan from '../components/rincian_desain_edit/DesainUndangan'
import BottomMenu from '../components/rincian_desain_edit/BottomMenu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { UserAuth } from '../context/AuthContext'
import { updateDataCollection } from '../database/Functions'
import { RINCIAN_PERNIKAHAN } from '../database/Collections'
import { FormDataType, updateRincianPernikahan } from '../redux/state/rinper/rinperSlice'
import LoadingOverlay from 'react-loading-overlay-ts'
import { DesainUndanganAuth } from '../context/DesainUndanganContext'

function RincianDesainEditPage() {

    const { saveDesainUndangan } = DesainUndanganAuth()
    const { user } = UserAuth()
    const [isRincianPernikahan, setIsRincianPernikahan] = useState(true)
    const { data, id } = useSelector((state: RootState) => state.rinper)
    const [editData, setEditData] = useState<FormDataType>({
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
    })
    // Im not sure how to check if the data has changed - will check again later
    // const [getChanged, setGetChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    function updateData(field: Partial<FormDataType>) {
        setEditData(prev => {
            return { ...prev, ...field }
        })
    }
    const dispatch = useDispatch<AppDispatch>()

    const saveDraft = async () => {

        try {
            setLoading(true)
            const result = await updateDataCollection(RINCIAN_PERNIKAHAN, editData, id)
            if (result == undefined) {
                dispatch(updateRincianPernikahan(editData))
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


    function arraysEqual(a1: any, a2: any) {
        /* WARNING: arrays must not contain {objects} or behavior may be undefined */
        return JSON.stringify(a1) == JSON.stringify(a2);
    }
    const publish = () => {
        alert("Fitur belum tersedia.")
    }

    const onSubmit = () => {

        if (isRincianPernikahan) {
            saveDraft()
        } else {
            saveDesainUndangan(user?.uid, setLoading)
        }
    }
    useEffect(() => {
        setEditData(data)
        // setEdiDesainUndangantData(dataDesainUndangan)
    }, [])

    // Im not sure how to check if the data has changed - will check again later
    // useEffect(() => {
    //     if (arraysEqual(data, editData)) {
    //         setGetChanged(false)
    //     } else {
    //         setGetChanged(true)
    //     }
    // }, [editData])

    return (

        <div className='editRinDesPage'>
            <TopFixMenu isActiveToggle={isRincianPernikahan} setToggle={setIsRincianPernikahan} />
            {isRincianPernikahan ?
                <LoadingOverlay
                    active={loading}
                    spinner
                    text='Menyimpan data rincian pernikahan...'
                >
                    <RincianPernikahan editData={editData} updateData={updateData} />
                </LoadingOverlay>
                :
                <LoadingOverlay
                    active={loading}
                    spinner
                    text='Menyimpan data desain pernikahan...'
                >
                    <DesainUndangan />
                </LoadingOverlay>
            }
            <BottomMenu saveDraft={onSubmit} publish={publish} />
        </div>

    )
}

export default RincianDesainEditPage