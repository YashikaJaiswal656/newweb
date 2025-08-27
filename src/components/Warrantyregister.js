import React, { useEffect, useState } from 'react';
import '../css/warranty.css';
import { jsPDF } from 'jspdf';

import finikelogo from '../assets/images/finike lithium final logo.png';

function WarrantyRegister() {
  const [dateValue, setDateValue] = useState('');
  const [inputType, setInputType] = useState('text');
  const [activeForm, setActiveForm] = useState('register');
  
  // Registration form state
  const [regFormData, setRegFormData] = useState({
    name: '',
    mobile: '',
    serialno: '',
    purchaseDate: '',
    dealer: '',
    comments: '',
    invoiceno: '',
    pincode: '',
    invoice: null,
  });
  const [regErrors, setRegErrors] = useState({});
  const [regStatus, setRegStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });
  
  // Warranty check state
  const [checkSerial, setCheckSerial] = useState('');
  const [checkError, setCheckError] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [checkLoading, setCheckLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/';

  // Date input handlers
  const handleFocus = () => setInputType('date');
  const handleBlur = () => {
    if (!dateValue) setInputType('text');
  };
  const handleChange = (e) => setDateValue(e.target.value);

  // Initialize component
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Intersection observer for animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('visible');
      }
    });

    const timeout = setTimeout(() => {
      sections.forEach((section) => {
        if (!section.classList.contains('visible')) {
          section.classList.add('visible');
        }
      });
    }, 1000);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      clearTimeout(timeout);
    };
  }, []);

  // Form input handlers
  const handleRegChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = name === 'serialno' || name === 'mobile' ? value.trim() : value;
    setRegFormData((prev) => ({ ...prev, [name]: trimmedValue }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegFormData((prev) => ({ ...prev, invoice: file }));
    
    if (file) {
      if (['image/jpeg', 'image/png'].includes(file.type)) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else if (file.type === 'application/pdf') {
        setPreviewUrl('pdf');
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
  };

  // Form validation
  const validateRegForm = () => {
    const errors = {};

    if (!regFormData.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(regFormData.name.trim())) {
      errors.name = 'Name must be 2-50 characters, letters and spaces only';
    }

    if (!regFormData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(regFormData.mobile.trim())) {
      errors.mobile = 'Mobile number must be 10 digits';
    }

    if (!regFormData.serialno.trim()) {
      errors.serialno = 'Serial number is required';
    }

    if (!regFormData.purchaseDate) {
      errors.purchaseDate = 'Purchase date is required';
    } else {
      const today = new Date();
      const purchaseDate = new Date(regFormData.purchaseDate);
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 5);

      if (purchaseDate > today) {
        errors.purchaseDate = 'Purchase date cannot be in the future';
      } else if (purchaseDate < fiveYearsAgo) {
        errors.purchaseDate = 'Purchase date cannot be more than 5 years ago';
      }
    }

    if (!regFormData.dealer.trim()) {
      errors.dealer = 'Dealer name is required';
    } else if (!/^[a-zA-Z0-9\s&.,-]{2,100}$/.test(regFormData.dealer.trim())) {
      errors.dealer = 'Dealer name must be 2-100 characters';
    }

    if (!regFormData.invoice) {
      errors.invoice = 'Invoice file is required';
    } else if (!['application/pdf', 'image/jpeg', 'image/png'].includes(regFormData.invoice.type)) {
      errors.invoice = 'Invoice must be a PDF, JPEG, or PNG file';
    }

    if (!regFormData.pincode.trim()) {
      errors.pincode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(regFormData.pincode.trim())) {
      errors.pincode = 'Pin code must be 6 digits';
    }

    if (regFormData.comments && regFormData.comments.length > 500) {
      errors.comments = 'Comments cannot exceed 500 characters';
    }

    return errors;
  };

  // Form submission
  const handleRegSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateRegForm();

    if (Object.keys(newErrors).length > 0) {
      setRegErrors(newErrors);
      return;
    }

    setRegErrors({});
    setRegStatus({ loading: true, success: null, error: null });

    try {
      const formData = new FormData();
      Object.keys(regFormData).forEach((key) => {
        if (regFormData[key] !== null && regFormData[key] !== '') {
          formData.append(key, regFormData[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}submitwarranty`, {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Please check the API endpoint.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          (data.errors ? Object.values(data.errors).join(', ') : 'Failed to submit form')
        );
      }

      setRegStatus({
        loading: false,
        success: data.message || 'Warranty registered successfully!',
        error: null,
      });
      
      // Reset form
      setRegFormData({
        name: '',
        mobile: '',
        serialno: '',
        purchaseDate: '',
        dealer: '',
        comments: '',
        invoice: null,
        invoiceno: '',
        pincode: '',
      });
      setPreviewUrl(null);
    } catch (error) {
      console.error('Registration error:', error);
      setRegStatus({
        loading: false,
        success: null,
        error: error.message || 'An error occurred. Please try again.',
      });
    }
  };

  // Warranty check
  const handleCheckWarranty = async (e) => {
    e.preventDefault();
    setCheckError('');
    setCheckResult(null);
    setCheckLoading(true);

    const trimmedSerial = checkSerial.trim();
    if (!trimmedSerial) {
      setCheckError('Serial number is required');
      setCheckLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}getwarranty/${trimmedSerial}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Please check the API endpoint.');
      }

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Failed to check warranty status');
      }

      setCheckResult({
        serialno: trimmedSerial,
        name: data.data?.name || 'Unknown',
        mobile: data.data?.mobile || 'Unknown',
        status: data.data?.status || 'Active',
        invoice: data.data?.invoice || 'Unknown',
        purchaseDate: data.data?.purchase_date || 'Unknown',
        expiryDate: data.data?.expiry_date || 'Unknown',
        dealer: data.data?.dealer || 'Unknown',
        invoiceno: data.data?.invoiceno || 'Unknown',
        pincode: data.data?.pincode || 'Unknown',
      });
      setCheckSerial('');
    } catch (error) {
      console.error('Warranty check error:', error);
      setCheckError(error.message || 'Error checking warranty status. Please try again.');
      setCheckResult(null);
    } finally {
      setCheckLoading(false);
    }
  };

  // Close popup
  const closePopup = () => {
    setCheckResult(null);
    setCheckError('');
  };

  // Enhanced PDF generation with Finike Lithium logo
const downloadPDF = async () => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Document properties
    doc.setProperties({
      title: `Finike Warranty Certificate - ${checkResult.serialno}`,
      subject: 'Warranty Certificate',
      author: 'Finike Lithium',
      keywords: 'warranty, certificate, finike, lithium',
      creator: 'Finike Lithium',
    });

    // Constants for layout
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Color scheme (Professional Certificate Colors)
    const colors = {
      primary: [25, 47, 89],      // Deep Navy Blue
      secondary: [220, 53, 69],   // Professional Red
      accent: [40, 167, 69],      // Success Green
      gold: [255, 193, 7],        // Gold accent
      lightGray: [248, 249, 250], // Light background
      darkGray: [52, 58, 64],     // Dark text
      mediumGray: [108, 117, 125] // Medium text
    };

    // Helper function for consistent text spacing
    const addTextWithSpacing = (text, x, y, options = {}) => {
      const {
        font = 'helvetica',
        style = 'normal',
        size = 10,
        color = colors.darkGray,
        align = 'left',
        maxWidth = null,
        lineHeight = 1.2
      } = options;

      doc.setFont(font, style);
      doc.setFontSize(size);
      doc.setTextColor(...color);

      if (maxWidth) {
        const splitText = doc.splitTextToSize(text, maxWidth);
        splitText.forEach((line, index) => {
          const lineY = y + (index * size * lineHeight * 0.35);
          doc.text(line, x, lineY, { align });
        });
        return y + (splitText.length * size * lineHeight * 0.35);
      } else {
        doc.text(text, x, y, { align });
        return y + (size * lineHeight * 0.35);
      }
    };

    // Draw decorative border frame
    const drawBorder = () => {
      // Outer border
      doc.setDrawColor(...colors.primary);
      doc.setLineWidth(2);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
      
      // Inner decorative border
      doc.setDrawColor(...colors.gold);
      doc.setLineWidth(0.5);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
      
      // Corner decorations
      const cornerSize = 15;
      doc.setFillColor(...colors.primary);
      // Top-left corner
      doc.triangle(8, 8, 8 + cornerSize, 8, 8, 8 + cornerSize, 'F');
      // Top-right corner
      doc.triangle(pageWidth - 8, 8, pageWidth - 8 - cornerSize, 8, pageWidth - 8, 8 + cornerSize, 'F');
      // Bottom-left corner
      doc.triangle(8, pageHeight - 8, 8 + cornerSize, pageHeight - 8, 8, pageHeight - 8 - cornerSize, 'F');
      // Bottom-right corner
      doc.triangle(pageWidth - 8, pageHeight - 8, pageWidth - 8 - cornerSize, pageHeight - 8, pageWidth - 8, pageHeight - 8 - cornerSize, 'F');
    };

    drawBorder();

    // Header background
    doc.setFillColor(...colors.lightGray);
    doc.roundedRect(margin, 15, contentWidth, 35, 3, 3, 'F');

    // Load and add logo (LEFT SIDE)
    const logoWidth = 45;
    const logoHeight = 18;
    let logoLoaded = false;

    try {
      const logoUrl = finikelogo;
      const loadImage = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load logo'));
        });
      };

      const img = await loadImage(logoUrl);
      if (img.complete && img.naturalWidth !== 0) {
        doc.addImage(img, 'PNG', margin + 5, 20, logoWidth, logoHeight);
        logoLoaded = true;
      }
    } catch (error) {
      console.warn('Failed to load logo image:', error);
      // Enhanced fallback design with proper spacing
      doc.setFillColor(...colors.primary);
      doc.roundedRect(margin + 5, 20, logoWidth, logoHeight, 2, 2, 'F');
      
      addTextWithSpacing('FINIKE', margin + 15, 30, {
        font: 'helvetica',
        style: 'bold',
        size: 14,
        color: [255, 255, 255]
      });
      
      addTextWithSpacing('LITHIUM', margin + 15, 35, {
        font: 'helvetica',
        style: 'normal',
        size: 10,
        color: [255, 255, 255]
      });
    }

    // Company information in RIGHT CORNER of header
    const rightTextX = pageWidth - margin - 5; // Right margin with padding
    
    addTextWithSpacing('FINIKE LITHIUM', rightTextX, 28, {
      font: 'helvetica',
      style: 'bold',
      size: 16,
      align: 'right',
      color: colors.primary
    });
    
    addTextWithSpacing('A Unit of Spinoff Technopark Limited', rightTextX, 35, {
      font: 'helvetica',
      style: 'normal',
      size: 10,
      align: 'right',
      color: colors.mediumGray
    });

    // Certificate title with proper spacing
    let yPos = 68;
    
    // Title background
    doc.setFillColor(...colors.primary);
    doc.roundedRect(margin, yPos - 8, contentWidth, 20, 2, 2, 'F');
    
    addTextWithSpacing('WARRANTY CERTIFICATE', pageWidth / 2, yPos + 2, {
      font: 'helvetica',
      style: 'bold',
      size: 20,
      color: [255, 255, 255],
      align: 'center'
    });

    // Main content area with improved spacing
    yPos += 20;
    
    // Product details section
    doc.setFillColor(...colors.lightGray);
    doc.roundedRect(margin, yPos, contentWidth, 85, 3, 3, 'F');
    
    yPos += 12;
    addTextWithSpacing('PRODUCT WARRANTY DETAILS', margin + 5, yPos, {
      font: 'helvetica',
      style: 'bold',
      size: 12,
      color: colors.primary
    });

    yPos += 15;
    
    // Warranty details with improved formatting and spacing
    const details = [
      { label: 'Serial Number', value: checkResult.serialno },
      { label: 'Customer Name', value: checkResult.name },
      { label: 'Mobile Number', value: checkResult.mobile },
      { label: 'Purchase Date', value: checkResult.purchaseDate },
      { label: 'Warranty Status', value: checkResult.status },
      { label: 'Expiry Date', value: checkResult.expiryDate },
      { label: 'Authorized Dealer', value: checkResult.dealer }
    ].filter(detail => detail.value);

    // Improved two-column layout with better spacing
    const col1X = margin + 8;
    const col2X = pageWidth / 2 + 2;
    const labelWidth = 35;
    const valueWidth = (pageWidth / 2) - 45;
    const rowHeight = 9;

    details.forEach((detail, index) => {
      const isLeftColumn = index % 2 === 0;
      const xPos = isLeftColumn ? col1X : col2X;
      const currentY = yPos + Math.floor(index / 2) * rowHeight;

      // Label with proper alignment
      addTextWithSpacing(`${detail.label}:`, xPos, currentY, {
        font: 'helvetica',
        style: 'bold',
        size: 9,
        color: colors.darkGray
      });

      // Value with special formatting for status and proper text wrapping
      let valueColor = colors.mediumGray;
      let valueStyle = 'normal';
      
      if (detail.label === 'Warranty Status') {
        valueColor = detail.value?.toLowerCase().includes('active') ? colors.accent : colors.secondary;
        valueStyle = 'bold';
      }
      
      const valueText = detail.value || 'Not Available';
      
      addTextWithSpacing(valueText, xPos + labelWidth, currentY, {
        font: 'helvetica',
        style: valueStyle,
        size: 9,
        color: valueColor,
        maxWidth: valueWidth,
        lineHeight: 1.1
      });
    });

    // Warranty validity section with proper spacing
    yPos += Math.ceil(details.length / 2) * rowHeight + 20;
    
    // Validity statement with proper text alignment
    doc.setFillColor(...colors.accent);
    doc.roundedRect(margin, yPos, contentWidth, 15, 2, 2, 'F');
    
    addTextWithSpacing('THIS CERTIFICATE CONFIRMS VALID WARRANTY COVERAGE', pageWidth / 2, yPos + 8, {
      font: 'helvetica',
      style: 'bold',
      size: 10,
      color: [255, 255, 255],
      align: 'center'
    });

    // Terms and conditions with improved spacing
    yPos += 25;
    addTextWithSpacing('WARRANTY TERMS & CONDITIONS', margin, yPos, {
      font: 'helvetica',
      style: 'bold',
      size: 11,
      color: colors.primary
    });

    yPos += 10;
    const terms = [
      '• This warranty certificate is valid from the date of purchase mentioned above and covers manufacturing defects only.',
      '• Warranty does not cover physical damage, misuse, abuse, or damage due to external factors.',
      '• Original purchase invoice and this certificate must be presented for all warranty claims.',
      '• Warranty service is provided through authorized person of company/service centers only.',
      '• This warranty is non-transferable and valid only for the original purchaser.',
      '• Contact our customer care team for warranty service requests and technical support.'
    ];

    terms.forEach((term, index) => {
      yPos = addTextWithSpacing(term, margin + 3, yPos, {
        font: 'helvetica',
        style: 'normal',
        size: 8,
        color: colors.darkGray,
        maxWidth: contentWidth - 6,
        lineHeight: 1.3
      });
      yPos += 3; // Add extra spacing between terms
    });

    // Footer with proper spacing
    const footerY = pageHeight - 30;
    doc.setFillColor(...colors.primary);
    doc.rect(0, footerY, pageWidth, 30, 'F');
    
    addTextWithSpacing('FINIKE LITHIUM', pageWidth / 2, footerY + 8, {
      font: 'helvetica',
      style: 'bold',
      size: 12,
      color: [255, 255, 255],
      align: 'center'
    });
    
    addTextWithSpacing('Customer Care: +91 97780-44000 | +91 97787-44000 | Email: customercare@spinoff.in', 
                     pageWidth / 2, footerY + 16, {
      font: 'helvetica',
      style: 'normal',
      size: 8,
      color: [255, 255, 255],
      align: 'center'
    });
    
    addTextWithSpacing('Visit us at: www.finikelithium.com', 
                     pageWidth / 2, footerY + 23, {
      font: 'helvetica',
      style: 'normal',
      size: 7,
      color: [255, 255, 255],
      align: 'center'
    });

    // Save the PDF
    doc.save(`Finike_Warranty_Certificate_${checkResult.serialno}.pdf`);
    
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Failed to generate warranty certificate. Please try again.');
  }
};

  // Date constraints
  const today = new Date().toISOString().split('T')[0];
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const minDate = fiveYearsAgo.toISOString().split('T')[0];

  return (
    <div className="warranty-wrapper">
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-letters">
            {['Warranty', 'Services'].map((word, index) => (
              <span key={index} className="word" data-word={index}>
                {word}&nbsp;
              </span>
            ))}
          </h1>
          <p className="animate-slide">
            Register your Finike Lithium product or check warranty status with ease and confidence.
          </p>
          <div className="banner-buttons animate-pop">
            <a
              className={`btn-glow ${activeForm === 'register' ? 'active' : ''}`}
              onClick={() => setActiveForm('register')}
              href="#formid"
            >
              Register Now
            </a>
            <a
              className={`btn-glow secondary ${activeForm === 'check' ? 'active' : ''}`}
              onClick={() => setActiveForm('check')}
              href="#formid"
            >
              Check Status
            </a>
          </div>
        </div>
      </section>


<section id="warranty-services" className="hero-wrapper warranty-services" style={{opacity:"1"}}>
  {/* Ambient Decorative Spheres */}
  <div className="ambient-sphere sphere-alpha"></div>
  <div className="ambient-sphere sphere-beta"></div>
  <div className="ambient-sphere sphere-gamma"></div>

  {/* Header */}
  <div className="products-header">
    <div className="header-card">
      <div className="header-icon">
        <i className="fas fa-award"></i>
      </div>
      <h2 className="main-title">
        {activeForm === "register" ? "Register Your Warranty" : "Check Warranty Status"}
      </h2>
    </div>
  </div>

  {/* Registration / Check Form */}
  <section className="registration-section" style={{opacity:"1"}}>
    <div className="container">
      <div className="form-wrapperr">
        <div className="form-header">
          <h2>
            {activeForm === "register" ? "Warranty Registration" : "Warranty Check"}
          </h2>
          <p>
            {activeForm === "register"
              ? "Fill out the details below to activate your warranty coverage."
              : "Enter your product serial number to check warranty details instantly."}
          </p>
        </div>

        {/* ✅ Restored global banners */}
        {regStatus.success && activeForm === "register" && (
          <div className="success-message animate-slide">
            <p>{regStatus.success}</p>
          </div>
        )}
        {regStatus.error && activeForm === "register" && (
          <div className="error-message animate-slide">
            <p>{regStatus.error}</p>
          </div>
        )}
        {checkError && activeForm === "check" && (
          <div className="error-message animate-slide">
            <p>{checkError}</p>
          </div>
        )}

        <div className="warranty-form-card animate-slide">
          {activeForm === "register" ? (
            <form onSubmit={handleRegSubmit} className="registration-form" noValidate>
              <div className="form-grid">
                {/* Name */}
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={regFormData.name}
                      onChange={handleRegChange}
                      placeholder="Enter your full name"
                      required
                      pattern="[a-zA-Z\s]{2,50}"
                      maxLength="50"
                    />
                    <div className="input-icon">👤</div>
                  </div>
                  {regErrors.name && <span className="error">{regErrors.name}</span>}
                </div>

                {/* Mobile */}
                <div className="input-group">
                  <label>Mobile Number</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      name="mobile"
                      id="mobile"
                      value={regFormData.mobile}
                      onChange={handleRegChange}
                      placeholder="+91 98765 43210"
                      required
                      pattern="\d{10}"
                      maxLength="10"
                    />
                    <div className="input-icon">📱</div>
                  </div>
                  {regErrors.mobile && <span className="error">{regErrors.mobile}</span>}
                </div>

                {/* Serial Number */}
                <div className="input-group">
                  <label>Product Serial Number</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="serialno"
                      id="serialno"
                      value={regFormData.serialno}
                      onChange={handleRegChange}
                      placeholder="SN123456789"
                      required
                    />
                    <div className="input-icon">🏷️</div>
                  </div>
                  {regErrors.serialno && <span className="error">{regErrors.serialno}</span>}
                </div>

                {/* Purchase Date */}
                <div className="input-group">
                  <label>Invoice Date</label>
                  <div className="input-wrapper">
                    <input
                      type={inputType}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder={inputType === "text" ? "Select Invoice Date" : ""}
                      style={{ color: inputType === "text" ? "#999" : "black" }}
                      name="purchaseDate"
                      min={minDate}
                      max={today}
                      id="purchaseDate"
                      value={regFormData.purchaseDate}
                      onChange={handleRegChange}
                      required
                    />
                    <div className="input-icon">📅</div>
                  </div>
                  {regErrors.purchaseDate && <span className="error">{regErrors.purchaseDate}</span>}
                </div>
                {/* Invoice No */}
                <div className="input-group">
                  <label>Invoice Number</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="invoiceno"
                      id="invoiceno"
                      value={regFormData.invoiceno}
                      onChange={handleRegChange}
                      placeholder="INV-2024-001"
                      required
                      maxLength="100"
                    />
                    <div className="input-icon">🧾</div>
                  </div>
                  {regErrors.invoiceno && <span className="error">{regErrors.invoiceno}</span>}
                </div>

                {/* Dealer */}
                <div className="input-group">
                  <label>Seller/Store Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="dealer"
                      id="dealer"
                      value={regFormData.dealer}
                      onChange={handleRegChange}
                      placeholder="Electronics Store XYZ"
                      required
                      maxLength="100"
                    />
                    <div className="input-icon">🏪</div>
                  </div>
                  {regErrors.dealer && <span className="error">{regErrors.dealer}</span>}
                </div>

                {/* Invoice Upload */}
                <div className="input-group">
                  <label>Upload Invoice</label>
                  <div
                    className="file-drop-area"
                    onClick={() => document.getElementById("invoice").click()}
                  >
                    <input
                      id="invoice"
                      type="file"
                      name="invoice"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                      
                      style={{ display: "none" }}
                    />
                    <div className="file-drop-content">
                      <div className="upload-icon">📎</div>
                      <p>
                        Drop your invoice here or <span>browse files</span>
                      </p>
                      
                    </div>
                  </div>
                  {previewUrl && (
                    <div className="file-preview">
                      {previewUrl === "pdf" ? (
                        <p>PDF selected (preview not available)</p>
                      ) : (
                        <img
                          src={previewUrl}
                          alt="Invoice preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                    </div>
                  )}
                  {regErrors.invoice && <span className="error">{regErrors.invoice}</span>}
                </div>



                {/* Pincode */}
                <div className="input-group">
                  <label>Pincode</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      value={regFormData.pincode}
                      onChange={handleRegChange}
                      placeholder="400001"
                      required
                      maxLength="6"
                    />
                    <div className="input-icon">📍</div>
                  </div>
                  {regErrors.pincode && <span className="error">{regErrors.pincode}</span>}
                </div>

                {/* Comments */}
                <div className="input-group">
                  <label>Additional Details (Optional)</label>
                  <div className="input-wrapper">
                    <textarea
                      name="comments"
                      id="comments"
                      value={regFormData.comments}
                      onChange={handleRegChange}
                      placeholder="Any extra details you’d like to provide"
                      maxLength="500"
                      rows="1"
                    />
                  </div>
                  {regErrors.comments && <span className="error">{regErrors.comments}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="cta-button"
                id="subData"
                disabled={regStatus.loading}
              >
                {regStatus.loading ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCheckWarranty} className="registration-form" noValidate>
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Product Serial Number</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="checkSerial"
                      value={checkSerial}
                      onChange={(e) => setCheckSerial(e.target.value)}
                      placeholder="Product Serial number"
                      required
                    />
                    <div className="input-icon">🏷️</div>
                  </div>
                  {checkError && <span className="error">{checkError}</span>}
                </div>
              </div>

              <button
                type="submit"
                className={`cta-button ${checkLoading ? "loading" : ""}`}
                disabled={checkLoading}
              >
                {checkLoading ? (
                  <>
                    Checking <span className="spinner"></span>
                  </>
                ) : (
                  "Check Status"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </section>
     {checkResult && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={closePopup} className="popup-close">×</button>
            <h2 className="popup-title">Warranty Details</h2>
            <div className="warranty-details">
              <p><strong>Product Serial Number:</strong> <span>{checkResult.serialno}</span></p>
              <p><strong>Name:</strong> <span>{checkResult.name}</span></p>
              <p><strong>Mobile:</strong> <span>{checkResult.mobile}</span></p>
              <p><strong>Warranty Status:</strong> <span>{checkResult.status}</span></p>
              <p><strong>Purchase Date:</strong> <span>{checkResult.purchaseDate}</span></p>
              <p><strong>Expiry Date:</strong> <span>{checkResult.expiryDate}</span></p>
              <p><strong>Dealer:</strong> <span>{checkResult.dealer}</span></p>
            </div>
            <button onClick={downloadPDF} className="popup-download">
              Download Certificate
            </button>
          </div>
        </div>
      )}

      {checkError && !checkResult && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={closePopup} className="popup-close">×</button>
            <div className="not-found">
              <h3>Error</h3>
              <p>{checkError}</p>
              <button onClick={closePopup} className="try-again-btn">
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}


  {/* Bottom CTA */}
  <div className="bottom-cta">
    <div className="cta-card">
      <div className="cta-content">
        <h3>Need Immediate Assistance?</h3>
        <p>
          Our expert support team is standing by to help you with any questions
          or concerns
        </p>
        <div className="cta-buttons">
          <a href="tel:+919778044000" className="cta-primary">
            <i className="fas fa-phone"></i> Call Now: +919778044000
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=customercare@spinoff.in"
            target="_blank"
            className="cta-primary"
          >
            <i className="fas fa-envelope"></i> Mail Now: customercare@spinoff.in
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
</section>


    </div>
  );
}

export default WarrantyRegister;