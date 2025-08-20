import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ExitIntentCoupon.css';

const ExitIntentCoupon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [copiedCode, setCopiedCode] = useState(false);
  const navigate = useNavigate();

  // Real coupon data - show the bigger discount first
  const coupon = {
    code: 'FINIKE1000RAKHI',
    discount: '₹1000',
    title: 'Rakhi Mega Offer',
    description: 'Valid for 2100VA All Models',
    minOrder: '₹53,000'
  };

  // Detect exit intent
  useEffect(() => {
    let exitIntentShown = sessionStorage.getItem('exitIntentShown');
    
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setIsOpen(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShopNow = () => {
    setIsOpen(false);
    navigate('/shop-online');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="exit-intent-overlay" onClick={handleClose}>
      <div className="exit-intent-modal" onClick={e => e.stopPropagation()}>
        <div className="exit-intent-header">
          <div className="exit-emoji">😱</div>
          <h2 className="exit-title">Wait! Don't Leave Empty Handed!</h2>
          <p className="exit-subtitle">Here's an exclusive offer just for you</p>
        </div>

        <div className="exit-intent-content">
          <div className="exit-offer">
            <div className="offer-badge">EXCLUSIVE</div>
            <div className="offer-discount">
              <span className="discount-number">{coupon.discount}</span>
              <span className="discount-text">OFF</span>
            </div>
            <div className="offer-title">{coupon.title}</div>
            <div className="offer-description">{coupon.description}</div>
          </div>

          <div className="exit-timer">
            <div className="timer-label">This offer expires in:</div>
            <div className="timer-display">
              <span className="timer-time">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="exit-code-section">
            <div className="code-label">Your Exclusive Code:</div>
            <div className="code-container">
              <div className="code-display">{coupon.code}</div>
              <button 
                className={`code-copy-btn ${copiedCode ? 'copied' : ''}`}
                onClick={() => copyToClipboard(coupon.code)}
              >
                {copiedCode ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          <div className="exit-actions">
            <button className="claim-offer-btn" onClick={handleShopNow}>
              <span>Claim Offer & Continue Shopping</span>
              <div className="btn-glow"></div>
            </button>
            <button className="no-thanks-btn" onClick={handleClose}>
              No thanks, I'll pay full price
            </button>
          </div>

          <div className="exit-terms">
            <small>* Minimum order {coupon.minOrder}. Limited time offer.</small>
          </div>
        </div>

        <div className="exit-decorations">
          <div className="decoration-item decoration-1">💎</div>
          <div className="decoration-item decoration-2">⚡</div>
          <div className="decoration-item decoration-3">🎯</div>
          <div className="decoration-item decoration-4">🚀</div>
          <div className="decoration-item decoration-5">💰</div>
          <div className="decoration-item decoration-6">🔥</div>
        </div>

        <div className="exit-progress-ring">
          <svg className="progress-ring" width="100" height="100">
            <circle
              className="progress-ring-circle"
              stroke="#ef4444"
              strokeWidth="4"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
              style={{
                strokeDasharray: `${2 * Math.PI * 46}`,
                strokeDashoffset: `${2 * Math.PI * 46 * (1 - (120 - timeLeft) / 120)}`,
                transition: 'stroke-dashoffset 1s linear'
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentCoupon;