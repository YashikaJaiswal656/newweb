// components/PaymentComponent.jsx
import React, { useState } from 'react';
import { FaRupeeSign, FaCreditCard, FaMobileAlt, FaUniversity, FaLock } from 'react-icons/fa';
import { SiPhonepe, SiPaytm, SiGooglepay, SiAmazonpay } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { loadRazorpay, createRazorpayOrder } from '../utils/razorpay';
import '../css/PaymentComponent.css';

const PaymentComponent = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [loading, setLoading] = useState(false);
  const [activeMethod, setActiveMethod] = useState('all');
  const [selectedWallet, setSelectedWallet] = useState(null);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handlePayment = async (method = null) => {
    setLoading(true);
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      const order = await createRazorpayOrder(amount);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Your Company Name',
        description: 'Payment for services',
        image: 'https://your-company-logo.png',
        handler: function(response) {
          onPaymentSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          });
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Customer address or order notes'
        },
        theme: {
          color: '#6c5ce7'
        },
        method: method || null,
        modal: {
          ondismiss: function() {
            onPaymentError('Payment closed by user');
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError(error.message || 'Payment failed');
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'all', name: 'All', icon: null, color: '#6c5ce7' },
    { id: 'card', name: 'Card', icon: <FaCreditCard />, color: '#fd79a8' },
    { id: 'upi', name: 'UPI', icon: <SiGooglepay />, color: '#00cec9' },
    { id: 'netbanking', name: 'Net Banking', icon: <FaUniversity />, color: '#0984e3' },
    { id: 'wallet', name: 'Wallets', icon: <FaMobileAlt />, color: '#e17055' }
  ];

  const walletMethods = [
    { id: 'phonepe', name: 'PhonePe', icon: <SiPhonepe />, color: '#5f27cd' },
    { id: 'paytm', name: 'Paytm', icon: <SiPaytm />, color: '#00baf2' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: <SiAmazonpay />, color: '#ff9900' },
    { id: 'googlepay', name: 'Google Pay', icon: <SiGooglepay />, color: '#4285F4' }
  ];

  const bankLogos = [
    { id: 'sbi', name: 'SBI', url: 'https://logo.clearbit.com/sbi.co.in' },
    { id: 'hdfc', name: 'HDFC', url: 'https://logo.clearbit.com/hdfcbank.com' },
    { id: 'icici', name: 'ICICI', url: 'https://logo.clearbit.com/icicibank.com' },
    { id: 'axis', name: 'Axis', url: 'https://logo.clearbit.com/axisbank.com' },
    { id: 'kotak', name: 'Kotak', url: 'https://logo.clearbit.com/kotak.com' },
    { id: 'yesbank', name: 'Yes Bank', url: 'https://logo.clearbit.com/yesbank.in' }
  ];

  const cardTypes = [
    { id: 'visa', name: 'Visa', url: 'https://img.icons8.com/color/96/visa.png' },
  { id: 'mastercard', name: 'Mastercard', url: 'https://img.icons8.com/color/96/mastercard.png' },
  { id: 'amex', name: 'Amex', url: 'https://img.icons8.com/color/96/amex.png' },
  { id: 'rupay', name: 'Rupay', url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Rupay-Logo.png' }
  ];

  return (
    <div className="payment-container">
      <motion.div 
        className="payment-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="payment-title">Complete Your Payment</h1>
        <p className="payment-subtitle">Secure and easy payment process</p>
        
       
      </motion.div>

      <div className="payment-methods-tabs">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            className={`method-tab ${activeMethod === method.id ? 'active' : ''}`}
            onClick={() => {
              setActiveMethod(method.id);
              setSelectedWallet(null);
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            style={{ '--active-color': method.color }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {method.icon && (
              <motion.span 
                className="method-icon"
                animate={{ color: activeMethod === method.id ? method.color : '#666' }}
              >
                {method.icon}
              </motion.span>
            )}
            <span className="method-name">{method.name}</span>
            {activeMethod === method.id && (
              <motion.div 
                className="active-indicator"
                layoutId="activeIndicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <div className="payment-content">
        <AnimatePresence mode="wait">
          {activeMethod === 'all' && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="method-details all-methods"
            >
              <div className="method-description">
                <p>Choose your preferred payment method during checkout</p>
                <p className="small-text">You'll be redirected to a secure payment page</p>
              </div>
              <motion.button
                onClick={() => handlePayment()}
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="pay-now-btn primary"
              >
                {loading ? (
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : (
                  'Proceed to Payment'
                )}
              </motion.button>
            </motion.div>
          )}

          {activeMethod === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="method-details"
            >
              <div className="card-icons">
                {cardTypes.map(card => (
                  <motion.img 
                    key={card.id}
                    src={card.url} 
                    alt={card.name} 
                    className="card-logo"
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ type: 'spring' }}
                  />
                ))}
              </div>
              <div className="method-description">
                <p>Pay using credit or debit card</p>
                <p className="small-text">Visa, Mastercard, Amex, Rupay and more</p>
              </div>
              <motion.button
                onClick={() => handlePayment('card')}
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="pay-now-btn primary"
              >
                {loading ? (
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : (
                  'Pay with Card'
                )}
              </motion.button>
            </motion.div>
          )}

          {activeMethod === 'upi' && (
            <motion.div
              key="upi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="method-details"
            >
              <div className="upi-apps">
                {walletMethods.filter(w => w.id !== 'amazonpay').map(wallet => (
                  <motion.div
                    key={wallet.id}
                    className="upi-app"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePayment(wallet.id)}
                  >
                    <div className="upi-icon" style={{ color: wallet.color }}>
                      {wallet.icon}
                    </div>
                    <span>{wallet.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="method-description">
                <p>Pay using any UPI app</p>
                <p className="small-text">Instant payment with your UPI ID</p>
              </div>
              <motion.button
                onClick={() => handlePayment('upi')}
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="pay-now-btn primary"
              >
                {loading ? (
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : (
                  'Pay with UPI'
                )}
              </motion.button>
            </motion.div>
          )}

          {activeMethod === 'netbanking' && (
            <motion.div
              key="netbanking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="method-details"
            >
              <div className="bank-logos">
                {bankLogos.map(bank => (
                  <motion.div 
                    key={bank.id}
                    className="bank-logo-container"
                    whileHover={{ y: -3 }}
                  >
                    <img 
                      src={bank.url} 
                      alt={bank.name} 
                      className="bank-logo"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40?text=' + bank.name;
                      }}
                    />
                    <span className="bank-name">{bank.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="method-description">
                <p>Pay directly from your bank account</p>
                <p className="small-text">50+ banks supported</p>
              </div>
              <motion.button
                onClick={() => handlePayment('netbanking')}
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="pay-now-btn primary"
              >
                {loading ? (
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                ) : (
                  'Pay via Net Banking'
                )}
              </motion.button>
            </motion.div>
          )}

          {activeMethod === 'wallet' && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="method-details"
            >
              <div className="wallet-options">
                {walletMethods.map((wallet) => (
                  <motion.div
                    key={wallet.id}
                    className={`wallet-option ${selectedWallet === wallet.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedWallet(wallet.id);
                      handlePayment(wallet.id);
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ '--wallet-color': wallet.color }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * walletMethods.indexOf(wallet) }}
                  >
                    <div className="wallet-icon" style={{ color: wallet.color }}>
                      {wallet.icon}
                    </div>
                    <span className="wallet-name">{wallet.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="method-description">
                <p>Pay using your digital wallet</p>
                <p className="small-text">Fast and convenient payments</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        className="payment-security"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="security-badge">
          <FaLock className="lock-icon" />
          <span>100% Secure Payments</span>
        </div>
        <div className="security-logos">
          <img 
            src="https://razorpay.com/assets/razorpay-badges.png" 
            alt="Security badges" 
            className="security-img"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentComponent;