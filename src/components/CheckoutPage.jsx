import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ShoppingBag, 
  Lock,
  Check,
  ArrowLeft,
  Shield
} from 'lucide-react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import '../css/CheckoutPage.css';
import finikelogo from '../assets/images/finike lithium final logo.png';

// Debounce utility to prevent excessive API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const CheckoutPage = ({ cart = [], setCart, userId }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [focusedField, setFocusedField] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const formRef = useRef(null);

  // Coupon code state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [tempCouponData, setTempCouponData] = useState(null);

  // State for pincode loading
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Cart contents:', cart);
  }, [cart]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/v1/";

  // Function to fetch city and state from pincode
  const fetchCityFromPincode = async (pincode) => {
    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      setErrors((prev) => ({ ...prev, pincode: 'Please enter a valid 6-digit pincode' }));
      setFormData((prev) => ({ ...prev, city: '', state: '' }));
      return;
    }

    setIsPincodeLoading(true);
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data[0];

      if (data.Status === 'Success' && data.PostOffice && data.PostOffice.length > 0) {
        const postOffice = data.PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          city: postOffice.Taluk || postOffice.District || '',
          state: postOffice.State || ''
        }));
        setErrors((prev) => ({ ...prev, pincode: '' }));
      } else {
        setErrors((prev) => ({ ...prev, pincode: 'Invalid pincode' }));
        setFormData((prev) => ({ ...prev, city: '', state: '' }));
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      setErrors((prev) => ({ ...prev, pincode: 'Failed to fetch city. Please try another pincode.' }));
      setFormData((prev) => ({ ...prev, city: '', state: '' }));
    } finally {
      setIsPincodeLoading(false);
    }
  };

  // Debounced version of the fetch function
  const debouncedFetchCity = debounce(fetchCityFromPincode, 500);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || '' }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    // Trigger city fetch when pincode changes
    if (name === 'pincode') {
      if (value.length === 6) {
        debouncedFetchCity(value);
      } else {
        setFormData((prev) => ({ ...prev, city: '', state: '' }));
        setErrors((prev) => ({ ...prev, pincode: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (cart.length === 0) {
      newErrors.cart = 'Cart cannot be empty';
    }
    cart.forEach((item, index) => {
      if (!item.product_name) newErrors[`product_${index}`] = `Product name is required for item ${index + 1}`;
      if (!item.quantity || item.quantity < 1) newErrors[`quantity_${index}`] = `Quantity must be at least 1 for item ${index + 1}`;
      if (!item.product_discountedPrice || item.product_discountedPrice < 0) newErrors[`price_${index}`] = `Price must be non-negative for item ${index + 1}`;
    });

    if (!formData.full_name) newErrors.full_name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Valid 6-digit pincode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + (Number(item.product_discountedPrice) || 0) * (item.quantity || 1), 0);
  };

  const subtotal = calculateCartTotal();
  const shipping = 0;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = subtotal - discount;

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      setIsCouponLoading(false);
      return;
    }

    setIsCouponLoading(true);
    setCouponError('');

    try {
      const response = await axios.post(`${API_BASE_URL}validate-coupon`, {
        coupon_code: couponCode.toUpperCase(),
        subtotal: subtotal,
        product_data: cart.map(item => ({
          product_name: item.product_name || 'Unknown Product',
          quantity: item.quantity || 1,
          price: Number(item.product_discountedPrice) || 0,
          product_id: item.id || null
        })),
      });

      if (response.data.message === 'Coupon applied successfully') {
        setTempCouponData({
          code: response.data.coupon.code,
          discount: response.data.coupon.discount,
          description: response.data.coupon.description
        });
        
        setShowSuccessAnimation(true);
        
        setTimeout(() => {
          setShowCongratulations(true);
        }, 500);
        
        setTimeout(() => {
          setAppliedCoupon(response.data.coupon);
          setCouponCode('');
          setCouponError('');
          setShowSuccessAnimation(false);
          setShowCongratulations(false);
          setTempCouponData(null);
        }, 3500);
      } else {
        setCouponError(response.data.message);
      }
    } catch (error) {
      console.error('Coupon validation error:', error.response?.data);
      setCouponError(error.response?.data?.message || 'Failed to validate coupon');
    } finally {
      setIsCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    setIsProcessing(true);
    try {
      const productData = cart.map(item => ({
        product_name: item.product_name || 'Unknown Product',
        quantity: item.quantity || 1,
        price: Number(item.product_discountedPrice) || 0,
        product_id: item.id || null
      }));

      const response = await axios.post(`${API_BASE_URL}placeOrderpayment/create-order`, {
        product_data: productData,
        full_name: formData.full_name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        coupon_code: appliedCoupon?.code || null,
      });

      const { order_id, amount, currency, custom_order_id, product_data, coupon } = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || 'YOUR_RAZORPAY_KEY',
        amount,
        currency,
        name: 'Finike Lithium',
        description: 'Payment for Finike Lithium Order',
        image: finikelogo,
        order_id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(`${API_BASE_URL}payment/verifyPlaceOrderPayment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.message === 'Payment verified successfully') {
              setReceipt(verifyResponse.data.receipt);
              setCart([]);
              setFormData({
                full_name: '',
                email: '',
                mobile: '',
                address: '',
                city: '',
                state: '',
                pincode: ''
              });
              setAppliedCoupon(null);
            } else {
              alert('Payment verification failed: ' + verifyResponse.data.message);
            }
          } catch (err) {
            alert('Payment verification failed: ' + (err.response?.data?.message || 'Server error'));
          }
        },
        prefill: {
          name: formData.full_name || '',
          email: formData.email || '',
          contact: formData.mobile || ''
        },
        notes: {
          purpose: 'Finike Lithium Order',
          address: `${formData.address || ''}, ${formData.city || ''}, ${formData.state || ''} ${formData.pincode || ''}`,
          coupon_code: appliedCoupon?.code || '',
        },
        theme: {
          color: '#000000'
        },
        modal: {
          confirm_close: true
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        alert('Payment failed: ' + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Error: ${error.response?.data?.message || 'Failed to create order'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadReceipt = async () => {
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      const logoHeight = 16;
      const logoWidth = 40;

      doc.setProperties({
        title: `Finike Receipt - ${receipt.receipt_id}`,
        subject: 'Payment Receipt',
        author: 'Finike Lithium',
        keywords: 'receipt, payment, finike, lithium, invoice',
        creator: 'Finike Lithium'
      });

      const img = new Image();
      img.src = finikelogo;
      img.crossOrigin = 'Anonymous';
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = () => {
          console.warn('Failed to load logo image');
          resolve();
        };
      });

      if (img.complete && img.naturalWidth !== 0) {
        doc.addImage(img, 'PNG', margin, 10, logoWidth, logoHeight);
      }

      const companyInfoRightMargin = pageWidth - margin;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Finike Lithium', companyInfoRightMargin, 15, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('A Unit of Spinoff Technopark Limited', companyInfoRightMargin, 20, { align: 'right' });
      doc.text('SCO-117/118, Sector 43B, Chandigarh - 160022', companyInfoRightMargin, 25, { align: 'right' });
      doc.text('CIN: U73100CH2008PLC031273', companyInfoRightMargin, 30, { align: 'right' });

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('PAYMENT RECEIPT', pageWidth / 2, 45, { align: 'center' });

      doc.setDrawColor(200);
      doc.setLineWidth(0.3);
      doc.line(margin, 50, pageWidth - margin, 50);

      let yPos = 60;
      const column1 = margin;
      const column2 = pageWidth / 2 + 10;
      const labelWidth = 30;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Invoice No:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.receipt_id, column1 + labelWidth, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text('Invoice Date:', column2, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.date, column2 + labelWidth, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'bold');
      doc.text('Order ID:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.custom_order_id, column1 + labelWidth, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text('Payment ID:', column2, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.payment_id, column2 + labelWidth, yPos);
      yPos += 10;

      if (receipt.coupon_code && receipt.coupon_code !== 'N/A') {
        doc.setFont('helvetica', 'bold');
        doc.text('Coupon Code:', column1, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(receipt.coupon_code, column1 + labelWidth, yPos);
        yPos += 7;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Customer Details:', column1, yPos);
      yPos += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Name:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.name || 'N/A', column1 + labelWidth, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.text('Email:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.email || 'N/A', column1 + labelWidth, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.text('Phone:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.phone || 'N/A', column1 + labelWidth, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.text('Address:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.address || 'N/A', column1 + labelWidth, yPos, { maxWidth: contentWidth - labelWidth });
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.text('City:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.city || 'N/A', column1 + labelWidth, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.text('Pincode:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.pincode || 'N/A', column1 + labelWidth, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.text('State:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(receipt.state || 'N/A', column1 + labelWidth, yPos);
      yPos += 10;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Payment Details:', column1, yPos);
      yPos += 7;

      doc.setFillColor(240, 240, 240);
      doc.rect(column1, yPos, contentWidth, 8, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('Description', column1 + 2, yPos + 5);
      doc.text('Quantity', column1 + contentWidth * 0.6, yPos + 5);
      doc.text('Amount (Rupees)', column1 + contentWidth - 2, yPos + 5, { align: 'right' });
      yPos += 8;

      receipt.product_data.forEach(item => {
        doc.setFont('helvetica', 'normal');
        doc.text(item.product_name, column1 + 2, yPos + 5, { maxWidth: contentWidth * 0.6 });
        doc.text(item.quantity.toString(), column1 + contentWidth * 0.6, yPos + 5);
        doc.text(`${parseFloat(item.price * item.quantity).toFixed(2)}`, column1 + contentWidth - 2, yPos + 5, { align: 'right' });
        yPos += 8;
      });

      doc.text('Subtotal', column1 + 2, yPos + 5);
      doc.text(`${parseFloat(receipt.subtotal).toFixed(2)}`, column1 + contentWidth - 2, yPos + 5, { align: 'right' });
      yPos += 8;

      if (receipt.discount > 0) {
        doc.text(`Discount (${receipt.coupon_code})`, column1 + 2, yPos + 5);
        doc.text(`-${parseFloat(receipt.discount).toFixed(2)}`, column1 + contentWidth - 2, yPos + 5, { align: 'right' });
        yPos += 8;
      }

      doc.text('Total', column1 + 2, yPos + 5);
      doc.text(`${parseFloat(receipt.amount).toFixed(2)}`, column1 + contentWidth - 2, yPos + 5, { align: 'right' });
      yPos += 15;

      doc.setFont('helvetica', 'bold');
      doc.text('Payment Method:', column1, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text('Online Payment (Razorpay)', column1 + 30, yPos);
      yPos += 10;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Terms & Conditions:', column1, yPos);
      yPos += 5;

      const terms = [
        '1. This is a computer generated receipt and does not require signature.',
        '2. For any queries, contact customercare@spinoff.in or +91 97780-44000',
        '3. Please retain this receipt for your records.'
      ];

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      terms.forEach(term => {
        const splitText = doc.splitTextToSize(term, contentWidth - 5);
        splitText.forEach((line, i) => {
          doc.text(line, column1 + 5, yPos);
          yPos += 5;
        });
      });

      yPos = Math.max(yPos, pageHeight - 30);
      doc.setDrawColor(200);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for your business!', pageWidth / 2, yPos, { align: 'center' });
      yPos += 4;
      doc.text('Website: https://finikelithium.com | Email: customercare@spinoff.in', pageWidth / 2, yPos, { align: 'center' });

      const pageCount = doc.internal.getNumberOfPages();
      if (pageCount > 1) {
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
        }
      }

      doc.save(`Finike_Receipt_${receipt.receipt_id}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  const closeModal = () => {
    setReceipt(null);
    setAppliedCoupon(null);
  };

  // Determine eligible coupons based on cart contents
  const has1100VA = cart.some(item => 
    item.product_name && (
      item.product_name.toLowerCase().includes('1100va') || 
      item.product_name.toLowerCase().includes('1100 va') || 
      item.product_name.toLowerCase().includes('1100-va')
    )
  );
  const has2100VA = cart.some(item => 
    item.product_name && (
      item.product_name.toLowerCase().includes('2100va') || 
      item.product_name.toLowerCase().includes('2100 va') || 
      item.product_name.toLowerCase().includes('2100-va')
    )
  );

  console.log('Frontend - has1100VA:', has1100VA, 'has2100VA:', has2100VA);

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-button">
              <ArrowLeft className="icon-small" />
            </button>
            <div className="header-info">
              <div className="logo-container">
                <ShoppingBag className="logo-icon" />
              </div>
              <div className="header-text">
                <h1 className="header-title">Secure Checkout</h1>
                <p className="header-subtitle">Complete your purchase</p>
              </div>
            </div>
          </div>
          <button className="close-button" onClick={closeModal}>
            <X className="icon-small" />
          </button>
        </div>
      </header>

      <div className="progress-container">
        <div className="progress-steps">
          <div className="step-item">
            <div className="step-circle step-completed">
              <Check className="step-icon" />
            </div>
            <span className="step-label step-active">Cart</span>
          </div>
          <div className="step-line step-line-active"></div>
          <div className="step-item">
            <div className="step-circle step-completed">
              <span className="step-number">2</span>
            </div>
            <span className="step-label step-active">Checkout</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">
              <span className="step-number">3</span>
            </div>
            <span className="step-label">Complete</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="content-grid">
          <div className="form-section" ref={formRef}>
            <form onSubmit={handleCheckout}>
              <div className="form-card">
                <div className="form-header shipping-header">
                  <div className="form-header-content">
                    <div className="form-icon-container shipping-icon">
                      <MapPin className="form-icon" />
                    </div>
                    <div className="form-header-text">
                      <h2 className="form-title">Shipping Information</h2>
                      <p className="form-subtitle">Where should we deliver your order?</p>
                    </div>
                  </div>
                </div>
                
                <div className="form-content">
                  <div className="form-row">
                    <div className="input-group">
                      <div className="input-icon">
                        <User className="icon-small" />
                      </div>
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('full_name')}
                        onBlur={() => setFocusedField('')}
                        className={`form-input ${focusedField === 'full_name' ? 'focused' : ''}`}
                        disabled={isProcessing}
                        required
                      />
                      {errors.full_name && <span className="error-text">{errors.full_name}</span>}
                    </div>
                    
                    <div className="input-group">
                      <div className="input-icon">
                        <Phone className="icon-small" />
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('mobile')}
                        onBlur={() => setFocusedField('')}
                        className={`form-input ${focusedField === 'mobile' ? 'focused' : ''}`}
                        disabled={isProcessing}
                        required
                      />
                      {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="input-icon">
                      <Mail className="icon-small" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`form-input ${focusedField === 'email' ? 'focused' : ''}`}
                      disabled={isProcessing}
                      required
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="input-group">
                    <div className="input-icon textarea-icon">
                      <MapPin className="icon-small" />
                    </div>
                    <textarea
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField('')}
                      rows="3"
                      className={`form-textarea ${focusedField === 'address' ? 'focused' : ''}`}
                      disabled={isProcessing}
                      required
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>

                  <div className="form-row form-row-three">
                      <div className="input-group">
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`form-input-small ${isPincodeLoading ? 'loading' : ''}`}
                        disabled={isProcessing || isPincodeLoading}
                        required
                      />
                      {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`form-input-small ${isPincodeLoading ? 'loading' : ''}`}
                        disabled={isProcessing || isPincodeLoading || (formData.pincode.length === 6 && !errors.pincode)}
                        required
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`form-input-small ${isPincodeLoading ? 'loading' : ''}`}
                        disabled={isProcessing || isPincodeLoading || (formData.pincode.length === 6 && !errors.pincode)}
                        required
                      />
                      {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>
                 
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`checkout-button ${isProcessing ? 'processing' : ''}`}
              >
                {isProcessing ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="checkout-icon" />
                    <span>Place Order • ₹{total.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="summary-section">
            <div className="summary-sticky">
              <div className="summary-card">
                <div className="summary-header">
                  <h2 className="summary-title">Order Summary</h2>
                  <p className="summary-subtitle">{cart.length} items in your cart</p>
                </div>
                
                <div className="summary-content">
                  {cart.length === 0 ? (
                    <div className="empty-cart">
                      <div className="empty-cart-icon">
                        <ShoppingBag className="empty-icon" />
                      </div>
                      <p className="empty-cart-text">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cart.map(item => (
                          <div key={item.id} className="cart-item">
                            <div className="item-image">
                              {item.image ? (
                                <img src={item.image} alt={item.product_name} className="item-img" />
                              ) : (
                                <ShoppingBag className="item-placeholder" />
                              )}
                            </div>
                            <div className="item-details">
                              <h3 className="item-name">
                                {item.product_name || 'Unknown Product'}
                              </h3>
                              <p className="item-price">
                                ₹{(Number(item.product_discountedPrice) || 0).toLocaleString('en-IN')} × {item.quantity || 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="coupon-section">
                        <h3 className="couponn-title">Available Offers & Coupons</h3>
                        {/*
                        <div className="available-coupons">
                          {cart.length === 0 ? (
                            <p className="no-coupons-text">No coupons available. Add items to your cart to see offers.</p>
                          ) : (!has1100VA && !has2100VA) ? (
                            <p className="no-coupons-text">No coupons available for the selected products.</p>
                          ) : (
                            <>
                              {has2100VA && appliedCoupon?.code !== 'FINIKEFREEDOM1000' && (
                                <div className="coupon-card">
                                  <div className="coupon-card-left">
                                    <div className="coupon-icon">💰</div>
                                    <div className="coupon-info">
                                      <div className="coupon-name">FINIKEFREEDOM1000</div>
                                      <div className="coupon-desc">₹1000 off on 2100VA models</div>
                                    </div>
                                  </div>
                                  <button className="coupon-apply-quick" onClick={() => {setCouponCode('FINIKEFREEDOM1000'); applyCoupon();}}>
                                    Apply
                                  </button>
                                </div>
                              )}
                              {has1100VA && !has2100VA && appliedCoupon?.code !== 'FINIKEFREEDOM500' && (
                                <div className="coupon-card">
                                  <div className="coupon-card-left">
                                    <div className="coupon-icon">🎉</div>
                                    <div className="coupon-info">
                                      <div className="coupon-name">FINIKEFREEDOM500</div>
                                      <div className="coupon-desc">₹500 off on 1100VA models</div>
                                    </div>
                                  </div>
                                  <button className="coupon-apply-quick" onClick={() => {setCouponCode('FINIKEFREEDOM500'); applyCoupon();}}>
                                    Apply
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>*/}
                        
                        <div className="coupon-divider">
                          <span>Or enter coupon code manually</span>
                        </div>

                        {!appliedCoupon ? (
                          <div className="coupon-input-container">
                            <div className="coupon-input-wrapper">
                              <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Enter coupon code"
                                className="coupon-input"
                                disabled={isCouponLoading}
                              />
                              <button
                                type="button"
                                onClick={applyCoupon}
                                disabled={isCouponLoading || !couponCode.trim()}
                                className={`coupon-apply-btn ${showSuccessAnimation ? 'success' : ''}`}
                              >
                                {isCouponLoading ? (
                                  <div className="coupon-loading">
                                    <div className="loading-spinner-small"></div>
                                    <span>Applying...</span>
                                  </div>
                                ) : (
                                  'Apply'
                                )}
                              </button>
                            </div>
                            {couponError && (
                              <p className="coupon-error">{couponError}</p>
                            )}
                          </div>
                        ) : (
                          <div className="applied-coupon animate-coupon-success">
                            <div className="coupon-success bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between relative overflow-hidden">
                              <div className="coupon-success-content flex items-center">
                                <div className="coupon-check-container relative">
                                  <Check className="coupon-check-icon text-green-600 w-6 h-6 animate-check-bounce" />
                                  <div className="pulse-bg absolute inset-0 bg-green-100 rounded-full animate-pulse-bg"></div>
                                </div>
                                <div className="coupon-details ml-3">
                                  <span className="couponn-code font-semibold text-green-700">{appliedCoupon.code}</span>
                                  <span className="coupon-description block text-sm text-gray-600">{appliedCoupon.description}</span>
                                  <span className="coupon-savings block text-sm text-green-600">
                                    You saved ₹{appliedCoupon.discount.toLocaleString('en-IN')}!
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={removeCoupon}
                                className="coupon-remove-btn text-gray-500 hover:text-gray-700"
                              >
                                <X className="remove-icon w-5 h-5" />
                              </button>
                              <div className="confetti">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="summary-totals">
                        <div className="total-row">
                          <span>Subtotal</span>
                          <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>

                        {appliedCoupon && discount > 0 && (
                          <div className="total-row discount-row">
                            <span>Discount ({appliedCoupon.code})</span>
                            <span className="discount-amount">-₹{discount.toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        <div className="total-row">
                          <span>Shipping</span>
                          <span className="free-shipping">Free</span>
                        </div>

                        <div className="total-row total-final">
                          <span>Total</span>
                          <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="security-notice">
                        <Shield className="security-icon" />
                        <span>Your information is secure and encrypted</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {receipt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="receipt-card">
              <div className="receipt-header">
                <img src={finikelogo} alt="Finike Lithium" className="receipt-logo" />
                <h3 className="receipt-title">Payment Receipt</h3>
              </div>
              <div className="receipt-details">
                <div className="receipt-row">
                  <span className="receipt-label">Receipt ID:</span>
                  <span className="receipt-value">{receipt.receipt_id}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Payment ID:</span>
                  <span className="receipt-value">{receipt.payment_id}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Order ID:</span>
                  <span className="receipt-value">{receipt.custom_order_id}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Amount:</span>
                  <span className="receipt-value">₹{parseFloat(receipt.amount).toLocaleString('en-IN')}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Purpose:</span>
                  <span className="receipt-value">{receipt.purpose}</span>
                </div>
                {receipt.coupon_code && receipt.coupon_code !== 'N/A' && (
                  <div className="receipt-row">
                    <span className="receipt-label">Coupon Code:</span>
                    <span className="receipt-value">{receipt.coupon_code}</span>
                  </div>
                )}
                {receipt.discount > 0 && (
                  <div className="receipt-row">
                    <span className="receipt-label">Discount:</span>
                    <span className="receipt-value">₹{parseFloat(receipt.discount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="receipt-row">
                  <span className="receipt-label">Name:</span>
                  <span className="receipt-value">{receipt.name || 'N/A'}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Email:</span>
                  <span className="receipt-value">{receipt.email || 'N/A'}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Phone:</span>
                  <span className="receipt-value">{receipt.phone || 'N/A'}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Address:</span>
                  <span className="receipt-value">{receipt.address || 'N/A'}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Pincode:</span>
                  <span className="receipt-value">{receipt.pincode || 'N/A'}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">City:</span>
                  <span className="receipt-value">{receipt.city || 'N/A'}</span>
                </div>
             
                <div className="receipt-row">
                  <span className="receipt-label">State:</span>
                  <span className="receipt-value">{receipt.state || 'N/A'}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Date:</span>
                  <span className="receipt-value">{receipt.date}</span>
                </div>
              </div>
              <div className="form-actions">
                <button className="apple-button primary" onClick={downloadReceipt}>
                  Download PDF Receipt
                </button>
                <button className="apple-button secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCongratulations && (
        <div className="congratulations-overlay">
          <div className="congratulations-modal">
            <button 
              className="congratulations-close" 
              onClick={() => setShowCongratulations(false)}
            >
              <X className="close-icon" />
            </button>
            <div className="congratulations-content">
              <div className="congratulations-animation">
                <div className="celebration-circle">
                  <div className="celebration-icon">🎉</div>
                </div>
                <div className="fireworks">
                  <div className="firework firework-1"></div>
                  <div className="firework firework-2"></div>
                  <div className="firework firework-3"></div>
                  <div className="firework firework-4"></div>
                </div>
              </div>
              
              <div className="congratulations-text">
                <h2 className="congratulations-title">Congratulations! 🎊</h2>
                <p className="congratulations-subtitle">Your coupon has been applied successfully!</p>
                
                <div className="coupon-success-details">
                  <div className="success-couponn-code">{tempCouponData?.code || couponCode}</div>
                  <div className="success-discount-amount">
                    You saved ₹{tempCouponData?.discount?.toLocaleString('en-IN') || '0'}!
                  </div>
                </div>
                
                <div className="celebration-message">
                  <p>🛍️ Continue shopping with your amazing discount!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;