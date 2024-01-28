import TopSection from "../TopSection"

type RinPer10TahuDariManaType = {
    tahuDariMana: string
}

type UpdateFormProps = RinPer10TahuDariManaType & {
    updateData: (field: Partial<RinPer10TahuDariManaType>) => void
}

const RinPer10TahuDariManaPage = ({ tahuDariMana, updateData }: UpdateFormProps) => {
    return (
        <>
            <TopSection title="Tahu harijadikita dari mana?" />
            <div className='form_container'>
                <div className="custom-select selected">
                    <select value={tahuDariMana} onChange={e => updateData({ tahuDariMana: e.target.value })}>
                        <option className="select-items">Instagram</option>
                        <option className="select-items">Facebook</option>
                        <option className="select-items">Twitter</option>
                        <option className="select-items">Blog</option>
                        <option className="select-items">Pasangan</option>
                        <option className="select-items">Teman</option>
                        <option className="select-items">Keluarga</option>
                    </select>
                </div>
            </div >
        </>
    )
}

export default RinPer10TahuDariManaPage