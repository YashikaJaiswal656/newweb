import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';
import { ShoppingCart, Search, X } from './Icons';
import finikelogo from '../assets/images/finike-lithium-logo.png';

function Navbar({ cart = [] }) {
  // Calculate cart item count with a safeguard for invalid cart data
  const cartItemCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
    : 0;

  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setIsProductsOpen(false);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsProductsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleProductsDropdown = (e) => {
    e.stopPropagation();
    setIsProductsOpen(!isProductsOpen);
  };

  const closeProductsDropdown = () => {
    setIsProductsOpen(false);
  };

  // Close menu or dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !mobileDropdownRef.current?.contains(event.target) && !event.target.closest('.hamburger')) {
        closeMenu();
      }
      if (isProductsOpen && !dropdownRef.current?.contains(event.target) && !event.target.closest('.dropdown-toggle')) {
        closeProductsDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isProductsOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left Side Container for Hamburger and Logo */}
          <div className="navbar-left">
            <button
              className="hamburger"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <NavLink to="/" className="navbar-brand" aria-label="Finike Lithium Home">
              <img src={finikelogo} alt="Finike Lithium Logo" className="navbar-logo" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <ul className="desktop-nav">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About Us
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={toggleProductsDropdown}
                aria-expanded={isProductsOpen}
              >
                Our Products
                <svg
                  className={`dropdown-icon ${isProductsOpen ? 'rotate' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul className={`dropdown-menu ${isProductsOpen ? 'show' : ''}`} ref={dropdownRef}>
                <li className="dropdown-header">
                
                  
                </li>
                <li>
                  <NavLink 
                    to="/lithiumion-inverter" 
                    className="dropdown-item"
                    onClick={closeProductsDropdown}
                  >
                    Lithium-Ion Inverter/UPS
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/solar-batteries" 
                    className="dropdown-item"
                    onClick={closeProductsDropdown}
                  >
                    Lithium Solar Batteries
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/ess-batteries" 
                    className="dropdown-item"
                    onClick={closeProductsDropdown}
                  >
                    ESS Batteries
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/lithiumion-batteries" 
                    className="dropdown-item"
                    onClick={closeProductsDropdown}
                  >
                    Two/Three Wheelers Batteries
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/telecom-batteries" 
                    className="dropdown-item"
                    onClick={closeProductsDropdown}
                  >
                    Telecom Batteries
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/customer-support" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Customer Support
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/shop-online" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Shop Online
              </NavLink>
            </li>
          </ul>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            <NavLink to="/cart" className="action-btn cart-btn" aria-label={`Cart with ${cartItemCount} items`}>
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <button
            className="mobile-menu-close-btn"
            onClick={closeMenu}
            aria-label="Close mobile menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mobile-menu-content" ref={mobileDropdownRef}>
          <ul className="mobile-nav-list">
            <li>
              <NavLink to="/" className="mobile-nav-link" onClick={closeMenu}>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="mobile-nav-link" onClick={closeMenu}>
                <span>About Us</span>
              </NavLink>
            </li>
            <li>
              <button
                className="mobile-nav-link dropdown-toggle"
                onClick={toggleProductsDropdown}
                aria-expanded={isProductsOpen}
              >
                <span>Our Products</span>
                <svg
                  className={`dropdown-icon ${isProductsOpen ? 'rotate' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul className={`mobile-dropdown ${isProductsOpen ? 'show' : ''}`}>
                <li className="dropdown-header">
              
                  
                </li>
                <li>
                  <NavLink 
                    to="/lithiumion-inverter" 
                    className="mobile-dropdown-item" 
                    onClick={closeMenu}
                  >
                    Lithium-Ion Inverter/UPS
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/solar-batteries" 
                    className="mobile-dropdown-item" 
                    onClick={closeMenu}
                  >
                    Lithium Solar Batteries
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/ess-batteries" 
                    className="mobile-dropdown-item" 
                    onClick={closeMenu}
                  >
                    ESS Batteries
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/lithiumion-batteries" 
                    className="mobile-dropdown-item" 
                    onClick={closeMenu}
                  >
                    Two/Three Wheelers Batteries
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/telecom-batteries" 
                    className="mobile-dropdown-item" 
                    onClick={closeMenu}
                  >
                    Telecom Batteries
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/customer-support" className="mobile-nav-link" onClick={closeMenu}>
                <span>Customer Support</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop-online" className="mobile-nav-link" onClick={closeMenu}>
                <span>Shop Online</span>
              </NavLink>
            </li>
          </ul>

          
        </div>
      </div>
    </>
  );
}

export default Navbar;