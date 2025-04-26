
import React, { useEffect, useRef, useState } from "react"

type ItemContainerType = {
    children: React.ReactNode
}
const ItemContainer = ({ children }: ItemContainerType) => {

    const containerRef = useRef(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const element = containerRef.current
        if (!element) return

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setHeight(entry.contentRect.height)
            }
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <div  ref={containerRef}
        style={{
            resize: "vertical",
            overflow: "auto",
            padding: "1rem",
            paddingBottom: height > 500 ? "10vh" : "50vh",
        }}>
            <div className='item-container'
               
            >
                {children}
               
            </div>
        </div>
    )
}

export default ItemContainer