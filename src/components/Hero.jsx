import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Hero.css';

const ModernHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      icon: "⚡",
      title: "10x Longer Lifespan",
      description: "Advanced lithium technology"
    },
    {
      icon: "🔋",
      title: "70% Faster Charging",
      description: "Quick power restoration"
    },
    {
      icon: "🛡️",
      title: "Zero Maintenance",
      description: "Completely hassle-free"
    },
    {
      icon: "🌱",
      title: "Eco-Friendly",
      description: "Sustainable energy solution"
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    // Rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    navigate('/shop-online');
  };

  const handleGetQuote = () => {
    navigate('/get-quote');
  };

  return (
    <div className={`modern-hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-badge">
              <div className="live-dot"></div>
              <span>2,847+ customers shopping now</span>
            </div>
            <div className="trust-badge">
              <span>⭐ 4.9/5 Rating</span>
            </div>
            <div className="trust-badge">
              <span>🏆 #1 in India</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            <span className="title-line">Next-Generation</span>
            <span className="title-line gradient-text">Lithium Power</span>
            <span className="title-line">Solutions</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-subtitle">
            Experience revolutionary lithium technology with advanced safety features,
            superior performance, and unmatched reliability for your home and business needs.
          </p>

          {/* Feature Highlights */}
          <div className="feature-highlights">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-item ${index === currentFeature ? 'active' : ''}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="hero-actions">
            <button className="btn-primary" onClick={handleShopNow}>
              <span>🛒 Shop Now</span>
              <div className="btn-shine"></div>
            </button>
            <button className="btn-secondary" onClick={handleGetQuote}>
              <span>📞 Get Quote</span>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5 Years</span>
              <span className="stat-label">Warranty</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="visual-container">
            <div className="battery-animation">
              <div className="battery-outline">
                <div className="battery-level"></div>
                <div className="battery-spark"></div>
              </div>
              <div className="energy-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
            </div>
            <div className="floating-elements">
              <div className="element element-1">⚡</div>
              <div className="element element-2">🔋</div>
              <div className="element element-3">🛡️</div>
              <div className="element element-4">🌱</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;