import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/customersupport.css';
import Warranty from './Warrenty';

function Customersupport() {
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        if (!sections.length) return;

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
            observer.disconnect();
        };
    }, []);

    const headingText = 'Customer Support';
    const words = headingText.split(" ");

    return (
        <div className="customer-support-wrapper">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="animate-letters">
                        {words.map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="word" style={{ '--word-index': index }}>
                                    {word}
                                </span>
                                {index < words.length - 1 && ' '}
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className="animate-slide">
                       We’re here to assist you at every step with your Finike Lithium products, ensuring seamless performance and support.
                    </p>
                </div>
            </section>
            <div className="hero-wrapper">
      
      <div className="ambient-sphere sphere-alpha"></div>
      <div className="ambient-sphere sphere-beta"></div>
      <div className="ambient-sphere sphere-gamma"></div>
      
      <div className="content-gridd">
        
        <div className="brand-showcase">
          <div className="logo-frame">
            <div className="brand-symbol">
              <i className="fas fa-bolt"></i>
            </div>
          </div>
          
          <div className="company-badge">
            <div className="badge-text">EST. 2025</div>
            <div className="badge-divider"></div>
            <div className="badge-location">CHANDIGARH</div>
          </div>
        </div>
        
        <div className="content-panel">
          <div className="section-tag">
            <span className="tag-icon">◆</span>
            <span className="tag-label">Customer Support</span>
            <span className="tag-icon">◆</span>
          </div>
          
          <h2 className="main-title">
            Finike Lithium
          </h2>
          
          <div className="story-block">
            <div className="paragraph-marker"></div>
            <p className="narrative-text">
We are pioneers in comprehensive customer service excellence, delivering high-performance support and assistance for battery inquiries, technical guidance, and warranty services across all applications.

            </p>
          </div>
          
          <div className="story-block">
            <div className="paragraph-marker"></div>
            <p className="narrative-text">
Headquartered in Chandigarh with service teams in Punjab and nationwide support presence, we drive innovation in customer care and satisfaction. Our reliable, efficient support team handles pre-sales consultation, post-sales assistance, and technical troubleshooting by providing personalized solutions and powering exceptional service experiences.
We pride ourselves on offering top-notch pre and post-sales support to all our customers. Connect with us –  <span className="emphasis-text">we'd love to hear from you!</span>.
            </p>
          </div>
          

        </div>
      </div>
      
    </div>



            <Warranty/>
            
        </div>
    );
}

export default Customersupport;