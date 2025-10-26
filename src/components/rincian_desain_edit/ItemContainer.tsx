
import React, { useEffect, useRef, useState } from "react"

type ItemContainerType = {
    children: React.ReactNode
    isRsvp?: boolean
}
const ItemContainer = ({ children ,isRsvp}: ItemContainerType) => {

    const containerRef = useRef(null)
    const [height, setHeight] = useState(0)
    const parentClassName = isRsvp ? "item-container" : "item-container margin-top"
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
        <div
            ref={containerRef}
            style={{
                resize: "vertical",
                overflow: "auto",
                padding: "1rem",
                paddingBottom: height > 500 ? "10vh" : "50vh",
            }}>
            <div className={parentClassName}>
                {children}
            </div>
        </div>
    )
}

export default ItemContainer