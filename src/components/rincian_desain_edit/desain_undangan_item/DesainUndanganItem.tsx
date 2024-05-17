
import { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io"

type ItemType = {
    title: string
    children: React.ReactNode
}

const DesainUndanganItem = ({ title, children }: ItemType) => {
    const [toggle, setToggle] = useState(false)
    const [checked, setChecked] = useState(false)
    const styleArrow = {
        transform: toggle ? 'rotate(90deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleContent = toggle ? {
        maxHeight: 1000,
        transition: 'max-height 0.5s ease-in',
    } : {
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 0.15s ease-out',
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
                    <input type="checkbox" onChange={e => setChecked(!checked)} checked={checked}/>
                        <span className="slider round"></span>
                </label>
                <div className="btn-arrow-wrapper">
                    <button className='btn-arrow' onClick={onPress} style={styleArrow}>
                        <IoIosArrowForward size={20} color='#667085' />
                    </button>
                </div>
            </div>
            <div className="content" style={styleContent}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default DesainUndanganItem