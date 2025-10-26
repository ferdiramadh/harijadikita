type CountPartType = {
    count: number
    text: string
    textColor?: string
}

export const CountPart = ({ count, text, textColor }: CountPartType) => {
    return (
        <div className="count-part">
            <h1>{count}</h1>
            <h2 className={textColor ? textColor : ''}>{text}</h2>
        </div>
    )
}
