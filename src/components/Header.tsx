import React from 'react'
import { CiBellOn } from 'react-icons/ci'
import { RxHamburgerMenu } from 'react-icons/rx'
import logoImage from '../assets/logo/harijadikita_logo.png'

function Header() {
    return (
        <nav>
            <img className='logo_image' src={logoImage} alt='logo' />
            <div className='btn_wrapper'>
                <CiBellOn size={30} />
                <RxHamburgerMenu size={30} />
            </div>
        </nav>
    )
}

export default Header