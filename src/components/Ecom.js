import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Cartheader';
import ProductList from './ProductList';
import EcommerceBanner from './EcommerceBanner';
import { ProductGridSkeleton, HeaderSkeleton } from './SkeletonLoader';
import '../css/ecom.css';

function Ecom({ cart, setCart }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shoppingCount, setShoppingCount] = useState(2847);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Real-time shopping counter with realistic fluctuations
  useEffect(() => {
    // Get stored count from localStorage or start with base count
    const storedCount = localStorage.getItem('shoppingCount');
    const baseCount = storedCount ? parseInt(storedCount) : 2847;
    setShoppingCount(baseCount);

    // Simulate real-time increases and decreases
    const interval = setInterval(() => {
      setShoppingCount(prevCount => {
        // 50% chance to change count
        const shouldChange = Math.random() > 0.5;
        if (shouldChange) {
          // 70% chance to increase, 30% chance to decrease
          const isIncrease = Math.random() > 0.3;
          const change = Math.floor(Math.random() * 5) + 1; // Change by 1-5
          const newCount = isIncrease ? prevCount + change : Math.max(1000, prevCount - change); // Prevent dropping below 1000
          localStorage.setItem('shoppingCount', newCount.toString());
          return newCount;
        }
        return prevCount;
      });
    }, Math.random() * 15000 + 10000); // Random interval between 10-25 seconds

    // Add visitor count on page load
    const addVisitor = () => {
      setShoppingCount(prevCount => {
        const newCount = prevCount + Math.floor(Math.random() * 3) + 1; // Add 1-3 visitors
        localStorage.setItem('shoppingCount', newCount.toString());
        return newCount;
      });
    };

    // Add visitor after 2-5 seconds
    const visitorTimer = setTimeout(addVisitor, Math.random() * 3000 + 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(visitorTimer);
    };
  }, []);

  const addToCart = (product, quantity = 1) => {
    if (product.product_stock === 0) {
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.product_stock) {
        return;
      }
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      if (quantity > product.product_stock) {
        return;
      }
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateCartQuantity = (productId, change) => {
    const product = cart.find((p) => p.id === productId);
    if (!product) return;

    const newQuantity = product.quantity + change;

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (newQuantity > product.product_stock) {
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Enhanced loading states
  const [headerLoading, setHeaderLoading] = useState(true);

  useEffect(() => {
    // Simulate header loading
    const headerTimer = setTimeout(() => setHeaderLoading(false), 500);
    return () => clearTimeout(headerTimer);
  }, []);

  return (
    <div className="ecom-container">
      {headerLoading ? <HeaderSkeleton /> : <Header cart={cart} />}

      {/* E-commerce Style Banner */}
      <EcommerceBanner />

      {/* Row 1: Trust Indicators */}
      <div className="trust-indicators-row">
        <div className="trust-indicators-container">
 
          <div className="trust-badge trusted">
            <span>📈 #1 Trending Product</span>
          </div>
          <div className="trust-badge trusted">
            <span>🏆 Trusted by 10K+ Customers</span>
          </div>
        </div>
      </div>

      {/* Row 2: Main Title and Description */}
      <div className="hero-content-row">
        <div className="hero-content-container">
          <h1 className="main-hero-title">Next-Gen Lithium Power Solutions for Modern Homes</h1>
          <p className="main-hero-subtitle">
            Experience revolutionary lithium technology with 10x longer lifespan, 70% faster charging,
            and completely maintenance-free operation. Perfect for homes and businesses.
          </p>
        </div>
      </div>

      {/* Row 3: Products with Filters */}
      <div className="products-row">
        <div className="products-row-container">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <ProductList
              cart={cart}
              addToCart={addToCart}
              updateCartQuantity={updateCartQuantity}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Ecom;