import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FloatingCouponWidget.css';

const FloatingCouponWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Modern coupon data
  const coupons = [
    {
      code: 'FINIKE2025',
      discount: '₹2000',
      title: 'New Year Special',
      description: 'Premium Batteries',
      minOrder: '₹25,000',
      icon: '🎊',
      color: '#667eea'
    },
    {
      code: 'POWER500',
      discount: '₹500',
      title: 'Power Deal',
      description: 'All Models',
      minOrder: '₹15,000',
      icon: '⚡',
      color: '#f093fb'
    },
    {
      code: 'LITHIUM1000',
      discount: '₹1000',
      title: 'Lithium Special',
      description: 'ESS & Inverter',
      minOrder: '₹30,000',
      icon: '🔋',
      color: '#4facfe'
    }
  ];

  useEffect(() => {
    // Smart timing - show after user scrolls or after 10 seconds
    const showWidget = () => {
      const hasSeenWidget = localStorage.getItem('floatingWidgetShown');
      const lastShown = localStorage.getItem('floatingWidgetLastShown');
      const now = Date.now();
      
      // Don't show if shown in last 6 hours
      if (lastShown && (now - parseInt(lastShown)) < 6 * 60 * 60 * 1000) {
        return;
      }

      setIsVisible(true);
      localStorage.setItem('floatingWidgetShown', 'true');
      localStorage.setItem('floatingWidgetLastShown', now.toString());
    };

    const timer = setTimeout(showWidget, 10000);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        showWidget();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Auto-minimize after 20 seconds if no interaction
    if (isVisible && !hasInteracted && !isMinimized) {
      const timer = setTimeout(() => {
        setIsMinimized(true);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasInteracted, isMinimized]);

  useEffect(() => {
    // Rotate coupons every 5 seconds
    if (isVisible && coupons.length > 1 && !isMinimized) {
      const interval = setInterval(() => {
        setCurrentCouponIndex(prev => (prev + 1) % coupons.length);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isVisible, coupons.length, isMinimized]);

  const handleInteraction = () => {
    setHasInteracted(true);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const handleShopNow = () => {
    handleInteraction();
    navigate('/shop-online');
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
    setHasInteracted(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      // Show success feedback
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isVisible) return null;

  const currentCoupon = coupons[currentCouponIndex];

  return (
    <div 
      className={`floating-coupon-widget modern-widget ${isMinimized ? 'minimized' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleInteraction}
      style={{ '--accent-color': currentCoupon.color }}
    >
      {!isMinimized ? (
        <div className="widget-content">
          <div className="widget-header">
            <div className="widget-icon">{currentCoupon.icon}</div>
            <div className="widget-title">{currentCoupon.title}</div>
            <div className="widget-controls">
              <button className="minimize-btn" onClick={handleMinimize} title="Minimize">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="close-btn" onClick={handleClose} title="Close">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="widget-body">
            <div className="coupon-preview">
              <div className="preview-discount">{currentCoupon.discount}</div>
              <div className="preview-text">OFF</div>
            </div>
            <div className="coupon-info">
              <div className="coupon-description">{currentCoupon.description}</div>
              <div className="coupon-code" onClick={() => copyToClipboard(currentCoupon.code)}>
                <span>Code: {currentCoupon.code}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="widget-footer">
            <button className="claim-btn" onClick={handleShopNow}>
              <span>Shop Now & Save</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          
          <div className="widget-pulse"></div>
        </div>
      ) : (
        <div className="widget-minimized" onClick={() => setIsMinimized(false)}>
          <div className="minimized-content">
            <div className="minimized-icon">{currentCoupon.icon}</div>
            <div className="minimized-text">
              <div className="minimized-discount">{currentCoupon.discount}</div>
              <div className="minimized-label">OFF</div>
            </div>
          </div>
          <div className="minimized-pulse"></div>
        </div>
      )}
      
      <div className="widget-glow"></div>
    </div>
  );
};

export default FloatingCouponWidget;