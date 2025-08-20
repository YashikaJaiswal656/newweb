import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Filter } from './Icons';
import '../css/Sidebar.css';


const FilterSection = ({ title, expanded, onToggle, children }) => {
  return (
    <div className="filter-section">
      <button className="filter-section-button" onClick={onToggle}>
        <span className="filter-section-title">{title}</span>
        <span className={`filter-section-icon ${expanded ? 'expanded' : 'collapsed'}`}>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      <div className={`filter-section-content ${expanded ? 'expanded' : 'collapsed'}`}>
        <div className="filter-section-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({
  setSearchQuery,
  setSelectedCategory,
  setFilters,
  selectedCategory,
  filters,
  categories,
  priceRanges,
  capacities,
  warranties,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    capacity: false,
    warranty: false,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      capacities: [],
      batteryTypes: [],
      warranties: [],
      priceRanges: [],
      rating: 0,
      inStock: false,
      madeInIndia: false,
    });
    setSelectedCategory('all');
    setSearchQuery('');
  };



  return (
    <>
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="mobile-filter-toggle"
      >
        <Filter />
      </button>
      <aside
        className={showMobileFilters ? 'sidebar-mobile' : 'sidebar'}
        style={{ display: isMobile && !showMobileFilters ? 'none' : 'block' }}
      >
        {showMobileFilters && (
          <div className="sidebar-header">
            <h2 className="sidebar-title">Filters</h2>
            <button className="sidebar-close" onClick={() => setShowMobileFilters(false)}>
              <X />
            </button>
          </div>
        )}
        <div className="filters-container">
          <div className="filters-header">
            <h2 className="filters-title">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="clear-filters"
            >
              Clear All
            </button>
          </div>
          <FilterSection title="Category" expanded={expandedSections.category} onToggle={() => toggleSection('category')}>
            {categories.map((category) => (
              <label key={category.id} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={() => setSelectedCategory(category.id)}
                />
                <span className="filter-option-text">{category.name}</span>
                <span className="filter-option-count">({category.count})</span>
              </label>
            ))}
          </FilterSection>
         {/* <FilterSection title="Price Ranges" expanded={expandedSections.price} onToggle={() => toggleSection('price')}>
            {priceRanges.map((range) => (
              <label key={range.id} className="filter-option">
                <input
                  type="checkbox"
                  value={range.id}
                  checked={filters.priceRanges.includes(range.id)}
                  onChange={() => updateFilter('priceRanges', range.id)}
                />
                <span className="filter-option-text">{range.name}</span>
                <span className="filter-option-count">({range.count})</span>
              </label>
            ))}
          </FilterSection>*/}
          <FilterSection title="Capacity" expanded={expandedSections.capacity} onToggle={() => toggleSection('capacity')}>
            {capacities.map((cap) => (
              <label key={cap.id} className="filter-option">
                <input
                  type="checkbox"
                  value={cap.id}
                  checked={filters.capacities.includes(cap.id)}
                  onChange={() => updateFilter('capacities', cap.id)}
                />
                <span className="filter-option-text">{cap.name}</span>
                <span className="filter-option-count">({cap.count})</span>
              </label>
            ))}
          </FilterSection>
          <FilterSection title="Warranty" expanded={expandedSections.warranty} onToggle={() => toggleSection('warranty')}>
            {warranties.map((warr) => (
              <label key={warr.id} className="filter-option">
                <input
                  type="checkbox"
                  value={warr.id}
                  checked={filters.warranties.includes(warr.id)}
                  onChange={() => updateFilter('warranties', warr.id)}
                />
                <span className="filter-option-text">{warr.name}</span>
                <span className="filter-option-count">({warr.count})</span>
              </label>
            ))}
          </FilterSection>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;