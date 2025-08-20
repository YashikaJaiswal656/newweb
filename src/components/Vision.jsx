import React, { useState } from 'react';
import '../css/vision.css'
const Vision = () => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <>
      
<div className="experience-hub">

        <div className="cosmic-particle particle-one"></div>
        <div className="cosmic-particle particle-two"></div>
        <div className="cosmic-particle particle-three"></div>
        <div className="cosmic-particle particle-four"></div>
        
        <div className="title-constellation">
          
          <h1 className="main-title">Our Mission & Vision</h1>
          <div className="stellar-divider">
            <div className="divider-beam"></div>
            <div className="divider-star"></div>
            <div className="divider-beam"></div>
          </div>
        </div>
        
        <div className="navigation-sphere">
          <button 
            className={`sphere-button ${activeTab === 'mission' ? 'active' : ''}`}
            onClick={() => setActiveTab('mission')}
          >
            <span className="button-emblem">🎯</span>
            <span className="button-title">Our Mission</span>
          </button>
          
          <button 
            className={`sphere-button ${activeTab === 'vision' ? 'active vision' : ''}`}
            onClick={() => setActiveTab('vision')}
          >
            <span className="button-emblem">🔮</span>
            <span className="button-title">Our Vision</span>
          </button>
        </div>
        
        <div className="dimensional-showcase">
          {activeTab === 'mission' && (
            <div className="reality-panel">
              <div className="content-matrix">
                <div className="narrative-zone">
                  <div className="identity-chip chip-mission">
                    <span className="chip-symbol">🎯</span>
                    <span className="chip-title">Our Mission</span>
                  </div>
                  
                  <div className="quote-chamber">
                    <div className="quote-beacon start">"</div>
                    <div className="message-core">
                      <p>
                        To accelerate the adoption of <span className="accent-blue">clean energy</span> through 
                        advanced lithium-ion battery solutions, empowering businesses and communities with 
                        efficient, sustainable power storage while upholding the highest standards of 
                        <span className="accent-orange">quality, safety, and reliability.</span>
                      </p>
                    </div>
                    <div className="quote-beacon end">"</div>
                  </div>
                  
                  <div className="essence-decoration">
                    <div className="essence-line"></div>
                    <div className="essence-orb"></div>
                    <div className="essence-line"></div>
                  </div>
                </div>
                
                <div className="visual-portal">
                  <div className="portal-frame">
                    <div className="portal-canvas mission-canvas">
                      <img src="https://finikelithium.com/static/media/ourmission.e63469afab54507c70f0.jpeg" alt="Mission" />
                    </div>
                    <div className="portal-aura">
                      <div className="aura-symbol">🎯</div>
                      <p className="aura-caption">Mission Portal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'vision' && (
            <div className="reality-panel">
              <div className="content-matrix reverse">
                <div className="visual-portal">
                  <div className="portal-frame">
                    <div className="portal-canvas vision-canvas">
                      <img src="https://finikelithium.com/static/media/ourvision.0eea947e2277896076fd.jpeg" alt="Vision" />
                    </div>
                    <div className="portal-aura">
                      <div className="aura-symbol">🔮</div>
                      <p className="aura-caption">Vision Portal</p>
                    </div>
                  </div>
                </div>
                
                <div className="narrative-zone">
                  <div className="identity-chip chip-vision">
                    <span className="chip-symbol">🔮</span>
                    <span className="chip-title">Our Vision</span>
                  </div>
                  
                  <div className="quote-chamber">
                    <div className="quote-beacon start">"</div>
                    <div className="message-core">
                      <p>
                        To create a world powered by <span className="accent-orange">renewable energy</span>, 
                        where our advanced battery technologies enable the seamless integration of clean power 
                        into transportation, industry, and daily life—building a 
                        <span className="accent-blue">resilient and sustainable ecosystem.</span>
                      </p>
                    </div>
                    <div className="quote-beacon end">"</div>
                  </div>
                  
                  <div className="essence-decoration">
                    <div className="essence-line"></div>
                    <div className="essence-orb"></div>
                    <div className="essence-line"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        
</div>
    </>
  );
};

export default Vision;