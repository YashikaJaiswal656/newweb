import React, { useState } from 'react';
import '../css/war.css'
import { Link } from 'react-router-dom';
const Warranty = () => {
  const [activeCard, setActiveCard] = useState(null);

  const supportServices = [
    {
      id: 1,
      icon: 'fas fa-shield-alt',
      title: 'Warranty Registration',
      shortTitle: 'Warranty',
      description: 'Register your Finike product for comprehensive warranty coverage and protection',
      buttonText: 'Register Now',
      gradient: 'linear-gradient(45deg, #6f86d6, #48c6ef)',
      glowColor: 'rgba(111, 134, 214, 0.4)',
      features: ['5 Year Warranty', 'Free Replacement', '24/7 Support'],
      to:"/warranty"
    },
    {
      id: 2,
      icon: 'fas fa-tools',
      title: 'Register Complaint',
      shortTitle: 'Complaint',
      description: 'Quick and easy complaint registration with real-time tracking and updates',
      buttonText: 'File Complaint',
      gradient: 'linear-gradient(45deg, #ff758c, #ffb347)',
      glowColor: 'rgba(255, 117, 140, 0.4)',
      features: ['Instant Tracking', 'Quick Response', 'Expert Support'],
      to:"/technical-support"
    },
    {
      id: 3,
      icon: 'fas fa-headset',
      title: 'Contact Us',
      shortTitle: 'Contact',
      description: 'Connect with our expert team for personalized assistance and guidance',
      buttonText: 'Get in Touch',
      gradient: 'linear-gradient(45deg, #667eea, #764ba2)',
      glowColor: 'rgba(102, 126, 234, 0.4)',
      features: ['Live Chat', 'Phone Support', 'Email Help'],
      to:"/contact-us"
    },
    {
      id: 4,
      icon: 'fas fa-calculator',
      title: 'Get a Quote',
      shortTitle: 'Quote',
      description: 'Receive instant, customized quotes for your energy storage requirements',
      buttonText: 'Request Quote',
      gradient: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
      glowColor: 'rgba(255, 154, 158, 0.4)',
      features: ['Instant Quotes', 'Custom Solutions', 'Best Prices'],
      to:"/get-quote"

    },
    {
      id: 5,
      icon: 'fas fa-credit-card',
      title: 'Online Payment',
      shortTitle: 'Payment',
      description: 'Secure and convenient online payment gateway for all your transactions',
      buttonText: 'Make Payment',
      gradient: 'linear-gradient(45deg, #ffecd2, #fcb69f)',
      glowColor: 'rgba(255, 236, 210, 0.4)',
      features: ['Secure Payments', 'Multiple Methods', 'Instant Receipt'],
      to:"/online-payment"
    }
  ];

  return (
    <div className="warranty-support-section">

      <div className="animated-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="floating-orb orb-4"></div>
        <div className="floating-orb orb-5"></div>
      </div>

      <div className="gradient-mesh"></div>

      <div className="support-container">
        
        <div className="support-header">
          
          
          <h1 className="main-title">
            Your <span className="gradient-text">Complete</span> Support
            <br />
            <span className="gradient-text">Experience</span> Awaits
          </h1>
          
          <p className="header-description">
            Experience unmatched support with our comprehensive suite of services designed 
            to keep your Finike products running at peak performance
          </p>
        </div>

        <div className="services-grid">
          {supportServices.map((service, index) => (
            <div 
              key={service.id}
              className='service-card'          


            >
              
              <div 
                className="card-glow"
                
              ></div>

              <div className="card-content">
                
                <div className="icon-container">
                  <div 
                    className="icon-wrapperr"
                    style={{
                      background: service.gradient,
                      boxShadow: `0 10px 30px ${service.glowColor}`
                    }}
                  >
                    <i className={service.icon}></i>
                  </div>
                  
                  <div className="floating-particles">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                  </div>
                </div>

                <div className="text-content">
                  <h3 className="service-title">
                    <span className="mobile-title">{service.shortTitle}</span>
                    <span className="desktop-title">{service.title}</span>
                  </h3>
                  <p className="service-description">{service.description}</p>
                  
                </div>

                <div className="card-footer">
<Link to={service.to}>
                  <button 
                    className="action-button"
                    style={{
                      background: service.gradient,
                      boxShadow: `0 8px 25px ${service.glowColor}`
                    }}
                  >
                    <span>{service.buttonText}</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                  </Link>
                  
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="bottom-cta">
          <div className="cta-card">
            <div className="cta-content">
              <h3>Need Immediate Assistance?</h3>
              <p>Our expert support team is standing by to help you with any questions or concerns</p>
              <div className="cta-buttons">
                <a href="tel:+919778044000" class="cta-primary">
  <i class="fas fa-phone"></i>
  Call Now: +919778044000
</a>

<a href="https://mail.google.com/mail/?view=cm&fs=1&to=customercare@spinoff.in" target="_blank" class="cta-primary">
  <i class="fas fa-envelope"></i>
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

export default Warranty;