import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MenuPage from '../pages/MenuPage';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logoImage from '../assets/logo/harijadikita_logo.png';

type DrawerState = 'open' | 'closing' | 'closed';

const HamburgerMenu: React.FC = () => {
  const { setOpenMenu, openMenu } = UserAuth();
  const [drawerState, setDrawerState] = useState<DrawerState>('closed');
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const openDrawer = () => {
    if (drawerState === 'open') return;
    setDrawerState('closing'); // off-screen but visible
    requestAnimationFrame(() => {
      setDrawerState('open');
      setOpenMenu(true);
    });
  };

  const closeDrawer = () => {
    // animate only if currently open
    if (drawerState === 'open') {
      setDrawerState('closing');
    }
  };

  // watch external openMenu changes
  useEffect(() => {
    if (openMenu) {
      // trigger open
      requestAnimationFrame(() => setDrawerState('open'));
    } else if (drawerState === 'open') {
      // trigger smooth close
      setDrawerState('closing');
    }
  }, [openMenu]);


  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      if (drawerState === 'closing') {
        setDrawerState('closed');
        setOpenMenu(false); // sync back to context
      }
    };

    el.addEventListener('transitionend', onTransitionEnd);
    return () => el.removeEventListener('transitionend', onTransitionEnd);
  }, [drawerState, setOpenMenu]);


  const toggleMenu = () => {
    if (drawerState === 'open') closeDrawer();
    else openDrawer();
  };

  const drawerPortal = ReactDOM.createPortal(
    <>
      <div ref={drawerRef} className={`drawer ${drawerState}`}>
        <MenuPage isOpen={drawerState === 'open'} toggleMenu={toggleMenu} />
      </div>
      {(drawerState === 'open' || drawerState === 'closing') && (
        <div className="drawer-overlay" onClick={closeDrawer} />
      )}
    </>,
    document.getElementById('drawer-root') as HTMLElement
  );

  return (
    <>
      <div className="hamburger-container">
        <img
          className="logo_image"
          src={logoImage}
          alt="logo"
          onClick={() => {
            navigate('/home');
            // close immediately on navigation
            setDrawerState('closed');
            setOpenMenu(false);
          }}
        />
        <button className="hamburger-button" onClick={toggleMenu}>
          <div className={`icon ${drawerState === 'open' ? 'open' : ''}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>
      {drawerPortal}
    </>
  );
};

export default HamburgerMenu;
