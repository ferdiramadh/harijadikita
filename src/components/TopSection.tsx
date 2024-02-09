import Logo from "./Logo"
import LogoJoinSkip from "./LogoJoinSkip"
import { JoinPageType } from "../pages/JoinPage"

type TopSectionProps = {
    title: string
    tagline?: string
    locAd?: string
    isLoginPage?: boolean
}

const TopSection = ({ title, tagline, locAd, isLoginPage }: TopSectionProps & Partial<JoinPageType>) => {
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