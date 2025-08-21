import React, { useState } from 'react';
import '../css/features.css';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    "User friendly Wide LCD display for battery user interface.",
    "Smart Load sharing compatibility.",
    "No humming Noise (Silent UPS).",
    "indication with buzzer as well as display on LCD available.",
    "Power Saving through No Load Shutdown Feature.",
    "Grid bypass option available.",
    "PV pole reversal protection indication on LCD.",
    "Duel Modes of operation (EC/SC/NC)."
    
    
    
  ];

  const capacities = ["2.5KVA", "3 KVA", "3.5 KVA", "5 KVA", "7.5 KVA", "10 KVA"];

  return (
    <section className="features-showcase" style={{opacity:"1"}}>
      <div className="ambient-sphere sphere-1"></div>
      <div className="ambient-sphere sphere-2"></div>
      <div className="ambient-sphere sphere-3"></div>
      <div className="ambient-sphere sphere-4"></div>

      <div className="features-wrapper">

        <div className="features-intro">
          <div className="title-cluster">
            
            <h2 className="features-title">Key Features</h2>
            <div className="subtitle-badge">SALIENT FEATURES</div>
          </div>
        </div>

        <div className="features-grid">
          <div className="features-column left-column">
            {features.slice(0, 4).map((feature, index) => (
              <div 
                key={index}
                className={`feature-bubble ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-glow"></div>
                </div>
                <div className="feature-text">
                  <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
                  <p>{feature}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="center-display">
            <div className="power-display">
              <div className="display-header">
                <div className="status-lights">
                  <div className="light active"></div>
                  <div className="light active"></div>
                  <div className="light"></div>
                </div>
                <span className="display-label">POWER SYSTEM</span>
              </div>
              
              <div className="capacity-showcase">
                <div className="capacity-grid">
                  {capacities.map((capacity, index) => (
                    <div key={index} className="capacity-tile">
                      <div className="capacity-value">{capacity}</div>
                      <div className="capacity-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tech-badges">
                <div className="tech-badge snmp">
                  <span className="badge-icon">🌐</span>
                  <span>SNMP</span>
                </div>
                <div className="tech-badge gprs">
                  <span className="badge-icon">📡</span>
                  <span>GPRS</span>
                </div>
              </div>

              <div className="protocol-note">
                <p>Simple Network Management Protocol</p>
              </div>
            </div>
          </div>

          <div className="features-column right-column">
            {features.slice(4).map((feature, index) => (
              <div 
                key={index + 4}
                className={`feature-bubble ${activeFeature === index + 4 ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index + 4)}
              >
                <div className="feature-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-glow"></div>
                </div>
                <div className="feature-text">
                  <span className="feature-number">{String(index + 5).padStart(2, '0')}</span>
                  <p>{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="features-accent">
          <div className="accent-line"></div>
          <div className="accent-diamond"></div>
          <div className="accent-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Features;