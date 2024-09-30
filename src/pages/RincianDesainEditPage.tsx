import { useEffect, useState } from 'react'
import TopFixMenu from '../components/rincian_desain_edit/TopFixMenu'
import RincianPernikahan from '../components/rincian_desain_edit/RincianPernikahan'
import DesainUndangan from '../components/rincian_desain_edit/DesainUndangan'
import BottomMenu from '../components/rincian_desain_edit/BottomMenu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { UserAuth } from '../context/AuthContext'
import { addDocWithId, getDataCollection, updateDataCollection } from '../database/Functions'
import { DESAIN_UNDANGAN, RINCIAN_PERNIKAHAN } from '../database/Collections'
import { FormDataType, setRincianPernikahan, updateRincianPernikahan } from '../redux/state/rinper/rinperSlice'
import LoadingOverlay from 'react-loading-overlay-ts'
import { AyatSuciKalimatMutiaraType, INITIAL_EDIT_DESAIN_DATA, ItemValueType, PengantinType, SampulType, setDesainUndangan } from '../redux/state/desainundangan/desainUndanganSlice'

function RincianDesainEditPage() {

    const [isRincianPernikahan, setIsRincianPernikahan] = useState(true)
    const { data, id } = useSelector((state: RootState) => state.rinper)
    const { data: dataDesainUndangan, id: idDesainUndangan } = useSelector((state: RootState) => state.desainUndangan)
    const [editData, setEditData] = useState<FormDataType>(data)
    const [editDesainUndanganData, setEdiDesainUndangantData] = useState<(Partial<SampulType> | Partial<PengantinType> | Partial<AyatSuciKalimatMutiaraType>)[]>(dataDesainUndangan)
    const [getChanged, setGetChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = UserAuth()
    function updateData(field: Partial<FormDataType>) {
        setEditData(prev => {
            return { ...prev, ...field }
        })
    }
    const dispatch = useDispatch<AppDispatch>()
    
    const GetAllData = async () => {
        try {
            const rinperData = await getDataCollection(RINCIAN_PERNIKAHAN, user.uid)
            const desainDataUndangan = await getDataCollection(DESAIN_UNDANGAN, user.uid)
            Promise.all([rinperData, desainDataUndangan]).then(([rinperval, desainval]) => {
                dispatch(setRincianPernikahan(rinperval))
                dispatch(setDesainUndangan(desainval))
              })
        } catch (error) {
            console.log(error)
        }
        
    }
    const saveDraft = async () => {

        try {
            setLoading(true)
            const result = await updateDataCollection(RINCIAN_PERNIKAHAN, editData, id)
            if (result == undefined) {
                dispatch(updateRincianPernikahan(editData))
                alert("Data telah dipebaharui.")
                setGetChanged(false)
                setLoading(false)
            } else {
                alert("Maaf, data anda gagal tersimpan")
                setLoading(false)
            }


        } catch (error) {
            setLoading(false)
        }

    }

    const saveDesainUndangan = async () => {
        try {
            setLoading(true)

            // console.log(idDesainUndangan)
            const result = idDesainUndangan ? await updateDataCollection(DESAIN_UNDANGAN, editDesainUndanganData, idDesainUndangan) : await addDocWithId(DESAIN_UNDANGAN, editDesainUndanganData, user?.uid)
            // console.log(result)
            if (result !== null) {
                dispatch(setDesainUndangan(result))
                alert("Data telah dipebaharui.")
                setGetChanged(false)
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
    const onSubmit = () => {
        
        if (isRincianPernikahan) {
            saveDraft()
        } else {
            saveDesainUndangan()
        }
    }
    useEffect(() => {
        if (user) {
            // getUserData()
            // getDesainUndanganData()
            GetAllData()
        }

    }, [user])

    useEffect(() => {
        if (arraysEqual(data, editData)) {
            setGetChanged(false)
        } else {
            setGetChanged(true)
        }
    }, [editData])

    // useEffect(() => {
    //   const items = JSON.parse(localStorage.getItem('items') || "");
    //   if (items) {
    //     console.log(items);
    //   }
    // }, []);
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
                    <DesainUndangan editDesainUndanganData={editDesainUndanganData} setEdiDesainUndangantData={setEdiDesainUndangantData} />
                </LoadingOverlay>
            }
            <BottomMenu getChanged={isRincianPernikahan ? getChanged : true} saveDraft={onSubmit} />
        </div>

    )
}

export default RincianDesainEditPage