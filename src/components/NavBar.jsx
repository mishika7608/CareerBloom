import React from 'react'
import {FaAlignLeft} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';

const NavBar = () => {
  const {toggleSideBar} = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className="btn-container">
          <LogoutContainer/>
        </div>
      </div>
    </Wrapper>
  );
};
export default NavBar;