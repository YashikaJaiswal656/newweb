import React, { useState, useEffect } from 'react';
import '../css/CouponNotification.css';

const CouponNotification = ({ coupon, onClose, onClaim }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds to claim

  useEffect(() => {
    setIsVisible(true);
    
    // Auto close after 10 seconds
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const handleClaim = () => {
    onClaim(coupon);
    onClose();
  };

  if (!coupon) return null;

  return (
    <div className={`coupon-notification ${isVisible ? 'visible' : ''}`}>
      <div className="notification-content">
        <div className="notification-header">
          <div className="notification-icon">🎁</div>
          <div className="notification-title">Special Offer!</div>
          <button className="notification-close" onClick={onClose}>×</button>
        </div>
        
        <div className="notification-body">
          <div className="notification-discount">
            <span className="discount-value">{coupon.discount}</span>
            <span className="discount-label">OFF</span>
          </div>
          <div className="notification-details">
            <div className="notification-text">{coupon.title}</div>
            <div className="notification-code">Code: {coupon.code}</div>
          </div>
        </div>
        
        <div className="notification-footer">
          <div className="notification-timer">
            <span className="timer-icon">⏰</span>
            <span className="timer-text">Claim in {timeLeft}s</span>
          </div>
          <button className="notification-claim" onClick={handleClaim}>
            Claim Now!
          </button>
        </div>
      </div>
      
      <div className="notification-progress">
        <div 
          className="progress-fill"
          style={{ animationDuration: '10s' }}
        ></div>
      </div>
    </div>
  );
};

export default CouponNotification;