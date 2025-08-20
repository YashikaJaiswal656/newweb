import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import '../css/cart.css';

function Checkout({ cart, setCart, validPincodes }) {
  const location = useLocation();
  const { product, pincode: preValidatedPincode } = location.state || {};
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [pincode, setPincode] = useState(preValidatedPincode || '');
  const [pincodeMessage, setPincodeMessage] = useState(
    preValidatedPincode ? `Pincode ${preValidatedPincode} is valid.` : ''
  );
  const [showDetailsForm, setShowDetailsForm] = useState(!!preValidatedPincode);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const isSingleProduct = !!product;
  const total = isSingleProduct ? product?.price || 0 : cartTotal;
  const items = isSingleProduct ? (product ? [{ ...product, quantity: 1 }] : []) : cart;

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (!pincode) {
      setPincodeMessage('Please enter a pincode.');
      return;
    }
    if (validPincodes.includes(pincode)) {
      setPincodeMessage(`Success! Your order is deliverable to ${pincode}.`);
      setShowDetailsForm(true);
    } else {
      setPincodeMessage('Sorry, your order is not deliverable to this pincode.');
      setShowDetailsForm(false);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting details:', customerDetails, items, total); // Debug
    if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      setPincodeMessage('Please fill in all customer details.');
      return;
    }
    if (items.length === 0) {
      setPincodeMessage('No items to checkout.');
      return;
    }
    const itemNames = items.map((item) => `${item.name} (x${item.quantity})`).join(', ');
    alert(
      `Order confirmed! Total: ₹${total.toFixed(2)}\nItems: ${itemNames}\nCustomer: ${
        customerDetails.name
      }\nAddress: ${customerDetails.address}\nPhone: ${customerDetails.phone}`
    );
    if (!isSingleProduct) setCart([]); // Clear cart only for cart-based checkout
    setCustomerDetails({ name: '', address: '', phone: '' });
    setPincode('');
    setPincodeMessage('');
    setShowDetailsForm(false);
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

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

      <main className="buy-now-page">
        <div className="container">
          <div className="buy-now-form">
            <h2>Checkout</h2>
            {items.length > 0 ? (
              <>
                <div className="cart-summary">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-details">
                        <p>{item.name}</p>
                        <p className="price">
                        ₹{item.price.toFixed(2)} x {item.quantity} = ₹
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="cart-total">Total: ₹{total.toFixed(2)}</p>
                </div>
                {!showDetailsForm ? (
                  <form onSubmit={handlePincodeSubmit}>
                    <label htmlFor="pincode">Enter Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g., 160023"
                      required
                    />
                    {pincodeMessage && (
                      <p className={pincodeMessage.includes('Success') ? 'success-message' : 'error-message'}>
                        {pincodeMessage}
                      </p>
                    )}
                    <button type="submit" className="btn btn-buy-now">Check Delivery</button>
                  </form>
                ) : (
                  <form onSubmit={handleDetailsSubmit}>
                    <h3>Enter Your Details</h3>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerDetails.name}
                      onChange={handleDetailsChange}
                      placeholder="Enter your name"
                      required
                    />
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerDetails.address}
                      onChange={handleDetailsChange}
                      placeholder="Enter your address"
                      required
                    />
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleDetailsChange}
                      placeholder="Enter your phone number"
                      required
                    />
                    {pincodeMessage && (
                      <p className="error-message">{pincodeMessage}</p>
                    )}
                    <button type="submit" className="btn btn-buy-now">Confirm Order</button>
                  </form>
                )}
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

export default Checkout;