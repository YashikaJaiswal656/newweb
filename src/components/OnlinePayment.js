import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import '../css/PaymentComponent.css';
import transectionimg from '../img/transactio.jpeg';
import finikelogo from '../assets/images/finike lithium final logo.png';


const OnlinePayment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    purpose: 'Finike Lithium Battery Purchase',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const formRef = useRef(null);
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  const purposes = ['Finike Lithium Battery Purchase'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const nextStep = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(2);
      setIsAnimating(false);
    }, 300);
  };

  const prevStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(1);
      setIsAnimating(false);
    }, 300);
  };

  const initiatePayment = async () => {
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);
    setReceipt(null);

    try {
      const response = await axios.post(`${API_BASE_URL}payment/create-order`, {
        amount: parseFloat(formData.amount),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        purpose: formData.purpose,
      });

      if (response.data.status !== 'success') {
        throw new Error(response.data.message || 'Failed to create order');
      }

      const { order_id, amount, currency, key } = response.data;

      const options = {
        key,
        amount,
        currency,
        name: 'Finike Lithium',
        description: `Payment for ${formData.purpose}`,
        image: finikelogo,
        order_id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(`${API_BASE_URL}payment/verify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.status === 'success') {
              setReceipt(verifyResponse.data.receipt);
              setCurrentStep(3);
            } else {
              alert('Payment verification failed: ' + verifyResponse.data.message);
            }
          } catch (err) {
            alert('Payment verification failed: ' + (err.response?.data?.message || 'Server error'));
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          purpose: formData.purpose,
        },
        theme: {
          color: '#000000',
        },
        modal: {
          confirm_close: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        alert('Payment failed: ' + response.error.description);
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

const downloadReceipt = async () => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Document properties
    doc.setProperties({
      title: `Finike Receipt - ${receipt.receipt_id}`,
      subject: 'Payment Receipt',
      author: 'Finike Lithium',
      keywords: 'receipt, payment, finike, lithium, invoice',
      creator: 'Finike Lithium',
    });

    // Constants for layout
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    const logoHeight = 16;
    const logoWidth = 40;

    // Header Section
    // Load logo
    const img = new Image();
    img.src = finikelogo; // Make sure this variable is properly defined
    img.crossOrigin = 'Anonymous';
    
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = () => {
        console.warn('Failed to load logo image');
        resolve();
      };
    });

    // Header with logo and company info
    if (img.complete && img.naturalWidth !== 0) {
      doc.addImage(img, 'PNG', margin, 10, logoWidth, logoHeight);
    }

    // Company Information - Right aligned
    const companyInfoRightMargin = pageWidth - margin;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Finike Lithium', companyInfoRightMargin, 15, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('A Unit of Spinoff Technopark Limited', companyInfoRightMargin, 20, { align: 'right' });
    doc.text('SCO-117/118, Sector 43B, Chandigarh - 160022', companyInfoRightMargin, 25, { align: 'right' });
    doc.text('CIN: U73100CH2008PLC031273', companyInfoRightMargin, 30, { align: 'right' });

    // Document Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT RECEIPT', pageWidth / 2, 45, { align: 'center' });

    // Horizontal line
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(margin, 50, pageWidth - margin, 50);

    // Invoice Details Section
    let yPos = 60;

    // Two column layout for invoice details
    const column1 = margin;
    const column2 = pageWidth / 2 + 10;
    const labelWidth = 30; // Width for labels like "Invoice No:"

    // Invoice Information
    doc.setFontSize(10);
    
    // Left column
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice No:', column1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.receipt_id, column1 + labelWidth, yPos);
    
    // Right column
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Date:', column2, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.date, column2 + labelWidth, yPos);
    yPos += 7;

    // Left column
    doc.setFont('helvetica', 'bold');
    doc.text('Order ID:', column1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.order_id, column1 + labelWidth, yPos);
    
    // Right column
    doc.setFont('helvetica', 'bold');
    doc.text('Payment ID:', column2, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.payment_id, column2 + labelWidth, yPos);
    yPos += 10; // Extra space before customer details

    // Customer Information
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Customer Details:', column1, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', column1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.name, column1 + labelWidth, yPos);
    yPos += 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Email:', column1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.email, column1 + labelWidth, yPos);
    yPos += 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Phone:', column1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.phone, column1 + labelWidth, yPos);
    yPos += 10; // Extra space before payment details

    // Payment Details Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Payment Details:', column1, yPos);
    yPos += 7;

    // Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(column1, yPos, contentWidth, 8, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    // Description column (60% width)
    doc.text('Description', column1 + 2, yPos + 5);
    // Amount column (40% width, right aligned)
    doc.text('Amount (Rupees)', column1 + contentWidth - 2, yPos + 5, { align: 'right' });
    yPos += 8;

    // Table Row
    doc.setFont('helvetica', 'normal');
    doc.text(receipt.purpose, column1 + 2, yPos + 5, { maxWidth: contentWidth * 0.6 });
    
    // Format amount with ₹ symbol and proper formatting
    const formattedAmount = `${parseFloat(receipt.amount).toFixed(2)}`;
    doc.text(formattedAmount, column1 + contentWidth - 2, yPos + 5, { align: 'right' });
    yPos += 8;

    // Total Row with thicker top border
    doc.setDrawColor(150);
    doc.setLineWidth(0.5);
    doc.line(column1, yPos, column1 + contentWidth, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text('Total', column1 + 2, yPos + 5);
    doc.text(formattedAmount, column1 + contentWidth - 2, yPos + 5, { align: 'right' });
    yPos += 15;

    // Payment Method
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Method:', column1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('Online Payment (Razorpay)', column1 + 30, yPos);
    yPos += 10;

    // Terms and Conditions
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Terms & Conditions:', column1, yPos);
    yPos += 5;

    const terms = [
      '1. This is a computer generated receipt and does not require signature.',
      '2. For any queries, contact customercare@spinoff.in or +91 97780-44000',
      '3. Please retain this receipt for your records.',
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    terms.forEach(term => {
      // Split text if it's too long
      const splitText = doc.splitTextToSize(term, contentWidth - 5);
      splitText.forEach((line, i) => {
        doc.text(line, column1 + 5, yPos);
        yPos += 5;
      });
    });

    // Footer with company information
    yPos = Math.max(yPos, pageHeight - 30); // Ensure footer is at bottom
    
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for your business!', pageWidth / 2, yPos, { align: 'center' });
    yPos += 4;
    doc.text('', pageWidth / 2, yPos, { align: 'center' });
    yPos += 4;
    doc.text('Website: https://finikelithium.com | Email: customercare@spinoff.in', pageWidth / 2, yPos, { align: 'center' });

    // Page number (only if multi-page)
    const pageCount = doc.internal.getNumberOfPages();
    if (pageCount > 1) {
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
      }
    }

    // Save the PDF
    doc.save(`Finike_Receipt_${receipt.receipt_id}.pdf`);
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Failed to generate receipt. Please try again.');
  }
};

  const closeModal = () => {
    setCurrentStep(1);
    setReceipt(null);
  };

  const headingText = 'Secure Payments';
  const words = headingText.split(' ');

  return (
    <div className="apple-payment-page">
      <header className="payment-hero" ref={heroRef}>
        <div className="hero-content">
          <h1 className="hero-title">
            {words.map((word, index) => (
              <span
                key={index}
                className="title-word"
                style={{ '--word-index': index }}
              >
                {word} 
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">
            Fast, secure transactions for Finike Lithium products
          </p>
        </div>
        <div className="hero-gradient"></div>
      </header>

      <div className="hero-wrapper">
  {/* ambient orbs like your 2nd UI */}
  <div className="ambient-sphere sphere-alpha"></div>
  <div className="ambient-sphere sphere-beta"></div>
  <div className="ambient-sphere sphere-gamma"></div>


  {/* main content area in 2nd UI structure */}
  <section className="registration-section" style={{opacity:"1"}}>
    <div className="container">


      {/* right form column */}
      <div className="form-wrapperr" ref={formRef}>
        <div className={`registration-form ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          {currentStep === 1 ? (
            <div className="form-step">
              <h2 className="form-title">Your Information</h2>
              <p className="form-subtitle">We'll use this to verify your payment</p>
              {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

              <div className="form-grid">
                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      disabled={loading}
                    />
                    <div className="input-icon">👤</div>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      disabled={loading}
                    />
                    <div className="input-icon">📧</div>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      disabled={loading}
                    />
                    <div className="input-icon">📱</div>
                  </div>
                </div>
              </div>

              <button
                className="cta-button"
                onClick={nextStep}
                disabled={loading}
              >
                Continue to Payment
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          ) : currentStep === 2 ? (
            <div className="form-step">
              <h2 className="form-title">Payment Details</h2>
              <p className="form-subtitle">Complete your Finike Lithium purchase</p>
              {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

              <div className="form-grid">
                <div className="input-group">
                  <div className="select-wrapper">
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      {purposes.map(purpose => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Amount (₹)"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  className="cta-button secondary"
                  onClick={prevStep}
                  disabled={loading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Back
                </button>
                <button
                  className="cta-button"
                  onClick={initiatePayment}
                  disabled={loading || !formData.amount}
                >
                  {loading ? 'Processing...' : `Pay ₹${formData.amount || '0'}`}
                </button>
              </div>
            </div>
          ) : null}

          <div className="security-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>256-bit SSL Encryption • PCI DSS Compliant</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* receipt modal untouched */}
  {currentStep === 3 && receipt && (
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
              <span className="receipt-value">{receipt.order_id}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Amount:</span>
              <span className="receipt-value">₹{receipt.amount}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Purpose:</span>
              <span className="receipt-value">{receipt.purpose}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Name:</span>
              <span className="receipt-value">{receipt.name}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Email:</span>
              <span className="receipt-value">{receipt.email}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Phone:</span>
              <span className="receipt-value">{receipt.phone}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Date:</span>
              <span className="receipt-value">{receipt.date}</span>
            </div>
          </div>
          <div className="form-actions">
            <button
              className="cta-button"
              onClick={downloadReceipt}
            >
              Download PDF Receipt
            </button>
            <button
              className="cta-button secondary"
              onClick={closeModal}
            >
              Make Another Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* bottom CTA from 2nd UI */}
  <div className="bottom-cta">
    <div className="cta-card">
      <div className="cta-content">
        <h3>Need Immediate Assistance?</h3>
        <p>Our expert support team is standing by to help you with any questions or concerns</p>
        <div className="cta-buttons">
          <a href="tel:+919778044000" className="cta-primary">
            <i className="fas fa-phone"></i>
            Call Now: +919778044000
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=customercare@spinoff.in"
            target="_blank"
            className="cta-primary"
          >
            <i className="fas fa-envelope"></i>
            Mail Now: customercare@spinoff.in
          </a>
        </div>
      </div>
      <div className="cta-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default OnlinePayment;