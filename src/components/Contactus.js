import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../css/contactus.css";

function ContactUs() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });
  const [errors, setErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // reCAPTCHA site key from .env (replace with your actual site key)
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || "your-site-key-here";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // IntersectionObserver for animations
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.id === "contact-page-area") {
              const items = entry.target.querySelectorAll(".contact-address, .form-group");
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("reveal");
                }, index * 150);
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle reCAPTCHA verification
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrors((prev) => ({ ...prev, recaptcha: "" }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\+?\d{10,15}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number (10-15 digits)";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ loading: false, success: null, error: "Please fill out all required fields correctly and complete the reCAPTCHA." });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    // Simulate form submission (no backend)
    setTimeout(() => {
      console.log("Form Data Submitted:", { ...formData, recaptchaToken });
      setStatus({
        loading: false,
        success: "Message submitted successfully (simulated)!",
        error: null,
      });
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      setRecaptchaToken(null);
      setErrors({});
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    }, 1000); // Simulate network delay
  };

  // Check if form is valid to enable/disable submit button
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.mobile.trim() &&
      /^\+?\d{10,15}$/.test(formData.mobile) &&
      formData.subject.trim() &&
      formData.message.trim() &&
      recaptchaToken
    );
  };

  // Split the h1 text into words
  const headingText = "Let’s Power the Future Together";
  const words = headingText.split(" ");

  return (
    <div className="contact-wrapper">
      {/* Banner Section */}
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
            Connect with Finike Lithium to explore innovative EV battery solutions or schedule a
            consultation.
          </p>
          <a href="#contact-page-area" className="btn-glow animate-pop">
            Get in Touch
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-page-area" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="animate-letters">We’re Here to Assist</h2>
              <div className="info-list">
                <div className="contact-address">
                  <div className="contact-icon animate-spin">
                    <i className="fas fa-map-marker-alt" aria-label="Location" />
                  </div>
                  <div className="contact-text">
                    <h3>Manufacturing Facility</h3>
                    <strong>Unit-1</strong> <br />
                    <p>Finike Lithium NH1, Tehsil Rajpura, District Patiala, Punjab-140401, India</p>
                    <strong>Unit-2</strong> <br />
                    <p>E226 Phase-8 Mohali Punjab-160071, India</p>
                    <h3>Corporate Office</h3>
                    <p>SCO-117/118, Sector-43B, Chandigarh-160043, India</p>
                  </div>
                </div>
                <div className="contact-address">
                  <div className="contact-icon animate-spin">
                    <i className="fas fa-clock" aria-label="Operating Hours" />
                  </div>
                  <div className="contact-text">
                    <h3>Operating Hours</h3>
                    <p>Monday to Saturday, 9:00 AM to 7:00 PM</p>
                  </div>
                </div>
                <div className="contact-address">
                  <div className="contact-icon animate-spin">
                    <i className="fas fa-phone" aria-label="Contact Information" />
                  </div>
                  <div className="contact-text">
                    <h3>Contact Us</h3>
                    <p>
                      <a href="tel:+919778044000">+91 97780 44000</a>
                      <br />
                      <a href="tel:+919778744000">+91 97787 44000</a>
                      <br />
                      <a href="mailto:sales@finikelithium.com">customercare@spinoff.in</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h2 className="animate-letters">Send Us a Message</h2>
              <form id="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    aria-label="Your Name"
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Your Mobile Number"
                    required
                    aria-label="Your Mobile Number"
                  />
                  {errors.mobile && <p className="error-message">{errors.mobile}</p>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    aria-label="Your Email"
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    aria-label="Subject"
                  />
                  {errors.subject && <p className="error-message">{errors.subject}</p>}
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    aria-label="Your Message"
                  />
                  {errors.message && <p className="error-message">{errors.message}</p>}
                </div>
                <div className="form-group">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                    theme="light"
                  />
                  {errors.recaptcha && <p className="error-message">{errors.recaptcha}</p>}
                </div>
                <button
                  type="submit"
                  className="btn-glow animate-pop"
                  id="submitbtn"
                  disabled={status.loading || !isFormValid()}
                >
                  {status.loading ? "Sending..." : "Send Message"}
                </button>
                {status.success && <p className="success-message">{status.success}</p>}
                {status.error && <p className="error-message">{status.error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;