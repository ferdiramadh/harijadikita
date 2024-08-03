import { useEffect, useState } from 'react'
import TopFixMenu from '../components/rincian_desain_edit/TopFixMenu'
import RincianPernikahan from '../components/rincian_desain_edit/RincianPernikahan'
import DesainUndangan from '../components/rincian_desain_edit/DesainUndangan'
import BottomMenu from '../components/rincian_desain_edit/BottomMenu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { UserAuth } from '../context/AuthContext'
import { getDataCollection, updateDataCollection } from '../database/Functions'
import { RINCIAN_PERNIKAHAN } from '../database/Collections'
import { FormDataType, setRincianPernikahan } from '../redux/state/rinper/rinperSlice'
import LoadingOverlay from 'react-loading-overlay-ts';

function RincianDesainEditPage() {

    const [isRincianPernikahan, setIsRincianPernikahan] = useState(true)
    const { data, id } = useSelector((state: RootState) => state.rinper)
    const [editData, setEditData] = useState<FormDataType>(data)
    const [getChanged, setGetChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = UserAuth()
    function updateData(field: Partial<FormDataType>) {
        setEditData(prev => {
            return { ...prev, ...field }
        })
    }
    const dispatch = useDispatch<AppDispatch>()
    const getUserData = async () => {
        try {
            const rinperData = await getDataCollection(RINCIAN_PERNIKAHAN, user.uid)
            dispatch(setRincianPernikahan(rinperData))

        } catch (err) {
            console.log(err)
        }
    }

    const saveDraft = async () => {
        try {
            setLoading(true)
            const result = await updateDataCollection(RINCIAN_PERNIKAHAN, editData, id)
            if (result == undefined) {
                dispatch(setRincianPernikahan(editData))
                alert("Data telah dipebaharui.")
            } else {
                alert("Maaf, data anda gagal tersimpan")
            }

            setLoading(false)
        } catch (error) {

        }

    }


    useEffect(() => {
        if (user) {
            getUserData()
        }

    }, [user])

    useEffect(() => {
        if (data == editData) {
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
            {isRincianPernikahan ? <LoadingOverlay
                active={loading}
                spinner
                text='Menyimpan data...'
            ><RincianPernikahan editData={editData} updateData={updateData} /> </LoadingOverlay> :
                <DesainUndangan />
            }
            <BottomMenu getChanged={getChanged} saveDraft={saveDraft} />
        </div>

    )
}

export default RincianDesainEditPage