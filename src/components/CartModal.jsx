import React, { useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import demoimg from '../img/finike_lithium_resized.jpg';
import '../css/CartModal.css';

const CartModal = ({ cart = [], setCart }) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const navigate = useNavigate();

  const updateCartQuantity = (productId, change) => {
    const item = cart.find((item) => item.id === productId);
    if (!item) return;

    const newQuantity = (item.quantity || 1) + change;

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (newQuantity > (item.product_stock || 0)) {
      alert(`Cannot add more ${item.product_name || 'item'}. Only ${item.product_stock || 0} in stock!`);
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

  const calculateSubtotal = () => {
    return cart.reduce(
      (sum, item) =>
        sum + (Number(item.product_discountedPrice) || 0) * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="cart-container">
      {/* Header */}
      <header className="cart-header">
        <div className="header-content">
          <div className="header-left">
            <button
              className="back-button"
              onClick={() => navigate('/')}
              aria-label="Back to home"
            >
              <ArrowLeft className="icon-small" />
            </button>
            <div className="header-info">
              <div className="logo-container">
                <ShoppingBag className="logo-icon" />
              </div>
              <div className="header-text">
                <h1 className="header-title">Your Shopping Cart</h1>
                
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Cart Items */}
          <div className="cart-section">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <ShoppingBag className="empty-icon" />
                </div>
                <h2 className="empty-cart-title">Your cart is empty</h2>
                <p className="empty-cart-text">
                  You have no items in your cart. Start adding items to your cart.
                </p>
                <Link to="/shop-online" className="continue-shopping-button">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="cart-card">
                <div className="cart-header-section">
                  <h2 className="cart-title">Cart Items</h2>
                  <p className="cart-subtitle">
                    Review your items before proceeding to checkout
                  </p>
                </div>
                <div className="cart-content">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img
                          src={item.image || demoimg}
                          alt={item.product_name || 'Product'}
                          className="item-img"
                        />
                      </div>
                      <div className="item-details">
                        <h3 className="item-name">
                          {item.product_name || 'Unknown Product'}
                        </h3>
                        <p className="item-stock">
                          {(item.product_stock || 0) > 0
                            ? `In Stock: ${item.product_stock} available`
                            : 'Out of Stock'}
                        </p>
                        <p className="item-price">
                          ₹{(Number(item.product_discountedPrice) || 0).toLocaleString('en-IN')} ×{' '}
                          {item.quantity || 1}
                        </p>
                        <div className="item-controls">
                          <div className="quantity-selector">
                            <button
                              className="quantity-button"
                              onClick={() => updateCartQuantity(item.id, -1)}
                              aria-label={`Decrease quantity of ${item.product_name || 'item'}`}
                            >
                              <Minus className="icon-small" />
                            </button>
                            <span className="quantity">{item.quantity || 1}</span>
                            <button
                              className="quantity-button"
                              onClick={() => updateCartQuantity(item.id, 1)}
                              disabled={(item.quantity || 1) >= (item.product_stock || 0)}
                              aria-label={`Increase quantity of ${item.product_name || 'item'}`}
                            >
                              <Plus className="icon-small" />
                            </button>
                          </div>
                          <button
                            className="remove-button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.product_name || 'item'} from cart`}
                          >
                            <Trash2 className="icon-small" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                      <div className="item-subtotal">
                        <span>
                          ₹{((Number(item.product_discountedPrice) || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="summary-section">
            <div className="summary-sticky">
              <div className="summary-card">
                <div className="summary-header">
                  <h2 className="summary-title">Order Summary</h2>
                  <p className="summary-subtitle">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
                <div className="summary-content">
                  {cart.length === 0 ? (
                    <div className="empty-summary">
                      <p className="empty-summary-text">
                        Your cart is empty. Add items to see the order summary.
                      </p>
                      <Link to="/shop-online" className="continue-shopping-link">
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="summary-totals">
                        <div className="total-row">
                          <span>Subtotal</span>
                          <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                        </div>
                        <div className="total-row">
                          <span>Shipping</span>
                          <span className="free-shipping">Free</span>
                        </div>
                        <div className="total-row total-final">
                          <span>Total</span>
                          <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <button
                        className="checkout-button"
                        onClick={() => navigate('/checkout')}
                        aria-label="Proceed to checkout"
                        disabled={cart.length === 0}
                      >
                        Proceed to Checkout
                      </button>
                      <Link to="/shop-online" className="continue-shopping-link">
                        Continue Shopping
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;