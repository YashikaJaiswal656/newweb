import React from 'react'

const Inverter = () => {
  return (
    <>
    
    <div className="premium-showcase">

      <div className="ambient-orb orb-primary"></div>
      <div className="ambient-orb orb-secondary"></div>
      <div className="ambient-orb orb-accent"></div>
      <div className="ambient-orb orb-subtle"></div>
      
      
      <div className="showcase-container">
        
        <div className="section-header">
          
          <h1 className="main-title">
            Why Choose Our Batteries?
          </h1>
          <div className="heading-decoration">
            <div className="deco-segment"></div>
            <div className="deco-center"></div>
            <div className="deco-segment"></div>
          </div>
          <p className="section-subtitle">
            Engineered for excellence, designed for the future of electric mobility
          </p>
        </div>

        {/* Asymmetric Feature Layout */}
        <div className="features-layout">
          
          {/* Left Column - Stacked Cards */}
          <div className="left-column">
            
            {/* Performance Card */}
            <div className="feature-cardd card-efficiency">
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="durability-header" style={{marginBottom:"1px"}}>
                  <div className="icon-background efficiency-bg"><div className="feature-icon">⚡</div></div>
                  <h3 className="card-title">Superior Performance</h3>
                </div>
                
                <div className="efficiency-metrics">
                  <div className="metric-display">
                    <span className="metric-value">98</span>
                    <span className="metric-unit">%</span>
                  </div>
                  <div className="metric-bar">
                    <div className="bar-fill efficiency-fill"></div>
                  </div>
                  <p className="metric-label">Energy Efficiency</p>
                </div>

              </div>
            </div>

            {/* Eco Card */}
            <div className="feature-cardd card-eco">
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="durability-header" style={{marginBottom:"1px"}}>
                  <div className="icon-background eco-bg"><div className="feature-icon">🌱</div></div>
                  <h3 className="card-title">Eco-Friendly</h3>
                </div>
                
                
                <div className="eco-indicators">
                  <div className="eco-badge">
                    <span className="badge-text">100% Recyclable Materials</span>
                  </div>
                  <div className="eco-badge">
                    <span className="badge-text">Zero Emission Operation</span>
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
                    <div className="icon-background durability-bg"><div className="feature-icon">🔋</div></div>
                    
                  </div>
                  <div className="header-text">
                    <h3 className="card-title" style={{margin:"0px"}}>Extended Range</h3>
                    <p className="card-subtitle">High-Capacity Performance</p>
                  </div>
                </div>
                
                <div className="durability-showcase">
                  <div className="lifespan-visual">
                    <div className="timeline-container">
                      <div className="timeline-track"></div>
                      <div className="timeline-progress"></div>
                      <div className="timeline-points">
                        <div className="time-point active" data-year="100km"></div>
                        <div className="time-point active" data-year="200km"></div>
                        <div className="time-point active" data-year="300km"></div>
                        <div className="time-point active" data-year="400km"></div>
                        <div className="time-point highlighted" data-year="500km+"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="durability-stats">
                    <div className="stat-group">
                      <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Kilometers Range</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">80%</span>
                        <span className="stat-label">Fast Charge</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">3000+</span>
                        <span className="stat-label">Charge Cycles</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="card-description">
                  High-capacity batteries for fewer charging stops and more travel freedom. Experience the confidence of extended range with our premium energy storage solutions that keep you moving longer.
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
    </>
  )
}

export default Inverter