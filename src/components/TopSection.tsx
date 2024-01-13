import Logo from "./Logo"
import LogoJoinSkip from "./LogoJoinSkip"

type TopSectionProps = {
    title: string
    tagline?: string
    locAd?: string
    isLoginPage?: boolean
}

const TopSection = ({ title, tagline, locAd, isLoginPage }: TopSectionProps) => {
    return (
        <div className="top-sec-wrapper">
            {
                isLoginPage ? <Logo /> : <LogoJoinSkip />
            }
            <h1 className="top-title">{title}</h1>
            <div className='tagline'>
                {tagline && <p>{tagline}</p>}
                {locAd && <p className="loc-ad">{locAd} <a href="."><span>lihat caranya</span></a></p>}
            </div>
        </div>
    )
}

export default TopSection