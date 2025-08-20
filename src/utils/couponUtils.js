// Coupon utility functions

export const getClaimedCoupons = () => {
  return JSON.parse(localStorage.getItem('claimedCoupons') || '[]');
};

export const getValidCoupons = () => {
  const claimed = getClaimedCoupons();
  const now = new Date();
  
  return claimed.filter(coupon => {
    const claimedDate = new Date(coupon.claimedAt);
    const daysDiff = (now - claimedDate) / (1000 * 60 * 60 * 24);
    
    // Coupons are valid for 7 days after claiming
    return daysDiff <= 7;
  });
};

export const applyCouponDiscount = (total, couponCode) => {
  const validCoupons = getValidCoupons();
  const coupon = validCoupons.find(c => c.code === couponCode);
  
  if (!coupon) {
    return { success: false, message: 'Invalid or expired coupon code' };
  }
  
  let discount = 0;
  if (coupon.discount.includes('%')) {
    const percentage = parseInt(coupon.discount.replace('%', ''));
    discount = (total * percentage) / 100;
  } else if (coupon.discount.includes('₹')) {
    discount = parseInt(coupon.discount.replace('₹', '').replace(' OFF', ''));
  }
  
  const finalTotal = Math.max(0, total - discount);
  
  return {
    success: true,
    discount,
    finalTotal,
    coupon
  };
};

export const markCouponAsUsed = (couponCode) => {
  const claimed = getClaimedCoupons();
  const updated = claimed.map(coupon => 
    coupon.code === couponCode 
      ? { ...coupon, used: true, usedAt: new Date().toISOString() }
      : coupon
  );
  
  localStorage.setItem('claimedCoupons', JSON.stringify(updated));
};

export const getCouponStats = () => {
  const claimed = getClaimedCoupons();
  const valid = getValidCoupons();
  const used = claimed.filter(c => c.used);
  
  return {
    total: claimed.length,
    valid: valid.length,
    used: used.length,
    unused: valid.filter(c => !c.used).length
  };
};