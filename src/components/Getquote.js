import React, { useState, useEffect } from 'react';
import '../css/getquote.css';

function GetQuote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    products: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
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
          console.log(`Forced visibility for section: ${section.className}`);
        }
      });
    }, 1000);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      clearTimeout(timeout);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.products) newErrors.products = 'Please select a products';
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
      const response = await fetch(`${API_BASE_URL}submitquote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            (errorData.errors ? Object.values(errorData.errors).join(', ') : 'Failed to submit form')
        );
      }

      const data = await response.json();
      setStatus({
        loading: false,
        success: data.message || 'Message sent successfully!',
        error: null,
      });
      setFormData({
        name: '',
        email: '',
        mobile: '',
        products: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        loading: false,
        success: null,
        error: error.message || 'An error occurred. Please try again.',
      });
    }
  };

  const headingText = 'Get a Quote';
  const words = headingText.split(' ');

  return (
    <div className="get-quote-wrapper">
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-letters">
            {words.map((word, index) => (
              <span key={index} className="word" data-word={index}>
                {word}&nbsp;
              </span>
            ))}
          </h1>
          <p className="animate-slide">
            Request a tailored quote for Finike Lithium products, and our team will respond promptly.
          </p>
          <a href="#quote-form" className="btn-glow animate-pop">
            Request a Quote
          </a>
        </div>
      </section>

      <div className="hero-wrapper">
  {/* Background Spheres */}
  <div className="ambient-sphere sphere-alpha"></div>
  <div className="ambient-sphere sphere-beta"></div>
  <div className="ambient-sphere sphere-gamma"></div>

  {/* Header */}
  <div className="products-header">
    <div className="header-card">
      <div className="header-icon">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <h2 className="gradient-title">Request a Quote</h2>
    </div>
  </div>

  {/* Quote Form Section */}
  <section id="quote-form" className="registration-section">
    <div className="container">
      <div className="form-wrapperr">
        <div className="form-header">
          <h2>Submit Your Quote Request</h2>
          <p>Provide your details to receive a personalized quote.</p>
        </div>

        {/* Success Message */}
        {status.success ? (
          <div className="success-message animate-slide">
            <h3>Thank You!</h3>
            <p>
              Your quote request has been submitted successfully. We'll contact you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form" noValidate>
            <div className="form-grid">
              {/* Full Name */}
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                  <div className="input-icon">👤</div>
                </div>
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                  <div className="input-icon">📧</div>
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              {/* Mobile */}
              <div className="input-group">
                <label>Mobile Number</label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                  <div className="input-icon">📱</div>
                </div>
                {errors.mobile && <p className="error-message">{errors.mobile}</p>}
              </div>

              {/* Product Selection */}
              <div className="input-group">
                <label>Select a Product</label>
                <div className="select-wrapper">
                  <select
                    name="products"
                    value={formData.products}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a product</option>
                    <optgroup label="Inverters">
                      <option value="1100VA">1100 VA Inverter</option>
                      <option value="2100VA">2100 VA Inverter</option>
                      <option value="3500VA">3.5 KVA Inverter</option>
                      <option value="5000VA">5 KVA Inverter</option>
                      <option value="7500VA">7.5 KVA Inverter</option>
                      <option value="10000VA">10 KVA Inverter</option>
                    </optgroup>
                    <optgroup label="Batteries">
                      <option value="48V_100Ah">48V 100Ah Battery</option>
                      <option value="48V_200Ah">48V 200Ah Battery</option>
                      <option value="51.2V_100Ah">51.2V 100Ah Battery</option>
                      <option value="51.2V_200Ah">51.2V 200Ah Battery</option>
                    </optgroup>
                  </select>
                </div>
                {errors.products && <p className="error-message">{errors.products}</p>}
              </div>

              {/* Message */}
              <div className="input-group">
                <label>Message</label>
                <div className="input-wrapper">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your needs (optional)"
                    rows="1"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cta-button"
              disabled={status.loading}
            >
              {status.loading ? "Submitting..." : "Submit Quote Request"}
            </button>
          </form>
        )}

        {/* Error Message */}
        {status.error && (
          <div className="error-message animate-slide">
            <p>{status.error}</p>
          </div>
        )}
      </div>
    </div>
  </section>

  {/* Bottom CTA */}
  <div className="bottom-cta">
    <div className="cta-card">
      <div className="cta-content">
        <h3>Need Immediate Assistance?</h3>
        <p>
          Our expert support team is standing by to help you with any questions or
          concerns.
        </p>
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
}

export default GetQuote;