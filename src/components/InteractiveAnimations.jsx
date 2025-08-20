import React, { useEffect, useState } from 'react';
import '../css/InteractiveAnimations.css';

// Floating particles background
export const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Scroll reveal animation hook
export const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// Magnetic button effect
export const MagneticButton = ({ children, className = '', ...props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <button
      className={`magnetic-button ${className} ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      {...props}
    >
      <span className="magnetic-button-content">{children}</span>
    </button>
  );
};

// Ripple effect component
export const RippleEffect = ({ children, className = '', ...props }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      className={`ripple-container ${className}`}
      onMouseDown={createRipple}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
};

// Parallax scroll component
export const ParallaxElement = ({ children, speed = 0.5, className = '' }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      className={`parallax-element ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
};

// Typewriter effect
export const TypewriterText = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = '',
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <span className={`typewriter-text ${className}`}>
      {displayText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

// Stagger animation for lists
export const StaggeredList = ({ children, staggerDelay = 100, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`staggered-list ${className} ${isVisible ? 'visible' : ''}`}>
      {React.Children.map(children, (child, index) => (
        <div
          className="staggered-item"
          style={{
            animationDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Smooth counter animation
export const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  start = 0, 
  className = '',
  prefix = '',
  suffix = '' 
}) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, start]);

  return (
    <span className={`animated-counter ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Loading dots animation
export const LoadingDots = ({ className = '' }) => {
  return (
    <div className={`loading-dots ${className}`}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default {
  FloatingParticles,
  useScrollReveal,
  MagneticButton,
  RippleEffect,
  ParallaxElement,
  TypewriterText,
  StaggeredList,
  AnimatedCounter,
  LoadingDots,
};
