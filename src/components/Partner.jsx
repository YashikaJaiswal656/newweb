import React from 'react'

const Partner = () => {
  return (
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
            Your Partner in Sustainable Mobility
          </h1>
          <p className="title-description">
            Experience the advantages that set our Lithium Batteries apart
          </p>
        </div>

        {/* Horizontal Flow Layout */}
        <div className="benefits-flow">
          
          {/* Quality - Left Panel */}
          <div className="benefit-panel left-panel">
            <div className="panel-background savings-bg"></div>
            <div className="panel-content">
              <div className="benefit-header">
                <div className="benefit-indicator savings-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-text">
                  <h3 className="benefit-title">Quality</h3>
                  <span className="benefit-subtitle">Premium Build</span>
                </div>
              </div>
              
              <div className="savings-visualization">
                <div className="cost-reduction">
                  <div className="reduction-display">
                    <span className="reduction-number">15</span>
                    <span className="reduction-symbol">+</span>
                  </div>
                  <p className="reduction-text">Years Performance</p>
                </div>
                
                
              </div>
              
              <p className="benefit-text">
                Engineered for reliability and long-lasting performance with premium materials
                and rigorous quality testing standards.
              </p>
            </div>
          </div>

        {/* Bottom Efficiency Section */}
        <div className="durability-section">
          <div className="durability-container">
            <div className="durability-background"></div>
            <div className="durability-content">
              <div className="durability-header">
                <div className="benefit-indicator durability-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-info">
                  <h3 className="benefit-title">Efficiency</h3>
                  <span className="benefit-subtitle">Rapid Charging Technology</span>
                </div>
              </div>
              
              <div className="lifespan-display">
                
                
                <div className="reliability-stats">
                  <div className="reliability-item">
                    <span className="stat-highlight" style={{fontSize:"3.5rem", fontWeight:"100"}}>Fast</span>
                    <span className="stat-desc">Charging Speed</span>
                  </div>
                  
                  
                </div>
              </div>
              
              <p className="durability-text">
                Optimized for rapid charging and high energy output with advanced battery
                management systems for maximum efficiency.
              </p>
            </div>
          </div>
        </div>
          {/* Sustainability - Right Panel */}
          <div className="benefit-panel right-panel">
            <div className="panel-background eco-bg"></div>
            <div className="panel-content">
              <div className="benefit-header">
                <div className="benefit-indicator eco-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-text">
                  <h3 className="benefit-title">Sustainability</h3>
                  <span className="benefit-subtitle">Eco-Friendly Design</span>
                </div>
              </div>
              
              <div className="eco-metrics">
                <div className="metric-group">
                  <div className="metric-item">
                    <div className="metric-value">100</div>
                    <div className="metric-unit">%</div>
                    <div className="metric-label">Recyclable</div>
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
                Eco-friendly design minimizes environmental impact with sustainable materials
                and responsible manufacturing processes.
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

  )
}

export default Partner