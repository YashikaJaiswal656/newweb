import React, { useEffect, useState } from "react";
import "../css/essbatteries.css";
import essbatteriesimg from "../img/essimage.jpeg";
import essBatteriescatalogue from "../assets/catalogues/(V3).pdf"; 
import pdfimg from "../img/pdf.png";

import essimage from '../img/telecomimage.jpeg';
import Hub from "./Hub";
import Power from "./Power";

function EssBatteries(props) {
      const [activeIndex, setActiveIndex] = useState(null);
const faqs = [
        {
          question: "What is an ESS Battery?",
          answer: "An ESS battery stores electricity for later use, enabling renewable energy integration and providing backup during outages."
        },
        {
          question: " How long do Finike ESS batteries last?",
          answer: "Finike ESS batteries are designed to last over 10 years with minimal maintenance."
        },
        {
          question: " Are Finike ESS batteries safe?",
          answer: "Yes, they include an advanced BMS to protect against overcharging, overheating, and short circuits."
        },
        {
          question: "  Can Finike ESS work with my solar system?",
          answer: "Yes, Finike ESS batteries are compatible with most solar inverters and energy management systems."
        }
      ];
      const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      };


  return (
    <div className="ess-batteries-wrapper">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <section className="hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          
          aria-label="Introduction to ESS Battery at Finike Lithium"
          className="video-bg"
        />
      </section>



<Hub/>

      <div className="premium-showcase">

      <div className="ambient-orb orb-primary"></div>
      <div className="ambient-orb orb-secondary"></div>
      <div className="ambient-orb orb-accent"></div>
      <div className="ambient-orb orb-subtle"></div>
      
      
      <div className="showcase-container">
        
        <div className="section-header">
          
          <h1 className="main-title">
            Why Choose Finike ESS?
          </h1>
          <div className="heading-decoration">
            <div className="deco-segment"></div>
            <div className="deco-center"></div>
            <div className="deco-segment"></div>
          </div>
          <p className="section-subtitle">
            Engineered for excellence, designed for the future of energy storage
          </p>
        </div>

        {/* Asymmetric Feature Layout */}
        <div className="features-layout">
          
          {/* Left Column - Stacked Cards */}
          <div className="left-column">
            
            {/* Efficiency Card */}
            <div className="feature-cardd card-efficiency">
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="durability-header" style={{marginBottom:"1px"}}>
                  <div className="icon-background efficiency-bg"><div className="feature-icon">⚡</div></div>
                  <h3 className="card-title">High Efficiency</h3>
                </div>
                
                <div className="efficiency-metrics">
                  <div className="metric-display">
                    <span className="metric-value">95</span>
                    <span className="metric-unit">%</span>
                  </div>
                  <div className="metric-bar">
                    <div className="bar-fill efficiency-fill"></div>
                  </div>
                  <p className="metric-label">Charge-Discharge Rate</p>
                </div>
                <p className="card-description">
                  Optimize energy use with superior charge-discharge efficiency.
                </p>
              </div>
            </div>

            {/* Scalability Card */}
            <div className="feature-cardd card-eco">
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="durability-header" style={{marginBottom:"1px"}}>
                  <div className="icon-background eco-bg"><div className="feature-icon">📊</div></div>
                  <h3 className="card-title">Scalability</h3>
                </div>
                
                
                <div className="eco-indicators">
                  <div className="eco-badge">
                    <span className="badge-text">Residential Solutions</span>
                  </div>
                  <div className="eco-badge">
                    <span className="badge-text">Commercial & Grid-Scale</span>
                  </div>
                </div>
                <p className="card-description">
                  Perfect for residential, commercial, and grid-scale applications.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Single Large Card */}
          <div className="right-column">
            <div className="feature-cardd card-durability">
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="durability-header">
                  <div className="feature-icon-container">
                    <div className="icon-background durability-bg"><div className="feature-icon">🔧</div></div>
                    
                  </div>
                  <div className="header-text">
                    <h3 className="card-title">Longevity</h3>
                    <p className="card-subtitle">10+ Years of Reliable Performance</p>
                  </div>
                </div>
                
                <div className="durability-showcase">
                  <div className="lifespan-visual">
                    <div className="timeline-container">
                      <div className="timeline-track"></div>
                      <div className="timeline-progress"></div>
                      <div className="timeline-points">
                        <div className="time-point active" data-year="2Y"></div>
                        <div className="time-point active" data-year="5Y"></div>
                        <div className="time-point active" data-year="8Y"></div>
                        <div className="time-point active" data-year="10Y"></div>
                        <div className="time-point highlighted" data-year="15Y+"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="durability-stats">
                    <div className="stat-group">
                      <div className="stat-item">
                        <span className="stat-number">15+</span>
                        <span className="stat-label">Years Lifespan</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">Minimal</span>
                        <span className="stat-label">Maintenance</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">6000+</span>
                        <span className="stat-label">Charge Cycles</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="card-description">
                  Designed for over 10 years of reliable performance with minimal maintenance, giving you complete peace of mind. Once installed, our systems operate autonomously with self-diagnostic capabilities that prevent issues before they occur.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="closing-accent">
          <div className="accent-line"></div>
          <div className="accent-dot"></div>
          <div className="accent-line"></div>
        </div>
      </div>
      
    </div>

      <div className="benefits-showcase">
      {/* Ambient Background Elements */}
      <div className="ambient-sphere sphere-alpha"></div>
      <div className="ambient-sphere sphere-beta"></div>
      <div className="ambient-sphere sphere-gamma"></div>
      <div className="ambient-sphere sphere-delta"></div>
      
      {/* Main Container */}
      <div className="showcase-main">
        
        {/* Centered Title Section */}
        <div className="title-section">
          
          <h1 className="main-title">
            Benefits of Finike ESS Batteries
          </h1>
          <p className="title-description">
            Experience the advantages that set our energy storage systems apart
          </p>
        </div>

        {/* Horizontal Flow Layout */}
        <div className="benefits-flow">
          
          {/* Cost Savings - Left Panel */}
          <div className="benefit-panel left-panel">
            <div className="panel-background savings-bg"></div>
            <div className="panel-content">
              <div className="benefit-header">
                <div className="benefit-indicator savings-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-text">
                  <h3 className="benefit-title">Cost Savings</h3>
                  <span className="benefit-subtitle">Grid Independence</span>
                </div>
              </div>
              
              <div className="savings-visualization">
                <div className="cost-reduction">
                  <div className="reduction-display">
                    <span className="reduction-number">60</span>
                    <span className="reduction-symbol">%</span>
                  </div>
                  <p className="reduction-text">Reduced Energy Costs</p>
                </div>
                
              </div>
              
              <p className="benefit-text">
                Reduces energy costs through efficient storage and grid independence, 
                maximizing your renewable energy investment and minimizing utility bills.
              </p>
            </div>
          </div>

        {/* Bottom Extended Lifespan Section */}
        <div className="durability-section">
          <div className="durability-container">
            <div className="durability-background"></div>
            <div className="durability-content">
              <div className="durability-header">
                <div className="benefit-indicator durability-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-info">
                  <h3 className="benefit-title">Extended Lifespan</h3>
                  <span className="benefit-subtitle">10+ Years of Performance</span>
                </div>
              </div>
              
              <div className="lifespan-display">
                
                
                <div className="reliability-stats">
                  <div className="reliability-item">
                    <span className="stat-highlight">10+</span>
                    <span className="stat-desc">Years Consistent Performance</span>
                  </div>
                  
                </div>
              </div>
              
              <p className="durability-text">
                Offers 10+ years of consistent performance with minimal degradation, 
                ensuring reliable energy storage throughout its extended operational life.
              </p>
            </div>
          </div>
        </div>
          {/* Sustainable - Right Panel */}
          <div className="benefit-panel right-panel">
            <div className="panel-background eco-bg"></div>
            <div className="panel-content">
              <div className="benefit-header">
                <div className="benefit-indicator eco-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-text">
                  <h3 className="benefit-title">Sustainable</h3>
                  <span className="benefit-subtitle">Clean Energy Storage</span>
                </div>
              </div>
              
              <div className="eco-metrics">
                <div className="metric-group">
                  <div className="metric-item">
                    <div className="metric-value">100</div>
                    <div className="metric-unit">%</div>
                    <div className="metric-label">Renewable</div>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric-item">
                    <div className="metric-value">0</div>
                    <div className="metric-unit">g</div>
                    <div className="metric-label">CO₂/kWh</div>
                  </div>
                </div>
                
              </div>
              
              <p className="benefit-text">
                Supports clean energy by storing renewable power efficiently. Enhanced Safety 
                features with advanced Battery Management System (BMS) 
              </p>
            </div>
          </div>
        </div>


        {/* Elegant Footer */}
        <div className="elegant-footer">
          <div className="footer-line"></div>
          <div className="footer-accent"></div>
          <div className="footer-line"></div>
        </div>
      </div>
      
    </div>
    <Power/>
    <div className="faq-container">
      
      <div className="floating-orb faq-orb-1"></div>
      <div className="floating-orb faq-orb-2"></div>
      <div className="floating-orb faq-orb-3"></div>
      <div className="floating-orb faq-orb-4"></div>
      
    
      <div className="faq-contentt">
        
        <div className="faq-header">
          
          <h2 className="faq-main-title">Frequently Asked Questions</h2>
          <div className="faq-title-underline">
            <div className="faq-line-segment"></div>
            <div className="faq-line-dot"></div>
            <div className="faq-line-segment"></div>
          </div>
          <p className="faq-subtitle">Everything you need to know about our lithium-ion inverters</p>
        </div>

        
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="faq-card-glow"></div>
              
              
              <div className="faq-question-header" onClick={() => toggleFAQ(index)}>
                <div className="faq-question-left">
                  
                  <h3 className="faq-question">{faq.question}</h3>
                </div>
                
                <div className="faq-toggle-btn">
                  <div className={`faq-plus ${activeIndex === index ? 'rotated' : ''}`}>
                    <div className="faq-plus-horizontal"></div>
                    <div className="faq-plus-vertical"></div>
                  </div>
                </div>
              </div>

              
              <div className={`faq-answer-wrapper ${activeIndex === index ? 'expanded' : ''}`}>
                <div className="faq-answer-content">
                  <div className="faq-decorative-line"></div>
                  <p className="faq-answer">{faq.answer}</p>
                  {index === 0 && (
                    <div className="faq-tech-badges">
                      <span className="faq-tech-badge">DC to AC</span>
                      <span className="faq-tech-badge">Efficient</span>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="faq-comparison-stats">
                      <div className="faq-stat">
                        <span className="faq-stat-number">98%</span>
                        <span className="faq-stat-label">Efficiency</span>
                      </div>
                      <div className="faq-stat">
                        <span className="faq-stat-number">15+</span>
                        <span className="faq-stat-label">Years</span>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="faq-timeline">
                      <div className="faq-timeline-item">
                        <div className="faq-timeline-dot active"></div>
                        <span>10 Years</span>
                      </div>
                      <div className="faq-timeline-line"></div>
                      <div className="faq-timeline-item">
                        <div className="faq-timeline-dot active"></div>
                        <span>15 Years</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        
        

        
      </div>

      
    </div>


<div className="catalog-container">
      
      <div className="catalog-floating-orb catalog-orb-1"></div>
      <div className="catalog-floating-orb catalog-orb-2"></div>
      <div className="catalog-floating-orb catalog-orb-3"></div>
      <div className="catalog-floating-orb catalog-orb-4"></div>
      <div className="catalog-floating-orb catalog-orb-5"></div>
      
      <div className="catalog-content">
        
        <div className="catalog-bg-pattern">
          <div className="catalog-pattern-circle"></div>
          <div className="catalog-pattern-circle"></div>
          <div className="catalog-pattern-circle"></div>
        </div>

        
        <div className="catalog-header">
          <div className="catalog-pulse-container">
            <div className="catalog-header-icon">
              📋
            </div>
          </div>
          <h2 className="catalog-main-title">ESS Battery Catalog</h2>
          <div className="catalog-title-underline">
            <div className="catalog-line-segment"></div>
            <div className="catalog-line-dot"></div>
            <div className="catalog-line-segment"></div>
          </div>
          <p className="catalog-subtitle">Discover our range of Energy Storage Systems designed for efficiency and reliability.

</p>
        </div>

        
        <div className="catalog-main-card">
          <div className="catalog-card-glow"></div>
          
          

          <div className="catalog-card-content">


           
            <div className="catalog-cta-section">
              <a 
                href="https://finikelithium.com/static/media/(V3).477da44f7bf309efa47d.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="catalog-cta-button"
              >
                <div className="catalog-button-bg"></div>
                <div className="catalog-button-content">
                  
                  <span className="catalog-button-text">View Catalog</span>
                  <div className="catalog-button-arrow">→</div>
                </div>
                <div className="catalog-button-glow"></div>
              </a>
              
              
            </div>
          </div>
        </div>

        

        
      </div>

    </div>
    </div>
  );
}

export default EssBatteries;