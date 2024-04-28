import { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io"

const RincianPernikahan = () => {
  return (
    <div style={{ width: '100%' }}>
      <RincianPernikahanItem />
      <RincianPernikahanItem />
    </div>
  )
}

const RincianPernikahanItem = () => {
  const [toggle, setToggle] = useState(false)
  const styleArrow = {
    transform: toggle ? 'rotate(90deg)' : '',
    transition: 'transform 150ms ease', // smooth transition
  }
  const styleContent = toggle ? {
    maxHeight: 500,
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
          <h3>Nama Undangan</h3>
        </div>
        <div className="btn-arrow-wrapper">
          <button className='btn-arrow' onClick={onPress} style={styleArrow}>
            <IoIosArrowForward size={20} color='#667085' />
          </button>
        </div>
      </div>
      <div className="content" style={styleContent}>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora dolorum omnis nisi dolor. Ratione, ipsam dicta libero, optio blanditiis fugit pariatur, perspiciatis amet esse dolore praesentium exercitationem asperiores illo quia.
        </div>
      </div>
    </div>
  )
}

export default RincianPernikahan