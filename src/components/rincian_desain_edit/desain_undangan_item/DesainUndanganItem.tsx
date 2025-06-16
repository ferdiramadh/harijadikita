
import { useRef, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io"

type ItemType = {
    title: string
    children: React.ReactNode
    toggleVal?: boolean
    onToggle?: () => void
}

const DesainUndanganItem = ({ title, children, toggleVal, onToggle }: ItemType) => {
    const [toggle, setToggle] = useState(false)
    const styleArrow = {
        transform: toggle ? 'rotate(90deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const onPress = () => {
        setToggle(!toggle)
    }
    return (
        <div>
            <div className='rinper-item'>
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <label className="switch">
                    <input type="checkbox" onChange={onToggle} checked={toggleVal} />
                    <span className="slider round"></span>
                </label>
                <div className="btn-arrow-wrapper">
                    <button className='btn-arrow' onClick={onPress} style={styleArrow}>
                        <IoIosArrowForward size={20} color='#667085' />
                    </button>
                </div>
            </div>
            <div
                className={`toggle-content${toggle ? " open" : ""}`}
                style={{
                    maxHeight: toggle ? `5000px` : "0px",
                }}
            >
                {children}
            </div>
        </div>
    )
}


export default DesainUndanganItem