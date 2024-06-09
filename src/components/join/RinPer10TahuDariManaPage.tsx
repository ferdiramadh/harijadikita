import TopSection from "../TopSection"
import { FormDataType, UserAuth } from "../../context/AuthContext"

const RinPer10TahuDariManaPage = () => {
    const { data, setData } = UserAuth()
    const { tahuDariMana } = data
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
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