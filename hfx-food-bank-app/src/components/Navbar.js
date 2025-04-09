import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #2c5282;
  background-image: linear-gradient(to right, #2c5282, #1e4976);
  color: white;
  padding: 0 24px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  img {
    height: 42px;
    margin-right: 12px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 20px;
    img {
      height: 36px;
    }
  }

  @media (max-width: 480px) {
    font-size: 18px;
    img {
      height: 32px;
      margin-right: 8px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background-color: white;
    transition: width 0.2s;
  }
  
  &.active::after, &:hover::after {
    width: 70%;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  
  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background-color: #2c5282;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  flex-direction: column;
  gap: 12px;
  
  ${({ isOpen }) => isOpen && `
    display: flex;
  `}
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;
  text-align: center;
  
  &:hover, &.active {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Function to check if a link is active
  const isActive = path => location.pathname === path;
  
  return (
    <>
      <NavContainer>
        <Logo to="/">
          <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="HFX Food Bank Logo" />
          HFX Food Bank Locator
        </Logo>
        
        <NavLinks className="desktop-nav">
          <NavLink to="/" className={isActive('/') ? 'active' : ''}>
            Find Food Banks
          </NavLink>
          <NavLink to="/about" className={isActive('/about') ? 'active' : ''}>
            About
          </NavLink>
        </NavLinks>
        
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLink to="/" className={isActive('/') ? 'active' : ''}>
          Find Food Banks
        </MobileNavLink>
        <MobileNavLink to="/about" className={isActive('/about') ? 'active' : ''}>
          About
        </MobileNavLink>
      </MobileMenu>
    </>
  );
}

export default Navbar;