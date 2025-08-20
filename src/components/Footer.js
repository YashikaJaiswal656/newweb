import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import finikelogo from '../assets/images/finike-lithium-footer-logo.png';

function ModernFooter() {
  return (
    <footer className="modern-footer">
      {/* Background Elements */}
      <div className="footer-bg-elements">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-pattern"></div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-content-wrapper">
          
          {/* Company Section */}
          <div className="footer-section company-section">
            <div className="company-logo">
              <img src={finikelogo} alt="Finike Lithium Logo" />
            </div>
            <p className="company-description">
              Finike Lithium is a leading lithium-ion battery manufacturer in India, providing advanced, eco-friendly, and durable energy storage solutions for electric vehicles, solar systems, home inverters, and industrial use. Trusted across pan India for performance and reliability.
            </p>
            
            {/* Social Media */}
            <div className="social-media-section">
              <h4>Connect With Us</h4>
              <div className="social-links">
                <a href="https://www.facebook.com/finikelithium" aria-label="Facebook" className="social-link facebook">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/finikelithium/" aria-label="Instagram" className="social-link instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/finikelithium" aria-label="LinkedIn" className="social-link linkedin">
                  <FaLinkedinIn />
                </a>
                <a href="https://www.whatsapp.com/channel/0029VbAfzAJInlqZSnZmd33X" aria-label="whatsapp" className="social-link whatsapp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact-section">
            <h3>Get In Touch</h3>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h4>Manufacturing Units</h4>
                <div className="address-group">
                  <p><strong>Unit-1:</strong> NH1, Tehsil Rajpura, District Patiala, Punjab-140401</p>
                  <p><strong>Unit-2:</strong> E226 Phase-8 Mohali Punjab-160071</p>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h4>Corporate Office</h4>
                <p>SCO-117/118, Sector-43B, Chandigarh, 160043</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaPhoneAlt />
              </div>
              <div className="contact-details">
                <div className="phone-numbers">
                  <a href="tel:9778044000">+91 97780-44000</a>
                  <a href="tel:9778744000">+91 97787-44000</a>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <a href="mailto:customercare@spinoff.in">customercare@spinoff.in</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaClock />
              </div>
              <div className="contact-details">
                <p>Monday to Saturday: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links-section">
            <h3>Quick Navigation</h3>
            <div className="links-grid">
              <div className="link-group">
                <Link to="/" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Home
                </Link>
                <Link to="/about-us" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  About Us
                </Link>
                <Link to="/ess-batteries" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  ESS Batteries
                </Link>
                <Link to="/lithiumion-batteries" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Lithium-ion Batteries
                </Link>
                <Link to="/lithiumion-inverter" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Lithium-ion Inverter
                </Link>
              </div>
              <div className="link-group">
                <Link to="/telecom-batteries" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Telecom Batteries
                </Link>
                <Link to="/warranty" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Warranty Registration
                </Link>
                <Link to="/technical-support" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Technical Support
                </Link>
                <a href="https://career.spinoff.in/" target="_blank" rel="noopener noreferrer" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Career
                </a>
                <Link to="/online-payment" className="footer-link">
                  <FaArrowRight className="link-arrow" />
                  Online Payment
                </Link>
              </div>
            </div>
          </div>

          {/* Policy Section */}
          <div className="footer-section policy-section">
            <h3>Our Policies</h3>
            <div className="policy-links">
              <Link to="/privacypolicy" className="footer-link">
                <FaArrowRight className="link-arrow" />
                Privacy Policy
              </Link>
              <Link to="/shippingpolicy" className="footer-link">
                <FaArrowRight className="link-arrow" />
                Shipping Policy
              </Link>
              <Link to="/cancellationrefundpolicy" className="footer-link">
                <FaArrowRight className="link-arrow" />
                Cancellation & Refund Policy
              </Link>
              <Link to="/termsandconditions" className="footer-link">
                <FaArrowRight className="link-arrow" />
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <div className="copyright-content">
            <p>© 2025 Finike Lithium, a venture of <a href="https://www.spinoff.in/" target="_blank" rel="noopener noreferrer">Spinoff Technopark Ltd.</a></p>
            <p className="tagline">Powering the Future with Innovation</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Performance Optimizations */
        .modern-footer {
          position: relative;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1d3a 50%, #0f1419 100%);
          color: #ffffff;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          will-change: transform;
        }

        .footer-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .bg-gradient-1, .bg-gradient-2 {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
        }

        .bg-gradient-1 {
          top: -50%;
          right: -20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
        }

        .bg-gradient-2 {
          bottom: -30%;
          left: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%);
        }

        .bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(64, 224, 208, 0.08) 0%, transparent 50%);
          opacity: 0.6;
        }

        .footer-container {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px 20px 0;
        }

        .footer-content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.2fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        .footer-section h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #00D4FF;
          position: relative;
        }

        .footer-section hoccasion: 'after';
        }

        .footer-section h3::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #00D4FF 0%, #40E0D0 100%);
          border-radius: 2px;
        }

        /* Company Section */
        .company-section {
          padding-right: 15px;
        }

        .company-logo img {
          max-width: 140px;
          height: auto;
          margin-bottom: 14px;
        }

        .company-description {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #b8c5d1;
          margin-bottom: 20px;
        }

        .social-media-section h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
        }

        .social-link.facebook:hover {
          background: linear-gradient(135deg, #1877F2, #42A5F5);
        }

        .social-link.instagram:hover {
          background: linear-gradient(135deg, #E4405F, #FCAF45, #833AB4);
        }

        .social-link.linkedin:hover {
          background: linear-gradient(135deg, #0077B5, #00A0DC);
        }
        .social-link.whatsapp:hover {
          background: green;
        }

        /* Contact Section */
        .contact-section {
          padding: 0 10px;
        }

        .contact-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(3px);
        }

        .contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #00D4FF, #40E0D0);
          color: #ffffff;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .contact-details h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: #00D4FF;
        }

        .contact-details p, .contact-details a {
          font-size: 0.85rem;
          line-height: 1.4;
          color: #b8c5d1;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-details a:hover {
          color: #00D4FF;
        }

        .address-group p {
          margin-bottom: 6px;
        }

        .phone-numbers {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        /* Links Section */
        .links-section {
          padding: 0 8px;
        }

        .links-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .link-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b8c5d1;
          text-decoration: none;
          font-size: 0.85rem;
          padding: 6px 0;
          transition: all 0.3s ease;
          border-radius: 6px;
        }

        .footer-link:hover {
          color: #00D4FF;
          transform: translateX(6px);
        }

        .link-arrow {
          font-size: 0.65rem;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .footer-link:hover .link-arrow {
          opacity: 1;
          transform: translateX(2px);
        }

        /* Policy Section */
        .policy-section {
          padding-left: 8px;
        }

        .policy-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* Copyright */
        .footer-copyright {
          text-align: center;
          padding: 18px 0;
        }

        .copyright-content p {
          font-size: 0.85rem;
          color: #8a92a5;
          margin: 3px 0;
        }

        .copyright-content a {
          color: #00D4FF;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .copyright-content a:hover {
          color: #40E0D0;
        }

        .tagline {
          font-style: italic;
          font-size: 0.8rem !important;
          color: #6b7280 !important;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .footer-content-wrapper {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
          }
          
          .policy-section {
            grid-column: 1 / -1;
            margin-top: 15px;
          }
          
          .policy-links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 25px 16px 0;
          }
          
          .footer-content-wrapper {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .policy-section {
            text-align: center;
          }
          
          .policy-links {
            grid-template-columns: 1fr;
            gap: 12px;
            align-items: center;
            justify-items: center;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .links-grid {
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-section h3 {
            font-size: 1.1rem;
            text-align: center;
          }
          
          .footer-section h3::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .contact-item {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          
          .company-section {
            text-align: center;
          }
          
          .policy-section {
            text-align: center;
          }
          
          .policy-links {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default ModernFooter;