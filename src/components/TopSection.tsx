import Logo from "./Logo"

type TopSectionProps = {
    title: string
    tagline: string
    locAd?: string
}

const TopSection = ({ title, tagline, locAd }: TopSectionProps) => {
    return (
        <div className="top-sec-wrapper">
            <Logo />
            <h1 className="top-title">{title}</h1>
            <div className='tagline'>
                <p>{tagline}</p>
                {locAd && <p className="loc-ad">{locAd} <a href="."><span>lihat caranya</span></a></p>}
            </div>
        </div>
    )
}

export default TopSection