
import { useRef, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io"

type ItemType = {
  title: string
  children: React.ReactNode
}

const RincianPernikahanItem = ({ title, children }: ItemType) => {
  const [toggle, setToggle] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null);

  const getHeight = () => (contentRef.current ? contentRef.current.scrollHeight : 0);
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
        <div className="btn-arrow-wrapper">
          <button className='btn-arrow' onClick={onPress} style={styleArrow}>
            <IoIosArrowForward size={20} color='#667085' />
          </button>
        </div>
      </div>
      <div
        ref={contentRef}
        className={`toggle-content${toggle ? " open" : ""}`}
        style={{
          maxHeight: toggle ? `${getHeight()}px` : "0px",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default RincianPernikahanItem