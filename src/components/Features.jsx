import React, { useState } from 'react';
import '../css/features.css';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    "User friendly Wide LCD display for battery user interface.",
    "Smart Load sharing compatibility.",
    "No humming Noise (Silent UPS).",
    "Indication with buzzer as well as display on LCD available.",
    "Power Saving through No Load Shutdown Feature.",
    "Grid bypass option available.",
    "PV pole reversal protection indication on LCD.",
    "Dual Modes of operation (EC/SC/NC)."
  ];

  const capacities = ["2.5KVA", "3 KVA", "3.5 KVA", "5 KVA", "7.5 KVA", "10 KVA"];

  return (
    <section className="features-showcase">
      <div className="ambient-sphere sphere-1"></div>
      <div className="ambient-sphere sphere-2"></div>

      <div className="features-container">
        <div className="features-header">
          
          <h2 className="features-title">Key Features</h2>
        </div>

        <div className="features-main">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className='feature-itemm'
              >
                <div className="feature-index">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="feature-text">
                  <p>{feature}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="capacity-section">
            <div className="capacity-header">
              <h3>Power Capacities</h3>
              <div className="status-dot"></div>
            </div>
            
            <div className="capacity-grid">
              {capacities.map((capacity, index) => (
                <div key={index} className="capacity-item">
                  <span>{capacity}</span>
                </div>
              ))}
            </div>

            <div className="protocols">
              <div className="protocol">
                <span className="protocol-icon">🌐</span>
                <span>SNMP</span>
              </div>
              <div className="protocol">
                <span className="protocol-icon">📡</span>
                <span>GPRS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;