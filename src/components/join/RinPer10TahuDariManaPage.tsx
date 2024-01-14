import TopSection from "../TopSection"

const RinPer10TahuDariManaPage = () => {
    return (
        <>
            <TopSection title="Tahu harijadikita dari mana?" />
            <div className='form_container'>
                <div className="custom-select selected">
                    <select>
                        <option className="select-items">Instagram</option>
                        <option className="select-items">Facebook</option>
                        <option className="select-items">Twitter</option>
                        <option className="select-items">Blog</option>
                        <option className="select-items">Pasangan</option>
                        <option className="select-items">Teman</option>
                        <option className="select-items">Keluarga</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default RinPer10TahuDariManaPage