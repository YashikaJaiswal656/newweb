import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CouponModal.css';

const CouponModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  // Modern coupon data with better offers
  const coupons = [
    {
      code: 'FINIKE2028',
      discount: '₹2000 OFF',
      title: 'New Year Special',
      description: 'Premium Lithium Batteries',
      minOrder: '₹25,000',
      validTill: 'Till 31 Jan 2025',
      icon: '🎊',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      code: 'POWER500',
      discount: '₹500 OFF',
      title: 'Power Up Deal',
      description: 'All Battery Models',
      minOrder: '₹15,000',
      validTill: 'Till 28 Feb 2025',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      code: 'LITHIUM1000',
      discount: '₹1000 OFF',
      title: 'Lithium Special',
      description: 'ESS & Inverter Models',
      minOrder: '₹30,000',
      validTill: 'Till 15 Mar 2025',
      icon: '🔋',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  // Smart modal timing - show after user engagement
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('couponModalShown');
    const lastShown = localStorage.getItem('couponModalLastShown');
    const now = Date.now();
    
    // Don't show if shown in last 24 hours
    if (lastShown && (now - parseInt(lastShown)) < 24 * 60 * 60 * 1000) {
      return;
    }

    // Show after 3 seconds of page load or on scroll
    const showModal = () => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('couponModalShown', 'true');
        localStorage.setItem('couponModalLastShown', now.toString());
      }
    };

    const timer = setTimeout(showModal, 3000);
    
    const handleScroll = () => {
      if (window.scrollY > 200) {
        showModal();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  // Real-time countdown
  useEffect(() => {
    if (isOpen) {
      const calculateTimeLeft = () => {
        const endDate = new Date('2025-03-15T23:59:59');
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
      const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  // Auto-rotate coupons
  useEffect(() => {
    if (isOpen && coupons.length > 1) {
      const interval = setInterval(() => {
        setCurrentCouponIndex(prev => (prev + 1) % coupons.length);
      }, 6000); // Faster rotation for better engagement
      return () => clearInterval(interval);
    }
  }, [isOpen, coupons.length]);

  const formatTime = ({ days, hours, minutes }) => {
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(''), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(''), 3000);
    }
  };

  const handleShopNow = () => {
    setIsOpen(false);
    navigate('/shop-online');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const currentCoupon = coupons[currentCouponIndex];

  return (
    <div className="coupon-modal-overlay modern-overlay" onClick={handleOverlayClick}>
      <div className="coupon-modal modern-modal" onClick={e => e.stopPropagation()}>
        <button className="coupon-close-btn modern-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="coupon-header modern-header" style={{background: currentCoupon.gradient}}>
          <div className="header-content">
            <div className="coupon-icon-modern">{currentCoupon.icon}</div>
            <h2 className="coupon-title modern-title">{currentCoupon.title}</h2>
            <div className="coupon-timer modern-timer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="header-decoration">
            <div className="floating-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>
        </div>

        <div className="coupon-content modern-content">
          <div className="discount-showcase">
            <div className="discount-amount">{currentCoupon.discount}</div>
            <div className="discount-description">{currentCoupon.description}</div>
            <div className="minimum-order">Min. order: {currentCoupon.minOrder}</div>
          </div>
        
          <div className="coupon-code-section modern-code-section">
            <div className="code-label">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Coupon Code
            </div>
            <div className="code-container">
              <div 
                className={`coupon-code modern-code ${copiedCode === currentCoupon.code ? 'copied' : ''}`}
                onClick={() => copyToClipboard(currentCoupon.code)}
              >
                {currentCoupon.code}
              </div>
              <button 
                className={`copy-btn modern-copy ${copiedCode === currentCoupon.code ? 'copied' : ''}`}
                onClick={() => copyToClipboard(currentCoupon.code)}
              >
                {copiedCode === currentCoupon.code ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {copiedCode === currentCoupon.code ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="code-instruction">
              Click to copy • Apply at checkout • Valid till {currentCoupon.validTill}
            </div>
          </div>
        </div>

        <div className="coupon-actions modern-actions">
          <button className="shop-now-btn modern-shop-btn" onClick={handleShopNow}>
            <span>Shop Now & Save</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {coupons.length > 1 && (
          <div className="coupon-indicators modern-indicators">
            {coupons.map((_, index) => (
              <button 
                key={index}
                className={`indicator modern-indicator ${index === currentCouponIndex ? 'active' : ''}`}
                onClick={() => setCurrentCouponIndex(index)}
                aria-label={`View coupon ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="modal-glow"></div>
      </div>
    </div>
  );
};

export default CouponModal;