import Logo from "./Logo"

type TopSectionProps = {
    title: string
    tagline: string
}

const TopSection = ({ title, tagline }: TopSectionProps) => {
    return (
        <div className="top-sec-wrapper">
            <Logo />
            <h1 className="top-title">{title}</h1>
            <div className='tagline'>
                <p>{tagline}</p>
            </div>
        </div>
    )
}

export default TopSection