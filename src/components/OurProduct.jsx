import React from 'react';
import '../css/ourproduct.css';

const OurProduct = () => {
  const features = [
    "LiFePO4 lithium-ion batteries with a 10–12-year lifespan, free from acid hazards.",
    "Pure sine wave output for reliable and consistent power delivery.",
    "Compact, portable design ideal for home, business, and field use.",
    "Advanced Battery Management System (BMS) ensuring optimal safety and efficiency.",
    "Fast-charging capability with overcharge and deep discharge protection.",
    "Smart monitoring with real-time diagnostics and performance tracking.",
    "Scalable power solutions to meet varying energy demands.",
    "Environmentally friendly technology with zero emissions and recyclable materials.",
    "Quiet operation with minimal maintenance requirements.",
    "Compatible with solar and renewable energy sources for sustainable living."
  ];

  return (
    <section className="our-products-section" style={{opacity:"1"}}>

      <div className="decorative-bg">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      

      <div className="products-container">
        
        <div className="products-header">
          <div className="header-card">
            <div className="header-icon">
              <i className="fas fa-bolt"></i>
            </div>
            <h2 className="gradient-title">Our Products</h2>
          </div>
          
        </div>

        <div className="products-grid">
          
          <div className="product-showcase">
            <div className="showcase-card">
              <div className="product-image-container">
                <div className="image-glow"></div>
                <div className="image-wrapper">
                  <img style={{height:"190px"}}
                    src="https://finikelithium.com/static/media/image.25934904c93b785b058c.jpg"
                    alt="Finike Products"
                    className="product-image"
                  />
                </div>
              </div>
              
              <div className="stats-container">
                <div className="stat-card stat-card-pink">
                  <div className="stat-icon stat-icon-pink">
                    <span>10+</span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-title">Long Lifespan</div>
                    <div className="stat-subtitle">Years of reliable service</div>
                  </div>
                </div>
                
                <div className="stat-card stat-card-blue">
                  <div className="stat-icon stat-icon-blue">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-title">Eco-Friendly</div>
                    <div className="stat-subtitle">Zero emissions technology</div>
                  </div>
                </div>
                <div className="stat-card stat-card-pink">
                  <div className="stat-icon stat-icon-pink">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-title">Stable Power
</div>
                    <div className="stat-subtitle">UPS mode voltage regulation
</div>
                  </div>
                </div>
              
              <div className="cta-section">
                <div className="cta-card">
                  <h4 className="cta-title">Ready to Experience Superior Power?</h4>
                  <p className="cta-subtitle">Discover how Finike lithium batteries can transform your energy needs</p>
                  <button className="cta-button">
                    Explore Our Range
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="features-section">
            <div className="features-card">
              <div className="features-headerr" style={{marginBottom:"0px"}}>
                <div className="features-accent-line"></div>
                <h3>Advanced Features & Benefits</h3>
              </div>
              
              <div className="features-gridd">
                {features.map((feature, index) => (
                  <div key={index} className="feature-itemm" >
                    <div className="feature-content">
                      <div className="feature-iconn">
                        <i className="fas fa-check"></i>
                      </div>
                      <p className="feature-text">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProduct;