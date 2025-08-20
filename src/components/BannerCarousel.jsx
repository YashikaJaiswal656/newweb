import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/BannerCarousel.css';

const BannerCarousel = ({ banners = [], autoRotate = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Filter active banners
  const activeBanners = banners.filter(banner => banner.isActive);

  // Auto-rotate banners
  useEffect(() => {
    if (autoRotate && activeBanners.length > 1) {
      const timer = setInterval(() => {
        nextBanner();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoRotate, activeBanners.length, interval, currentIndex]);

  const nextBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToBanner = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleBannerClick = (banner) => {
    if (banner.link) {
      if (banner.link.startsWith('http')) {
        window.open(banner.link, '_blank');
      } else {
        navigate(banner.link);
      }
    }
    if (banner.onClick) {
      banner.onClick();
    }
  };

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  return (
    <div className="banner-carousel">
      <div 
        className={`banner-slide ${isAnimating ? 'animating' : ''}`}
        style={{
          background: currentBanner.bgColor || currentBanner.backgroundColor,
          color: currentBanner.textColor || '#ffffff'
        }}
        onClick={() => handleBannerClick(currentBanner)}
      >
        <div className="banner-content">
          {currentBanner.icon && (
            <span className="banner-icon">{currentBanner.icon}</span>
          )}
          <span className="banner-text">{currentBanner.text}</span>
          {currentBanner.cta && (
            <span className="banner-cta">{currentBanner.cta}</span>
          )}
        </div>

        {/* Navigation Controls */}
        {activeBanners.length > 1 && (
          <>
            <button 
              className="banner-nav prev" 
              onClick={(e) => {
                e.stopPropagation();
                prevBanner();
              }}
              aria-label="Previous banner"
            >
              ‹
            </button>
            <button 
              className="banner-nav next" 
              onClick={(e) => {
                e.stopPropagation();
                nextBanner();
              }}
              aria-label="Next banner"
            >
              ›
            </button>
          </>
        )}

        {/* Indicators */}
        {activeBanners.length > 1 && (
          <div className="banner-indicators">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                className={`banner-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToBanner(index);
                }}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {autoRotate && activeBanners.length > 1 && (
          <div className="banner-progress">
            <div 
              className="banner-progress-bar"
              style={{
                animationDuration: `${interval}ms`,
                animationPlayState: isAnimating ? 'paused' : 'running'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Default banner configurations
export const defaultBanners = [
 
];

export default BannerCarousel;
