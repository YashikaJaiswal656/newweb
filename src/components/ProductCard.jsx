import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CartAddIcon, PlusIcon, MinusIcon } from './Icons';
import { RippleEffect, MagneticButton } from './InteractiveAnimations';
import demoimg from '../img/inverter1.jpg';
import '../css/ProductCard.css';

const ProductCard = ({ product, cart, addToCart, updateCartQuantity }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/v1/";
  const price = Number(product.product_price) || 0;
  const discountedPrice = Number(product.product_discountedPrice) || price;
  const discountPercentage = price > discountedPrice && price > 0
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  let features = [];
  try {
    features = typeof product.product_features === 'string'
      ? JSON.parse(product.product_features)
      : Array.isArray(product.product_features)
        ? product.product_features
        : [];
  } catch (error) {
    console.error('Error parsing product features:', error);
    features = [];
  }

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareData = {
      title: product.product_name || 'Product',
      text: `Check out this product: ${product.product_name}`,
      url: `https://finikelithium.com/productDetail/${product.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Product URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing product:', error);
      alert('Failed to share product. URL copied to clipboard.');
      await navigator.clipboard.writeText(shareData.url);
    }
  };

  return (
    <RippleEffect
      className={`card hover-lift ${isHovered ? 'hovered' : ''}`}
      onClick={() => navigate(`/productDetail/${product.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        {discountPercentage > 0 && (
          <span className="card-badge discount" style={{ top: '0.4rem', left: '0.4rem' }}>
            <span className="badge-text">{discountPercentage}%</span>
            <span className="badge-labell">OFF</span>
          </span>
        )}
        {product.product_warranty && (
          <span className="card-badge warranty" style={{ top: discountPercentage > 0 ? '2.4rem' : '0.4rem', left: '0.4rem' }}>
            <span className="badge-text">{product.product_warranty}</span>
            <span className="badge-labell">Warranty</span>
          </span>
        )}
        {product.isNew && (
          <span className="card-badge new" style={{ left: (discountPercentage > 0 || product.product_warranty) ? '3.2rem' : '0.4rem' }}>
            New
          </span>
        )}
        {product.bestSeller && (
          <span className="card-badge bestseller" style={{ left: (discountPercentage > 0 || product.product_warranty) && product.isNew ? '6rem' : (discountPercentage > 0 || product.product_warranty) ? '3.2rem' : '0.4rem' }}>
            Bestseller
          </span>
        )}
        {product.local && (
          <span className="card-badge local" style={{ left: (discountPercentage > 0 || product.product_warranty) && product.isNew && product.bestSeller ? '8.8rem' : (discountPercentage > 0 || product.product_warranty) && (product.isNew || product.bestSeller) ? '6rem' : (discountPercentage > 0 || product.product_warranty) ? '3.2rem' : '0.4rem' }}>
            Made in India
          </span>
        )}
        <img
          src={demoimg}
          alt={product.product_name || 'Product'}
          className={`card-image ${isImageLoaded ? 'loaded' : 'loading'}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
        {product.product_stock <= 5 && product.product_stock > 0 && (
          <div className="card-stock-warning">
            Only {product.product_stock} left!
          </div>
        )}
        {product.product_stock === 0 && (
          <div className="card-stock-warning">
            Out of Stock
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{product.product_name || 'Unknown Product'}</h3>
        <div className="card-price">
          <span className="discounted-price">
            ₹{discountedPrice.toLocaleString('en-IN')}
          </span>
          {discountPercentage > 0 && price > 0 && (
            <span className="original-price">
              ₹{price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <ul className="card-features">
          {features.length > 0 ? (
            features.slice(0, 1).map((feature, index) => (
              <li key={index}>
                <span className="feature-icons">✓</span> {feature}
              </li>
            ))
          ) : (
            <li className="no-features">No features available</li>
          )}
        </ul>
        <div className="card-actions">
          <MagneticButton
            className="add-to-cart-btn"
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            disabled={product.product_stock === 0}
          >
            <CartAddIcon className="btn-icon" />
            {product.product_stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </MagneticButton>
          <RippleEffect
            className="share-btn hover-scale"
            onClick={handleShare}
          >
            <ShareIcon className="btn-icon" />
          </RippleEffect>
        </div>
        <div className="card-quantity-controls">
          <button
            className="quantity-btn"
            onClick={(e) => { e.stopPropagation(); updateCartQuantity(product.id, -1); }}
            disabled={product.product_stock === 0 || !cart.find(item => item.id === product.id)}
          >
            <MinusIcon />
          </button>
          <span className="quantity-display">
            {cart.find(item => item.id === product.id)?.quantity || 0}
          </span>
          <button
            className="quantity-btn"
            onClick={(e) => { 
              e.stopPropagation(); 
              // Only allow increasing quantity if item is already in cart
              const existingItem = cart.find(item => item.id === product.id);
              if (existingItem) {
                updateCartQuantity(product.id, 1);
              }
            }}
            disabled={product.product_stock === 0 || !cart.find(item => item.id === product.id)}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </RippleEffect>
  );
};

const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export default ProductCard;