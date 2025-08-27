import React, { useState, useEffect } from 'react';
import '../css/techsupport.css';

function TechnicalSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    product: '',
    serialno: '',
    service_issue: '',
    pincode: '',
    other_issue_description: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'service_issue') {
      setIsOtherSelected(value === 'other');
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.mobile.trim()) newErrors.mobile = 'Phone number is required';
    if (!formData.product) newErrors.product = 'Please select a product';
    if (!formData.service_issue) newErrors.service_issue = 'Please choose an issue';
    else if (formData.service_issue === 'other' && !formData.other_issue_description.trim()) {
      newErrors.other_issue_description = 'Please describe the issue';
    }
    if (!formData.pincode.trim()) newErrors.pincode = 'Pin code is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pin code must be 6 digits';
    if (!formData.message.trim()) newErrors.message = 'Please describe the issue in detail';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus({ loading: true, success: null, error: null });

    try {
      const payload = {
        ...formData,
        service_issue:
          formData.service_issue === 'other'
            ? formData.other_issue_description
            : formData.service_issue,
      };

      const response = await fetch(`${API_BASE_URL}submitcomplaint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          (data.errors ? Object.values(data.errors).join(', ') : 'Failed to submit form')
        );
      }

      setStatus({
        loading: false,
        success: data.message || 'Support request submitted successfully!',
        error: null,
      });
      setFormData({
        name: '',
        email: '',
        mobile: '',
        product: '',
        serialno: '',
        service_issue: '',
        pincode: '',
        other_issue_description: '',
        message: '',
      });
      setIsOtherSelected(false);
    } catch (error) {
      setStatus({
        loading: false,
        success: null,
        error: error.message || 'An error occurred. Please try again later.',
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      product: '',
      serialno: '',
      service_issue: '',
      pincode: '',
      other_issue_description: '',
      message: '',
    });
    setErrors({});
    setStatus({ loading: false, success: null, error: null });
    setIsOtherSelected(false);
  };

  const headingText = 'Complaint Register';
  const words = headingText.split(' ');

  return (
    <div className="tech-support-wrapper" id="techsup">
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-letters">
            {words.map((word, index) => (
              <span key={index} className="word" data-word={index}>
                {word} 
              </span>
            ))}
          </h1>
          <p className="animate-slide">
            Our dedicated team is here to assist with any issues related to your Finike Lithium products.
          </p>
          <a href="#support-form" className="btn-glow animate-pop">
            Submit a Request
          </a>
        </div>
      </section>

      <section id="support-form" className="hero-wrapper">
  {/* Ambient background orbs */}
  <div className="ambient-sphere sphere-alpha"></div>
  <div className="ambient-sphere sphere-beta"></div>
  <div className="ambient-sphere sphere-gamma"></div>

  {/* Header Card */}
  <div className="products-header">
    <div className="header-card">
      <div className="header-icon">
        <i className="fas fa-tools"></i>
      </div>
      <h2 className="gradient-title">Submit Your Support Request</h2>
    </div>
  </div>

  {/* Form Section */}
  <section className="registration-section">
    <div className="container">
      <div className="form-wrapperr">
        <div className="form-header">
          <div className="priority-badge">
            <span className="priority-dot"></span>
            Technical Assistance
          </div>
          <h2>Support Request Form</h2>
          <p>Provide details about your issue for quick resolution</p>
        </div>

        {/* Show error */}
        {status.error && (
          <div className="error-message animate-slide">
            <h3>⚠️ Error</h3>
            <p>{status.error}</p>
          </div>
        )}

        {/* Show success */}
        {status.success ? (
          <div className="success-message animate-slide">
            <h3>✅ Request Submitted</h3>
            <p>{status.success}</p>
            <button className="cta-button" onClick={handleReset}>
              Submit Another Request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="registration-form"
            noValidate
          >
            <div className="form-grid">
              {/* Name */}
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  <div className="input-icon">👤</div>
                </div>
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                  <div className="input-icon">📧</div>
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              {/* Mobile */}
              <div className="input-group">
                <label>Mobile Number</label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                  <div className="input-icon">📱</div>
                </div>
                {errors.mobile && <span className="error">{errors.mobile}</span>}
              </div>

              {/* Product Select */}
              <div className="input-group">
                <label>Select a Product</label>
                <div className="select-wrapper">
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                  >
                    <option value="">Select a Product</option>
                    <optgroup label="Inverters">
                      <option value="1100VA">🔌 1100 VA Inverter</option>
                      <option value="2100VA">🔌 2100 VA Inverter</option>
                      <option value="3500VA">⚡ 3.5 KVA Inverter</option>
                      <option value="5000VA">⚡ 5 KVA Inverter</option>
                      <option value="7500VA">⚡ 7.5 KVA Inverter</option>
                      <option value="10000VA">⚡ 10 KVA Inverter</option>
                    </optgroup>
                    <optgroup label="Batteries">
                      <option value="48V_100Ah">🔋 48V 100Ah Battery</option>
                      <option value="48V_200Ah">🔋 48V 200Ah Battery</option>
                      <option value="51.2V_100Ah">🔋 51.2V 100Ah Battery</option>
                      <option value="51.2V_200Ah">🔋 51.2V 200Ah Battery</option>
                    </optgroup>
                  </select>
                </div>
                {errors.product && (
                  <span className="error">{errors.product}</span>
                )}
              </div>

              {/* Serial Number */}
              <div className="input-group">
                <label>Product Serial Number</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="serialno"
                    name="serialno"
                    value={formData.serialno}
                    onChange={handleChange}
                    placeholder="SN123456789"
                  />
                  <div className="input-icon">🏷️</div>
                </div>
              </div>

              {/* Issue Select */}
              <div className="input-group">
                <label>Choose an Issue</label>
                <div className="select-wrapper">
                  <select
                    id="service_issue"
                    name="service_issue"
                    value={formData.service_issue}
                    onChange={handleChange}
                  >
                    <option value="">Select an Issue</option>
                    <option value="product_issue">⚠️ Product Not Working</option>
                    <option value="after_sales_service">🔧 Repair / Support</option>
                    <option value="delivery_issue">📦 Delivery Issue</option>
                    <option value="installation_issue">🔩 Installation Problem</option>
                    <option value="warranty_issue">🛡️ Warranty Problem</option>
                    <option value="other">❓ Other</option>
                  </select>
                </div>
                {errors.service_issue && (
                  <span className="error">{errors.service_issue}</span>
                )}
              </div>

              {/* Pin Code */}
              <div className="input-group">
                <label>Pin Code</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="400001"
                  />
                  <div className="input-icon">📍</div>
                </div>
                {errors.pincode && (
                  <span className="error">{errors.pincode}</span>
                )}
              </div>

              {/* Message */}
              <div className="input-group">
                <label>Describe the Issue in Detail</label>
                <div className="input-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide detailed info about the issue..."
                    rows="1"
                  />
                </div>
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="cta-button"
              disabled={status.loading}
            >
              {status.loading ? "Submitting..." : "Submit Support Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  </section>

  {/* Bottom CTA */}
  <div className="bottom-cta">
    <div className="cta-card">
      <div className="cta-content">
        <h3>Need Immediate Assistance?</h3>
        <p>Our expert support team is standing by to help you with any questions</p>
        <div className="cta-buttons">
          <a href="tel:+919778044000" className="cta-primary">
            <i className="fas fa-phone"></i> Call Now: +919778044000
          </a>
          <a
            href="mailto:customercare@spinoff.in"
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

export default TechnicalSupport;