import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CouponBanner.css';

const CouponBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  // Independence Day coupon data
  const coupons = [
    {
      code: 'FINIKEFREEDOM500',
      discount: '₹500 OFF',
      title: 'Independence Day Special',
      description: 'All 1100VA Inverters',
      details: 'Valid on all 1100VA Lithium Inverter Models',
      validTill: 'Till 31 Aug 2025',
      icon: '🇮🇳',
      gradient: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
      category: '1100VA',
      power: '1100VA'
    },
    {
      code: 'FINIKEFREEDOM1000',
      discount: '₹1000 OFF',
      title: 'Freedom Mega Sale',
      description: 'All 2100VA Inverters',
      details: 'Valid on all 2100VA Lithium Inverter Models',
      validTill: 'Till 31 Aug 2025',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
      category: '2100VA',
      power: '2100VA'
    }
  ];

  useEffect(() => {
    const hasUserClosed = localStorage.getItem('couponBannerUserClosed');
    if (hasUserClosed === 'true') {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.remove('no-banner-padding');
      if (isCollapsed) {
        document.body.classList.add('banner-collapsed');
      } else {
        document.body.classList.remove('banner-collapsed');
      }
    } else {
      document.body.classList.add('no-banner-padding');
      document.body.classList.remove('banner-collapsed');
    }

    return () => {
      document.body.classList.remove('banner-collapsed');
      document.body.classList.add('no-banner-padding');
    };
  }, [isVisible, isCollapsed]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2025-08-15T23:59:59');
      const now = new Date();
      const diff = endDate - now;
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVisible && coupons.length > 1 && !isCollapsed) {
      const interval = setInterval(() => {
        setCurrentCouponIndex(prev => (prev + 1) % coupons.length);
        setIsCopied(false);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isVisible, coupons.length, isCollapsed]);

  const handleClose = () => {
    localStorage.setItem('couponBannerUserClosed', 'true');
    setIsVisible(false);
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleShopNow = () => {
    navigate('/shop-online');
  };

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isVisible) return null;

  const currentCoupon = coupons[currentCouponIndex];

  return (
    <div 
      ref={bannerRef}
      className={`coupon-banner modern-banner ${isCollapsed ? 'collapsed' : ''}`} 
      style={{background: currentCoupon.gradient}}
    >
      {!isCollapsed ? (
        <div className="banner-container">
          <div className="banner-content">
            <div className="banner-left-section">
              <div className="banner-icon">{currentCoupon.icon}</div>
              <div className="banner-text">
                <div className="banner-title">{currentCoupon.title}</div>
                <div className="banner-description">
                  <span className="discount-amount">{currentCoupon.discount}</span>
                  <span className="discount-text">on {currentCoupon.description}</span>
                </div>
                <div className="banner-details">{currentCoupon.details}</div>
              </div>
            </div>
            
            <div className="banner-center-section">
              <div className="power-badge">
                <span className="power-text">{currentCoupon.power}</span>
                <span className="power-label">Inverters</span>
              </div>
            </div>
            
            <div className="banner-right-section">
              <div className="banner-code">
                <span className="code-label">Use Code:</span>
                <button 
                  className={`code-button ${isCopied ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(currentCoupon.code)}
                  title={isCopied ? "Copied!" : "Click to copy"}
                >
                  <span className="code-text">{currentCoupon.code}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    {isCopied ? (
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2"/>
                    ) : (
                      <>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
              <div className="banner-timer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>
                  {timeLeft.days > 0 && `${timeLeft.days} days `}
                  {timeLeft.hours > 0 && `${timeLeft.hours} hrs `}
                  {timeLeft.minutes > 0 && `${timeLeft.minutes} min `}
                  remaining
                </span>
              </div>
            </div>
          </div>
          <div className="banner-actions">
            <button className="shop-button" onClick={handleShopNow}>
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button className="toggle-button" onClick={handleToggle} title="Minimize">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button className="close-button" onClick={handleClose} title="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="banner-collapsed" onClick={handleToggle}>
          <div className="collapsed-content">
            <span className="collapsed-icon">{currentCoupon.icon}</span>
            <span className="collapsed-text">
              Independence Day Sale • {currentCoupon.discount} on {currentCoupon.power} Inverters
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="collapsed-arrow">
              <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      )}
      
      {coupons.length > 1 && !isCollapsed && (
        <div className="banner-indicators">
          {coupons.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentCouponIndex ? 'active' : ''}`}
              onClick={() => setCurrentCouponIndex(index)}
              aria-label={`View coupon ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      <div className="banner-glow"></div>
    </div>
  );
};

export default CouponBanner;