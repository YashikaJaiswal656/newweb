import React from 'react';
import '../css/SkeletonLoader.css';

// Base Skeleton Component
const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px', 
  className = '',
  animation = 'wave'
}) => (
  <div 
    className={`skeleton skeleton-${animation} ${className}`}
    style={{ 
      width, 
      height, 
      borderRadius 
    }}
  />
);

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="product-card-skeleton">
    <div className="skeleton-image-container">
      <Skeleton height="200px" borderRadius="12px" className="skeleton-image" />
      <div className="skeleton-badges">
        <Skeleton width="60px" height="24px" borderRadius="12px" />
        <Skeleton width="80px" height="24px" borderRadius="12px" />
      </div>
    </div>
    <div className="skeleton-content">
      <Skeleton height="24px" className="skeleton-title" />
      <Skeleton width="70%" height="20px" className="skeleton-subtitle" />
      <div className="skeleton-price">
        <Skeleton width="80px" height="28px" borderRadius="6px" />
        <Skeleton width="60px" height="20px" borderRadius="4px" />
      </div>
      <div className="skeleton-features">
        <Skeleton height="16px" />
        <Skeleton width="85%" height="16px" />
      </div>
      <div className="skeleton-actions">
        <Skeleton height="40px" borderRadius="8px" className="skeleton-button" />
        <Skeleton width="40px" height="40px" borderRadius="8px" />
      </div>
    </div>
  </div>
);

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 6 }) => (
  <div className="product-grid-skeleton">
    {[...Array(count)].map((_, index) => (
      <ProductCardSkeleton key={`product-skeleton-${index}`} />
    ))}
  </div>
);

// Header Skeleton
export const HeaderSkeleton = () => (
  <div className="header-skeleton">
    <div className="header-skeleton-content">
      <Skeleton width="120px" height="40px" borderRadius="8px" />
      <Skeleton width="300px" height="44px" borderRadius="12px" className="search-skeleton" />
      <div className="header-actions-skeleton">
        <Skeleton width="80px" height="36px" borderRadius="8px" />
        <Skeleton width="80px" height="36px" borderRadius="8px" />
        <Skeleton width="44px" height="44px" borderRadius="10px" />
      </div>
    </div>
  </div>
);

// Hero Section Skeleton
export const HeroSkeleton = () => (
  <div className="hero-skeleton">
    <div className="hero-skeleton-content">
      <div className="hero-left-skeleton">
        <div className="trust-badges-skeleton">
          <Skeleton width="140px" height="32px" borderRadius="16px" />
          <Skeleton width="120px" height="32px" borderRadius="16px" />
          <Skeleton width="100px" height="32px" borderRadius="16px" />
        </div>
        <div className="hero-title-skeleton">
          <Skeleton height="60px" className="title-line" />
          <Skeleton width="80%" height="60px" className="title-line" />
          <Skeleton width="60%" height="60px" className="title-line" />
        </div>
        <Skeleton width="90%" height="24px" className="hero-subtitle-skeleton" />
        <Skeleton width="75%" height="20px" className="hero-subtitle-skeleton" />
        
        <div className="feature-highlights-skeleton">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="feature-item-skeleton">
              <Skeleton width="48px" height="48px" borderRadius="12px" />
              <div className="feature-text-skeleton">
                <Skeleton width="120px" height="16px" />
                <Skeleton width="100px" height="14px" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="hero-actions-skeleton">
          <Skeleton width="140px" height="48px" borderRadius="12px" />
          <Skeleton width="120px" height="48px" borderRadius="12px" />
        </div>
        
        <div className="hero-stats-skeleton">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="stat-item-skeleton">
              <Skeleton width="60px" height="24px" />
              <Skeleton width="80px" height="16px" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="hero-visual-skeleton">
        <Skeleton width="400px" height="400px" borderRadius="50%" className="hero-visual-main" />
        <div className="floating-elements-skeleton">
          {[...Array(4)].map((_, index) => (
            <Skeleton 
              key={index} 
              width="40px" 
              height="40px" 
              borderRadius="50%" 
              className={`floating-element-${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Cart Item Skeleton
export const CartItemSkeleton = () => (
  <div className="cart-item-skeleton">
    <Skeleton width="80px" height="80px" borderRadius="8px" />
    <div className="cart-item-details-skeleton">
      <Skeleton height="20px" className="item-name-skeleton" />
      <Skeleton width="60%" height="16px" />
      <Skeleton width="40%" height="16px" />
      <div className="cart-controls-skeleton">
        <Skeleton width="32px" height="32px" borderRadius="4px" />
        <Skeleton width="40px" height="20px" />
        <Skeleton width="32px" height="32px" borderRadius="4px" />
      </div>
    </div>
    <Skeleton width="24px" height="24px" borderRadius="4px" />
  </div>
);

// Page Loading Skeleton
export const PageSkeleton = () => (
  <div className="page-skeleton">
    <HeaderSkeleton />
    <HeroSkeleton />
    <div className="content-skeleton">
      <ProductGridSkeleton count={8} />
    </div>
  </div>
);

// Text Skeleton with multiple lines
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`text-skeleton ${className}`}>
    {[...Array(lines)].map((_, index) => (
      <Skeleton 
        key={index}
        height="16px" 
        width={index === lines - 1 ? '70%' : '100%'}
        className="text-line"
      />
    ))}
  </div>
);

// Button Skeleton
export const ButtonSkeleton = ({ width = '120px', height = '40px' }) => (
  <Skeleton width={width} height={height} borderRadius="8px" className="button-skeleton" />
);

// Image Skeleton
export const ImageSkeleton = ({ width = '100%', height = '200px', borderRadius = '8px' }) => (
  <Skeleton width={width} height={height} borderRadius={borderRadius} className="image-skeleton" />
);

// List Item Skeleton
export const ListItemSkeleton = ({ showAvatar = false }) => (
  <div className="list-item-skeleton">
    {showAvatar && <Skeleton width="40px" height="40px" borderRadius="50%" />}
    <div className="list-item-content-skeleton">
      <Skeleton height="18px" />
      <Skeleton width="70%" height="14px" />
    </div>
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 4 }) => (
  <div className="table-row-skeleton">
    {[...Array(columns)].map((_, index) => (
      <Skeleton key={index} height="20px" />
    ))}
  </div>
);

export default Skeleton;
