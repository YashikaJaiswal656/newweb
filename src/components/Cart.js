import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';


function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="container header-content">
          <h1>Finike Lithium Store</h1>
          <div className="header-nav">
            <Link to="/shop-online" className="btn btn-add-cart">Back to Shop</Link>
          </div>
        </div>
      </header>

      <main className="cart-page">
        <div className="container">
          <div className="cart-summary">
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <p>{item.name}</p>
                      <p className="price">
                      ₹{item.price.toFixed(2)} x {item.quantity} = ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn-remove"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <p className="cart-total">Total: ₹{cartTotal.toFixed(2)}</p>
                <Link to="/checkout" className="btn btn-buy-now">
                  Buy Now
                </Link>
              </>
            ) : (
              <p className="empty-cart">Your cart is empty.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;