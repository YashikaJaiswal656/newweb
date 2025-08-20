import React, { useState, useEffect } from 'react';
import { getValidCoupons } from '../utils/couponUtils';
import '../css/CouponIndicator.css';

const CouponIndicator = ({ onShowCoupons }) => {
  const [validCoupons, setValidCoupons] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const updateCoupons = () => {
      setValidCoupons(getValidCoupons());
    };

    updateCoupons();
    
    // Update every 30 seconds
    const interval = setInterval(updateCoupons, 30000);
    
    // Listen for storage changes (when coupons are claimed)
    const handleStorageChange = (e) => {
      if (e.key === 'claimedCoupons') {
        updateCoupons();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (validCoupons.length === 0) return null;

  return (
    <div 
      className="coupon-indicator"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onShowCoupons}
    >
      <div className="coupon-icon">🎫</div>
      <div className="coupon-count">{validCoupons.length}</div>
      
      {showTooltip && (
        <div className="coupon-tooltip">
          <div className="tooltip-header">Your Active Coupons</div>
          <div className="tooltip-coupons">
            {validCoupons.slice(0, 3).map(coupon => (
              <div key={coupon.code} className="tooltip-coupon">
                <span className="tooltip-code">{coupon.code}</span>
                <span className="tooltip-discount">{coupon.discount} OFF</span>
              </div>
            ))}
            {validCoupons.length > 3 && (
              <div className="tooltip-more">+{validCoupons.length - 3} more</div>
            )}
          </div>
          <div className="tooltip-footer">Click to view all</div>
        </div>
      )}
      
      <div className="coupon-pulse"></div>
    </div>
  );
};

export default CouponIndicator;