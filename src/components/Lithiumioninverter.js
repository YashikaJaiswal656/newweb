import React, { useEffect } from "react";
import "../css/lithiumioninverter.css";
import '../css/warrenty.css'
import lithiumIonBatteriescatalogue from '../assets/catalogues/(V2).pdf';
import inverterimage from '../img/lithiumintegratedinverter.JPG';
import pdfimg from '../img/pdf.png';
import Slider from "./Slider";
import Benefits from "./Benefits";
import Modal from "./Modal";
import Faq from "./Faq";
import Catalog from "./Catalog";

const catalogProduct = {
  img: "inverter-1.jpg",
  title: "",
  description: "",
  category: "",
  link: lithiumIonBatteriescatalogue
};

function LithiumIonInverter(props) {
  useEffect(() => {
    const toggles = document.querySelectorAll(".faq-toggle");

    const handleToggle = (e) => {
      const toggle = e.currentTarget;
      const content = toggle.nextElementSibling;
      const isActive = content.classList.contains("active");

      document.querySelectorAll(".faq-content.active").forEach((item) => {
        item.classList.remove("active");
        item.previousElementSibling.classList.remove("active");
      });

      if (!isActive) {
        content.classList.add("active");
        toggle.classList.add("active");
      }
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", handleToggle);
    });

    return () => {
      toggles.forEach((toggle) => {
        toggle.removeEventListener("click", handleToggle);
      });
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (
              entry.target.classList.contains("why-inverter-section") ||
              entry.target.classList.contains("benefits") ||
              entry.target.classList.contains("products-section") ||
              entry.target.classList.contains("catalog-section")
            ) {
              const items = entry.target.querySelectorAll(
                ".why-inverter-item, .benefit-item, .product-card, .catalog-item"
              );
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("reveal");
                }, index * (entry.target.classList.contains("why-inverter-section") ? 100 : 150));
              });
            }
            observer.unobserve(entry.target);
            console.log(`Section visible: ${entry.target.className}`);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
    <section className="slider-section" style={{opacity:"1"}}>
        <div className="video-overlay"></div>
        <video autoPlay loop muted playsInline className="video-bg" id='homevd' aria-label="Finike Lithium manufacturing overview">
          <source src="https://finikelithium.com/static/media/LithiumIon%20Inverters%20Introduction_free.9e870d11d8e68e34829f.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    <div className="premium-showcase">

      <div className="ambient-orb orb-primary"></div>
      <div className="ambient-orb orb-secondary"></div>
      <div className="ambient-orb orb-accent"></div>
      <div className="ambient-orb orb-subtle"></div>
      
      
      <div className="showcase-container">
        
        <div className="section-header">
          
          <h1 className="main-title">
            Why Choose Finike Lithium?
          </h1>
          <div className="heading-decoration">
            <div className="deco-segment"></div>
            <div className="deco-center"></div>
            <div className="deco-segment"></div>
          </div>
          
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
                  <div className="icon-background efficiency-bg"><div className="feature-icone">E</div></div>
                  <h3 className="card-title">Maximum Efficiency</h3>
                </div>
                
                <div className="efficiency-metrics">
                  <div className="metric-display">
                    <span className="metric-value">98</span>
                    <span className="metric-unit">%</span>
                  </div>
                  <div className="metric-bar">
                    <div className="bar-fill efficiency-fill"></div>
                  </div>
                  <p className="metric-label">Conversion Rate</p>
                </div>
                
              </div>
            </div>

            {/* Eco Card */}
            <div className="feature-cardd card-eco">
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="durability-header" style={{marginBottom:"1px"}}>
                  <div className="icon-background eco-bg"><div className="feature-icone">R</div></div>
                  <h3 className="card-title">Sustainable Design</h3>
                </div>
                
                
                <div className="eco-indicators">
                  <div className="eco-badge">
                    <span className="badge-textt">100% Recyclable Materials</span>
                  </div>
                  <div className="eco-badge">
                    <span className="badge-textt">Zero Waste Manufacturing</span>
                  </div>
                </div>
                
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
                    <div className="icon-background durability-bg"><div className="feature-icone">D</div></div>
                    
                  </div>
                  <div className="header-text">
                    <h3 className="card-title">Built for Longevity</h3>
                    <p className="card-subtitle">25+ Years of Reliable Performance</p>
                  </div>
                </div>
                
                <div className="durability-showcase">
                  <div className="lifespan-visual">
                    <div className="timeline-container">
                      <div className="timeline-track"></div>
                      <div className="timeline-progress"></div>
                      <div className="timeline-points">
                        <div className="time-point active" data-year="5Y"></div>
                        <div className="time-point active" data-year="10Y"></div>
                        <div className="time-point active" data-year="15Y"></div>
                        <div className="time-point active" data-year="20Y"></div>
                        <div className="time-point highlighted" data-year="25Y+"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="durability-stats">
                    <div className="stat-group">
                      <div className="stat-item">
                        <span className="stat-number">25+</span>
                        <span className="stat-label">Years Warranty</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">99.9%</span>
                        <span className="stat-label">Reliability</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">IP67</span>
                        <span className="stat-label">Protection Rating</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="card-description">
                  Rigorously tested for extreme weather conditions, featuring 
                  premium-grade components and advanced protective systems 
                  for unmatched long-term reliability.
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
<Benefits/>
<Modal/>
<Faq/>
<Catalog/>
    </>
  );
}

export default LithiumIonInverter;