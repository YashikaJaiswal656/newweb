import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const products = [
  {
    id: 1,
    name: 'LiFePO4 Battery (EV)',
    description: 'High-efficiency lithium-ion battery for electric vehicles with fast charging and long cycle life.',
    price: 299.99,
    stock: 10,
  },
  {
    id: 2,
    name: 'Lithium-Ion Solar Battery',
    description: 'Eco-friendly battery for solar energy storage, ideal for off-grid and residential use.',
    price: 199.99,
    stock: 5,
  },
  {
    id: 3,
    name: 'Lithium-Ion Inverter',
    description: 'High-performance inverter for stable power supply, compatible with solar and EV systems.',
    price: 149.99,
    stock: 0,
  },
];

const validPincodes = ['140401', '140402', '140403'];

function BuyNow() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(productId));
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedPincode = pincode.trim().replace(/\D/g, ''); 
    console.log('Pincode:', pincode, 'Cleaned:', cleanedPincode, 'Valid:', validPincodes); 
    if (!/^\d{6}$/.test(cleanedPincode)) {
      setMessage('Please enter a valid 6-digit pincode.');
      return;
    }
    if (product.stock === 0) {
      setMessage(`${product.name} is out of stock.`);
      return;
    }
    if (validPincodes.includes(cleanedPincode)) {
      setMessage(`Success! ${product.name} is deliverable to ${cleanedPincode}. Proceeding to checkout.`);
      setTimeout(() => {
        navigate('/checkout', { state: { product, pincode: cleanedPincode } });
      }, 1000);
    } else {
      setMessage('Sorry, this product is not deliverable to your pincode.');
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Allow only digits, max 6
    setPincode(value);
  };

  if (!product) {
    return <div className="container">Product not found.</div>;
  }

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
            <h2>Buy {product.name}</h2>
            <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="pincode">Enter Pincode</label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={handlePincodeChange}
                placeholder="e.g., 140401"
                required
                disabled={product.stock === 0}
              />
              {message && (
                <p className={message.includes('Success') ? 'success-message' : 'error-message'}>
                  {message}
                </p>
              )}
              <button
                type="submit"
                className="btn btn-buy-now"
                disabled={product.stock === 0}
              >
                Check Delivery
              </button>
            </form>
          </div>
        </div>
      </main>

    </div>
  );
}

export default BuyNow;