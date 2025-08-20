import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CategoryNav.css';

const CategoryNav = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Lithium Batteries",
      icon: "🔋",
      description: "High-performance lithium batteries",
      link: "/shop-online?category=batteries",
      color: "#3b82f6"
    },
    {
      id: 2,
      name: "Solar Inverters",
      icon: "☀️",
      description: "Efficient solar power inverters",
      link: "/shop-online?category=inverters",
      color: "#f59e0b"
    },
    {
      id: 3,
      name: "UPS Systems",
      icon: "⚡",
      description: "Uninterruptible power supply",
      link: "/shop-online?category=ups",
      color: "#10b981"
    },
    {
      id: 4,
      name: "Accessories",
      icon: "🔧",
      description: "Cables, connectors & more",
      link: "/shop-online?category=accessories",
      color: "#8b5cf6"
    },
    {
      id: 5,
      name: "Commercial",
      icon: "🏢",
      description: "Enterprise solutions",
      link: "/shop-online?category=commercial",
      color: "#ef4444"
    },
    {
      id: 6,
      name: "Home Solutions",
      icon: "🏠",
      description: "Residential power backup",
      link: "/shop-online?category=home",
      color: "#06b6d4"
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(category.link);
  };

  return (
    <div className="category-nav">
      <div className="category-container">
        <h3 className="category-title">Shop by Category</h3>
        <div className="category-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
              style={{ '--category-color': category.color }}
            >
              <div className="category-icon">{category.icon}</div>
              <h4 className="category-name">{category.name}</h4>
              <p className="category-description">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
