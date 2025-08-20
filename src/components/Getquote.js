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

      <section id="quote-form" className="get-quote-form-section">
        <div className="container">
          <h2 className="animate-letters">Submit Your Quote Request</h2>
          <p className="animate-slide">
            Provide your details to receive a personalized quote.
          </p>

          {status.success ? (
            <div className="success-message animate-slide">
              <h3>Thank You!</h3>
              <p>Your quote request has been submitted successfully. We'll contact you soon.</p>
            </div>
          ) : (
            <div className="quote-form-card animate-slide">
              <form onSubmit={handleSubmit} className="quote-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      aria-required="true"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      aria-required="true"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      aria-required="true"
                    />
                    {errors.mobile && <span className="error">{errors.mobile}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="products" className="sr-only">Product</label>
                    <select
                      id="products"
                      name="products"
                      value={formData.products}
                      onChange={handleChange}
                      aria-required="true"
                    >
                      <option value="">Select a products</option>
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
                         <option value="51.2V_200Ah">51.2V 100Ah Battery</option>
                        <option value="51.2V_200Ah">51.2V 200Ah Battery</option>
                      </optgroup>
                    </select>
                    {errors.products && <span className="error">{errors.products}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your needs (optional)"
                      rows="4"
                      aria-required="false"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-glow animate-pop"
                  id="getquote"
                  disabled={status.loading}
                >
                  {status.loading ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </form>
            </div>
          )}
          {status.error && (
            <div className="error-message animate-slide">
              <p>{status.error}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default GetQuote;