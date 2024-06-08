import TopSection from "../TopSection"
import { updateRincianPernikahan } from "../../redux/state/rinper/rinperSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const RinPer10TahuDariManaPage = () => {
    const { tahuDariMana } = useSelector((state: RootState) => state.rinper.data)
    return (
        <>
            <TopSection title="Tahu harijadikita dari mana?"  />
            <div className='form_container'>
                <div className="custom-select selected">
                    <select value={tahuDariMana} onChange={e => updateRincianPernikahan({ tahuDariMana: e.target.value })}>
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