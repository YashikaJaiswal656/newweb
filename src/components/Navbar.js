import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, X } from './Icons';
import finikelogo from '../assets/images/finike-lithium-logo.png';
import '../css/navbar.css';

function Navbar({ cart = [] }) {
  const cartItemCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
    : 0;

  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setIsProductsOpen(false);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };


  const toggleProductsDropdown = (e) => {
    e.stopPropagation();
    setIsProductsOpen(!isProductsOpen);
  };

  const closeProductsDropdown = () => setIsProductsOpen(false);
    const closeMenu = () => {
        const sideMenu = document.querySelector(".nav_side_bar");
        const menuIcon = document.querySelector(".menu_icon");
        const overlay = document.querySelector(".sidebar_overlay");
        
        sideMenu.classList.remove("showw");
        overlay.classList.remove("showw");
        
        document.body.style.overflow = "auto";
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = e.target.closest('.sidebar-dropdown');
        const submenu = dropdown.querySelector('.sidebar-submenu');
        const isActive = dropdown.classList.contains('active');
        
        document.querySelectorAll('.sidebar-dropdown').forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('active');
            }
        });
        
        if (isActive) {
            dropdown.classList.remove('active');
        } else {
            dropdown.classList.add('active');
        }
    };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !mobileDropdownRef.current?.contains(event.target) && !event.target.closest('.menu_icon')) {
        closeMenu();
      }
      if (isProductsOpen && !dropdownRef.current?.contains(event.target) && !event.target.closest('.dropdown-toggle')) {
        closeProductsDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    };
  }, [isOpen, isProductsOpen]);

  return (
    <>
      {/* Desktop Header */}
      <div className={`nav fancy-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="glow-bg-header" />
        <div className="contt">
          <div className="logo">
            <NavLink to="/">
              <img src={finikelogo} alt="logo" />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <ul className="desktop-nav">
            <NavLink to="/" className="nav-link"><li>Home</li></NavLink>
            <NavLink to="/about-us" className="nav-link"><li>About Us</li></NavLink>
            <li className={`dropdown ${isProductsOpen ? 'active' : ''}`} ref={dropdownRef}>
              <span onClick={toggleProductsDropdown} className="dropdown-toggle">
                Our Products
                <i className={`dropdown-arrow ${isProductsOpen ? 'rotated' : ''}`}>▼</i>
              </span>
              <ul className={`submenu ${isProductsOpen ? 'show' : ''}`}>
                <NavLink to="/lithiumion-inverter" onClick={closeProductsDropdown}><li>Lithium-Ion Inverter/UPS</li></NavLink>
                <NavLink to="/solar-batteries" onClick={closeProductsDropdown}><li>Lithium Solar Batteries</li></NavLink>
                <NavLink to="/ess-batteries" onClick={closeProductsDropdown}><li>ESS Batteries</li></NavLink>
                <NavLink to="/lithiumion-batteries" onClick={closeProductsDropdown}><li>Two/Three Wheelers Batteries</li></NavLink>
                <NavLink to="/telecom-batteries" onClick={closeProductsDropdown}><li>Telecom Batteries</li></NavLink>
              </ul>
            </li>
            <NavLink to="/customer-support" className="nav-link"><li>Customer Support</li></NavLink>
            <NavLink to="/shop-online" className="nav-link"><li>Shop Online</li></NavLink>
          </ul>

          {/* Cart Icon */}
          <div className="navbar-actions">
            <NavLink to="/cart" className="action-btn cart-btn">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
              )}
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <span className="menu_icon" onClick={toggleMenu}>☰</span>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="sidebar_overlay showw" onClick={closeMenu}></div>}

      {/* Sidebar Nav */}
      <div className={`nav_side_bar ${isOpen ? 'showw' : ''}`} ref={mobileDropdownRef}>
        <div className="sidebar_header">
          <div className="sidebar_logo">
            <img src={finikelogo} alt="logo" />
          </div>
          <i className="fas fa-close close_sidebar" onClick={closeMenu}></i>
        </div>
        <ul>
          <NavLink to="/" onClick={closeMenu}><li>Home</li></NavLink>
          <NavLink to="/about-us" onClick={closeMenu}><li>About Us</li></NavLink>
          <li className="sidebar-dropdown" onClick={toggleDropdown}>
            
              Our Products
              
            
            <ul className='sidebar-submenu'>
              <NavLink to="/lithiumion-inverter" onClick={closeMenu}><li>Lithium-Ion Inverter/UPS</li></NavLink>
              <NavLink to="/solar-batteries" onClick={closeMenu}><li>Lithium Solar Batteries</li></NavLink>
              <NavLink to="/ess-batteries" onClick={closeMenu}><li>ESS Batteries</li></NavLink>
              <NavLink to="/lithiumion-batteries" onClick={closeMenu}><li>Two/Three Wheelers Batteries</li></NavLink>
              <NavLink to="/telecom-batteries" onClick={closeMenu}><li>Telecom Batteries</li></NavLink>
            </ul>
          </li>
          <NavLink to="/customer-support" onClick={closeMenu}><li>Customer Support</li></NavLink>
          <NavLink to="/shop-online" onClick={closeMenu}><li>Shop Online</li></NavLink>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
