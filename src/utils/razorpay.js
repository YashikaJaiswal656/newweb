// utils/razorpay.js
export const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount, currency = 'INR') => {
  // In a real app, this would call your backend to create an order
  // This is just a mock implementation
  return {
    id: `order_${Math.random().toString(36).substr(2, 9)}`,
    currency,
    amount: amount * 100, // Convert to paise
    receipt: `receipt_${Math.random().toString(36).substr(2, 5)}`
  };
};