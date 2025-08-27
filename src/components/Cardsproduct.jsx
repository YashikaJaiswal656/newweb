import React, { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart, Share2, Heart, Shield, Battery, Zap } from 'lucide-react';
import '../css/cardsproduct.css'

const Cardsproduct = ({ cart, setCart }) => {
  const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  
  const products = [
    {
      id: 1,
      name: "Finike Lithium 1100 VA Inverter",
      warranty: "3-year warranty",
      discount: "52% OFF",
      currentPrice: 27999,
      originalPrice: 50331,
      rating: 4.5,
      reviews: 128,
      features: [
        "1280Wh LiFePO4 Lithium Battery with Smart BMS  Delivers safe, reliable power with advanced Battery Management System Enhanced protection with In-built UPS mode Option"
      ],
      image: "https://finikelithium.com/static/media/inverter1.35ddb3c7941598e9edaa.jpg",
      inStock: true,
      fastDelivery: true
    },
    {
      id: 2,
      name: "Finike Lithium 1100 VA Inverter",
      warranty: "4-year warranty",
      discount: "54% OFF",
      currentPrice: 28999,
      originalPrice: 60831,
      rating: 4.6,
      reviews: 156,
      features: [
        "1280Wh LiFePO4 Lithium Battery with Smart BMS Delivers safe, reliable power with advanced Battery Management System Enhanced protection with In-built UPS mode Option"
      ],
      image: "https://finikelithium.com/static/media/inverter1.35ddb3c7941598e9edaa.jpg",
      inStock: true,
      fastDelivery: true
    },
    {
      id: 3,
      name: "Finike Lithium 1100 VA Inverter",
      warranty: "5-year warranty",
      discount: "51% OFF",
      currentPrice: 29499,
      originalPrice: 59831,
      rating: 4.7,
      reviews: 89,
      features: [
        "1280Wh LiFePO4 Lithium Battery with Smart BMSDelivers safe, reliable power with advanced Battery Management System Enhanced protection with In-built UPS mode Option"
      ],
      image: "https://finikelithium.com/static/media/inverter1.35ddb3c7941598e9edaa.jpg",
      inStock: true,
      fastDelivery: true
    },{
      id: 4,
      name: "Finike Lithium 1100 VA Inverter",
      warranty: "5-year warranty",
      discount: "51% OFF",
      currentPrice: 29499,
      originalPrice: 59831,
      rating: 4.7,
      reviews: 89,
      features: [
        "1280Wh LiFePO4 Lithium Battery with Smart BMSDelivers safe, reliable power with advanced Battery Management System Enhanced protection with In-built UPS mode Option"
      ],
      image: "https://finikelithium.com/static/media/inverter1.35ddb3c7941598e9edaa.jpg",
      inStock: true,
      fastDelivery: true
    }
  ];
const handleAddToCart = (product) => {
  const quantityToAdd = getQuantity(product.id);

  setCart((prevCart) => {
    const existing = prevCart.find((item) => item.id === product.id);
    if (existing) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    }
    return [
      ...prevCart,
      {
        ...product,
        product_name: product.name,                   
        product_discountedPrice: product.currentPrice,
        product_stock: 10,                            
        quantity: quantityToAdd,
      },
    ];
  });
};


  const updateQuantity = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 1) + change)
    }));
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const getQuantity = (productId) => quantities[productId] || 1;

  return (
    <section className="products-showcase" style={{opacity:"1"}}>
      <div className="ambient-sphere sphere-1"></div>
      <div className="ambient-sphere sphere-2"></div>
      <div className="ambient-sphere sphere-3"></div>

      <div className="products-container">
        <div className="products-header">
          
          <h2 className="products-title">Supported Accessories</h2>
          <p className="products-subtitle">
            Discover our range of advanced lithium inverters with cutting-edge technology
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              

              <div className="product-image">
                <div className="image-placeholder">
                  <img src={product.image} alt="" srcset="" />
                </div>
                {product.fastDelivery && (
                  <div className="delivery-badge">
                    <Zap size={12} />
                    Fast Delivery
                  </div>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                
                
                  <span className="current-price">₹{product.currentPrice.toLocaleString()}</span>
                  <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                

                <div className="features-list" style={{marginBottom:"10px"}}>
                  {product.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-dot">✓</span>
                      <span className="feature-textt">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="product-actions">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, -1)}
                      disabled={getQuantity(product.id) <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-display">{getQuantity(product.id)}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
  Add to Cart
</button>


                  <button className="share-btn">
                    <Share2 size={16} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cardsproduct;