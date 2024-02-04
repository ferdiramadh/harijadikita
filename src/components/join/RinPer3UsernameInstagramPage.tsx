import { JoinPageType } from "../../pages/JoinPage"
import TopSection from "../TopSection"

type RinPer3UsernameInstagramType = {
    instaPengantinPria: string
    instaPengantinWanita: string
}

type UpdateFormProps = RinPer3UsernameInstagramType & {
    updateData: (field: Partial<RinPer3UsernameInstagramType>) => void
}

const RinPer3UsernameInstagramPage = ({ instaPengantinPria, instaPengantinWanita, updateData, storingData }: UpdateFormProps & Partial<JoinPageType>) => {
    return (
        <>
            <TopSection title="Username Instagram" tagline="Masukkan username Instagram pengantin untuk ditampilkan di undangan, kosongkan jika pengantin tidak memiliki akun instagram." storingData={storingData} />
            <div className='form_container'>
                <input placeholder="Instagram pengantin pria" type="text" value={instaPengantinPria} onChange={e => updateData({ instaPengantinPria: e.target.value })} />
                <input placeholder="Instagram pengantin wanita" type="text" value={instaPengantinWanita} onChange={e => updateData({ instaPengantinWanita: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer3UsernameInstagramPage