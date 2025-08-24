import React, { useState } from 'react';
import MenuPage from '../pages/MenuPage';
import logoImage from '../assets/logo/harijadikita_logo.png'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HamburgerMenu: React.FC = () => {
  const { openMenu, setOpenMenu } = UserAuth()

  const toggleMenu = () => setOpenMenu(prev => !prev);
  const navigate = useNavigate()
  return (
    <div className="hamburger-container">
      <img className='logo_image' src={logoImage} alt='logo' onClick={() => {
        navigate('/home')
        setOpenMenu(false)
      }} />
      <button className="hamburger-button" onClick={toggleMenu}>
        <div className={`icon ${openMenu ? 'open' : ''}`}>
          <span />
          <span />
          <span />
        </div>
      </button>

      <div className={`drawer ${openMenu ? 'open' : ''}`}>
        {/* <button className="close-button" onClick={toggleMenu}>×</button> */}
        <MenuPage isOpen={openMenu} toggleMenu={toggleMenu} />
      </div>

      {/* Optional overlay */}
      {openMenu && <div className="drawer-overlay" onClick={toggleMenu} />}
    </div>
  );
};

export default HamburgerMenu;
