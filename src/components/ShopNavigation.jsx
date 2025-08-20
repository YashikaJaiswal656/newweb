import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ShopNavigation.css';

const ShopNavigation = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const navigationSections = [
    {
      id: 'products',
      title: 'Our Products',
      icon: '🔋',
      color: '#3b82f6',
      items: [
        {
          name: 'ESS Batteries',
          description: 'Energy Storage System batteries for homes and businesses',
          link: '/ess-batteries',
          icon: '🏠',
          features: ['Long Life', 'High Capacity', 'Smart BMS']
        },
        {
          name: 'Lithium-Ion Batteries',
          description: 'Two/Three Wheeler batteries with advanced technology',
          link: '/lithiumion-batteries',
          icon: '🏍️',
          features: ['Fast Charging', 'Lightweight', 'Durable']
        },
        {
          name: 'Lithium-Ion Inverter/UPS',
          description: 'Uninterruptible power supply with lithium technology',
          link: '/lithiumion-inverter',
          icon: '⚡',
          features: ['Pure Sine Wave', 'Silent Operation', 'Compact Design']
        },
        {
          name: 'Solar Batteries',
          description: 'Optimized for solar energy storage systems',
          link: '/solar-batteries',
          icon: '☀️',
          features: ['Solar Optimized', 'Deep Cycle', 'Weather Resistant']
        },
        {
          name: 'Telecom Batteries',
          description: 'Reliable power backup for telecom infrastructure',
          link: '/telecom-batteries',
          icon: '📡',
          features: ['High Reliability', '24/7 Operation', 'Remote Monitoring']
        }
      ]
    },
    {
      id: 'services',
      title: 'Services & Support',
      icon: '🛠️',
      color: '#10b981',
      items: [
        {
          name: 'Customer Support',
          description: '24/7 technical assistance and troubleshooting',
          link: '/customer-support',
          icon: '📞',
          features: ['24/7 Support', 'Expert Technicians', 'Remote Assistance']
        },
        {
          name: 'Technical Support',
          description: 'Advanced technical guidance and solutions',
          link: '/technical-support',
          icon: '🔧',
          features: ['Installation Guide', 'Maintenance Tips', 'Troubleshooting']
        },
        {
          name: 'Warranty Registration',
          description: 'Register your products for warranty coverage',
          link: '/warranty',
          icon: '📋',
          features: ['Easy Registration', 'Extended Coverage', 'Quick Claims']
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Solutions',
      icon: '🏢',
      color: '#f59e0b',
      items: [
        {
          name: 'Get Quote',
          description: 'Custom pricing for bulk orders and projects',
          link: '/get-quote',
          icon: '💼',
          features: ['Bulk Pricing', 'Custom Solutions', 'Project Support']
        },
        {
          name: 'About Us',
          description: 'Learn about our company and mission',
          link: '/about-us',
          icon: 'ℹ️',
          features: ['Company History', 'Our Mission', 'Leadership Team']
        },
        {
          name: 'Contact Us',
          description: 'Get in touch with our team',
          link: '/contact-us',
          icon: '📧',
          features: ['Multiple Locations', 'Quick Response', 'Expert Consultation']
        }
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping Categories',
      icon: '🛒',
      color: '#8b5cf6',
      items: [
        {
          name: 'Home Solutions',
          description: 'Power backup solutions for residential use',
          link: '/shop-online?category=home',
          icon: '🏠',
          features: ['Easy Installation', 'Compact Design', 'Silent Operation']
        },
        {
          name: 'Commercial Systems',
          description: 'Enterprise-grade power solutions',
          link: '/shop-online?category=commercial',
          icon: '🏢',
          features: ['High Capacity', 'Scalable', 'Remote Monitoring']
        },
        {
          name: 'Accessories',
          description: 'Cables, connectors, and installation accessories',
          link: '/shop-online?category=accessories',
          icon: '🔧',
          features: ['Quality Components', 'Easy Installation', 'Compatibility']
        },
        {
          name: 'All Products',
          description: 'Browse our complete product catalog',
          link: '/shop-online',
          icon: '📦',
          features: ['Complete Range', 'Latest Products', 'Best Prices']
        }
      ]
    }
  ];

  const handleItemClick = (item) => {
    navigate(item.link);
  };

  return (
    <div className="shop-navigation">
      <div className="shop-nav-container">
        <div className="shop-nav-header">
          <h2 className="shop-nav-title">Explore Our Complete Range</h2>
          <p className="shop-nav-subtitle">
            Discover premium lithium battery solutions, expert services, and comprehensive support
          </p>
        </div>

        <div className="navigation-grid">
          {navigationSections.map((section) => (
            <div key={section.id} className="nav-section">
              <div className="nav-section-header" style={{'--section-color': section.color}}>
                <div className="nav-section-icon">{section.icon}</div>
                <h3 className="nav-section-title">{section.title}</h3>
              </div>
              
              <div className="nav-items-grid">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="nav-item-card"
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredCategory(`${section.id}-${index}`)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="nav-item-header">
                      <div className="nav-item-icon">{item.icon}</div>
                      <h4 className="nav-item-name">{item.name}</h4>
                    </div>
                    
                    <p className="nav-item-description">{item.description}</p>
                    
                    <div className={`nav-item-features ${hoveredCategory === `${section.id}-${index}` ? 'visible' : ''}`}>
                      {item.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="feature-tag">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="nav-item-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopNavigation;
