import TopSection from "../TopSection"

type RinPer2NamaPengantinType = {
    pengantinPria: string
    pengantinWanita: string
}

type UpdateFormProps = RinPer2NamaPengantinType & {
    updateData: (field: Partial<RinPer2NamaPengantinType>) => void
}

const RinPer2NamaPengantinPage = ({ pengantinPria, pengantinWanita, updateData }: UpdateFormProps) => {
    return (
        <>
            <TopSection title="Nama Pengantin" tagline="Masukkan nama kamu dan pasangan." />
            <div className='form_container'>
                <input placeholder="Pengantin pria" type="text" value={pengantinPria} onChange={e => updateData({ pengantinPria: e.target.value })} />
                <input placeholder="Pengantin wanita" type="text" value={pengantinWanita} onChange={e => updateData({ pengantinWanita: e.target.value })} />
            </div>
        </>
    )
}

export default RinPer2NamaPengantinPage