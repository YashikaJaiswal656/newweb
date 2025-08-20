import React from 'react';
import  '../css/benefits.css'
const Benefits = () => {
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
            Transformative
Benefits
          </h1>
          <p className="title-description">
            Experience the advantages that set our solar inverters apart
          </p>
        </div>

        {/* Horizontal Flow Layout */}
        <div className="benefits-flow">
          
          {/* Energy Savings - Left Panel */}
          <div className="benefit-panel left-panel">
            <div className="panel-background savings-bg"></div>
            <div className="panel-content">
              <div className="benefit-header">
                <div className="benefit-indicator savings-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-text">
                  <h3 className="benefit-title">Energy Savings</h3>
                  <span className="benefit-subtitle">Smart Efficiency</span>
                </div>
              </div>
              
              <div className="savings-visualization">
                <div className="cost-reduction">
                  <div className="reduction-display">
                    <span className="reduction-number">40</span>
                    <span className="reduction-symbol">%</span>
                  </div>
                  <p className="reduction-text">Lower Energy Costs</p>
                </div>
                
                
              </div>
              
              <p className="benefit-text">
                Advanced power management reduces consumption while maximizing solar energy utilization, 
                delivering substantial savings on your electricity bills.
              </p>
            </div>
          </div>

        {/* Bottom Durability Section */}
        <div className="durability-section">
          <div className="durability-container">
            <div className="durability-background"></div>
            <div className="durability-content">
              <div className="durability-header">
                <div className="benefit-indicator durability-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-text">
                  <h3 className="benefit-title">Long-Term Reliability</h3>
                  <span className="benefit-subtitle">15+ Years of Performance</span>
                </div>
              </div>
              
              <div className="lifespan-display">
                
                
                <div className="reliability-stats">
                  <div className="reliability-item">
                    <span className="stat-highlight">99.9%</span>
                    <span className="stat-desc">Uptime Reliability</span>
                  </div>
                  
                  
                </div>
              </div>
              
              <p className="durability-text">
                Engineered for longevity with premium components and rigorous testing, 
                ensuring dependable operation for over 15 years with minimal intervention.
              </p>
            </div>
          </div>
        </div>
          {/* Eco Design - Right Panel */}
          <div className="benefit-panel right-panel">
            <div className="panel-background eco-bg"></div>
            <div className="panel-content">
              <div className="benefit-header">
                <div className="benefit-indicator eco-indicator">
                  <div className="indicator-core"></div>
                </div>
                <div className="header-text">
                  <h3 className="benefit-title">Eco-Conscious</h3>
                  <span className="benefit-subtitle">Sustainable Design</span>
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
                Built with environmentally responsible materials and manufacturing processes, 
                ensuring minimal ecological impact throughout the product lifecycle.
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
  );
};

export default Benefits;