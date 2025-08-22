import React from 'react'
import '../css/wrap.css'
const Wrap = () => {
  return (
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
            <span className="tag-label">ABOUT US</span>
            <span className="tag-icon">◆</span>
          </div>
          
          <h2 className="main-title">
            Finike Lithium
          </h2>
          
          <div className="story-block">
            <div className="paragraph-marker"></div>
            <p className="narrative-text">
              We are pioneers in advanced lithium-ion battery technology, delivering 
              high-performance energy storage solutions for EVs, solar systems, and 
              industrial applications.
            </p>
          </div>
          
          <div className="story-block">
            <div className="paragraph-marker"></div>
            <p className="narrative-text">
              Headquartered in Chandigarh with manufacturing in Punjab and nationwide 
              presence, we drive innovation and sustainability. Our reliable, efficient 
              batteries support the global transition to clean energy by reducing carbon 
              emissions and <span className="emphasis-text">powering a greener future</span>.
            </p>
          </div>
          

        </div>
      </div>
      
    </div>
  );
};
export default Wrap;