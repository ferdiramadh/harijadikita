
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
    console.log(height)
    return (
        <div  ref={containerRef}
        style={{
            backgroundColor: "yellow",
            resize: "vertical",
            overflow: "auto",
            padding: "1rem",
            border: "1px solid gray",
            boxSizing: "border-box",
        }}>
            <div className='item-container'
               
            >
                {children}
               
            </div>
            <div style={{ height: '20px', backgroundColor: 'black' }} /> {/* buffer space at bottom */}
        </div>
    )
}

export default ItemContainer