import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EcommerceBanner.css';
import emibanner from '../img/nocostemi.jpeg';

const EcommerceBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  // Professional e-commerce banners like Amazon/Flipkart
  const banners = [
    {
      id: 1,
      title: "New Arrivals",
      subtitle: "Latest Lithium Technology",
      description: "Experience next-generation lithium batteries with advanced BMS and smart monitoring.",
      buttonText: "Explore",
      buttonLink: "/shop-online",
      backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      textColor: "#ffffff",
      image: "/api/placeholder/600/300",
      offer: "NEW",
      validTill: "Limited Stock"
    },
    {
      id: 2,
      title: "Free Installation",
      subtitle: "Professional Setup at Your Doorstep",
      description: "Get expert installation and 24/7 technical support with every purchase.",
      buttonText: "Learn More",
      buttonLink: "/customer-support",
      backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      textColor: "#ffffff",
      image: "/api/placeholder/600/300",
      offer: "FREE",
      validTill: "Pan India Service"
    },
    {
      id: 3,
      title: "Bulk Orders",
      subtitle: "Special Pricing for Businesses",
      description: "Get wholesale rates and dedicated support for commercial installations.",
      buttonText: "Get Quote",
      buttonLink: "/get-quote",
      backgroundImage: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      textColor: "#ffffff",
      image: "/api/placeholder/600/300",
      offer: "BULK",
      validTill: "Custom Solutions"
    },
    {
      id: 4,
      title: "Easy EMIs",
      subtitle: "Finance Your Purchase",
      description: "Convert your battery purchases into easy monthly installments.",
      buttonText: "Check Plans",
      buttonLink: "/emi-options",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "#ffffff",
      image: emibanner,
      offer: "EMI",
      validTill: "Flexible Tenure",
      showImageOnly: true // Flag to show only image for EMI banner
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleBannerClick = (banner) => {
    if (banner.buttonLink) {
      navigate(banner.buttonLink);
    }
  };

  return (
    <div className="ecommerce-banner">
      <div className="banner-container">
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`banner-slide ${index === currentSlide ? 'active' : ''} ${banner.showImageOnly ? 'image-only-slide' : ''}`}
              style={{ background: banner.backgroundImage }}
            >
              {banner.showImageOnly ? (
                // Show only image for EMI banner
                <div className="image-only-container" onClick={() => handleBannerClick(banner)}>
                  <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="full-banner-image"
                  />
                </div>
              ) : (
                // Show regular banner content for other banners
                <div className="banner-content">
                  <div className="banner-text-section">
                    <div className="banner-offer-badge">
                      <span className="offer-text">{banner.offer}</span>
                      <span className="offer-validity">{banner.validTill}</span>
                    </div>
                    
                    <h1 className="banner-title">{banner.title}</h1>
                    <h2 className="banner-subtitle">{banner.subtitle}</h2>
                    <p className="banner-description">{banner.description}</p>
                    
                    <button 
                      className="banner-cta-button"
                      onClick={() => handleBannerClick(banner)}
                    >
                      {banner.buttonText}
                      <span className="button-arrow">→</span>
                    </button>
                  </div>
                  
                  <div className="banner-image-section">
                    <div className="banner-image-placeholder">
                      <div className="product-showcase">
                        <div className="product-icon">🔋</div>
                        <div className="product-features">
                          <span>✓ 12 Year Life</span>
                          <span>✓ Fast Charging</span>
                          <span>✓ Zero Maintenance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button className="banner-nav prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button className="banner-nav next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="banner-progress">
          <div 
            className="progress-bar"
            style={{
              width: `${((currentSlide + 1) / banners.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EcommerceBanner;