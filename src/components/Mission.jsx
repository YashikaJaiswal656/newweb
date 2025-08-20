import React from 'react';
import "../css/mission.css"
const Mission = () => {
  return (
    <>
      <section className="mission-container" style={{opacity:"1"}}>
        
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        
        <div className="mission-content">
          
          <div className="mission-header">
            <div className="icon-wrapper">
              <i className="fas fa-bolt main-icon"></i>
            </div>
            <h1 className="main-title">Mission & Vision</h1>
          </div>
          
          
          <div className="quote-section">
            <div className="quote-mark">"</div>
            <p className="mission-quote">
              Partnering to deliver innovative energy solutions 
              <span className="highlight">for a sustainable planet</span>
            </p>
            <div className="quote-mark closing">"</div>
          </div>
          
          <div className="decorative-line">
            <div className="line-segment"></div>
            <div className="line-dot"></div>
            <div className="line-segment"></div>
          </div>
        </div>
        
      </section>
      
      
    </>
  );
};

export default Mission;

