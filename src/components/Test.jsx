import React from "react";

const Test = () => {
  return (
    <div className="test-container">
      <style>{`
        .test-container {
          display: flex;
          font-family: 'Inter', sans-serif;
          background: #f9fafb;
          padding: 20px;
        }
        /* Sidebar */
        .sidebar {
          width: 250px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          padding: 20px;
          margin-right: 20px;
        }
        .sidebar h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #111827;
        }
        .clear-all {
          color: #3b82f6;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 15px;
          display: inline-block;
        }
        .filter-group {
          margin-bottom: 20px;
        }
        .filter-group h4 {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 10px;
          color: #374151;
        }
        .filter-option {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        .filter-option input {
          margin-right: 10px;
        }
        .filter-option label {
          font-size: 14px;
          color: #374151;
        }

        /* Main Content */
        .main-content {
          flex: 1;
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .main-header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }
        .sort-select {
          padding: 6px 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: #fff;
          color: #374151;
        }

        /* Product Grid */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .product-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.1);
          padding: 15px;
          display: flex;
          flex-direction: column;
        }
        .product-badge {
          position: relative;
        }
        .discount {
          position: absolute;
          top: 0;
          left: 0;
          background: #ef4444;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px 0 4px 0;
        }
        .warranty {
          position: absolute;
          top: 0;
          right: 0;
          background: #7c3aed;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 0 4px 0 4px;
        }
        .product-img {
          width: 100%;
          height: 150px;
          object-fit: contain;
          margin-top: 30px;
        }
        .product-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 10px 0;
          min-height: 40px;
        }
        .price {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
        }
        .old-price {
          font-size: 13px;
          color: #9ca3af;
          text-decoration: line-through;
          margin-left: 8px;
        }
        .product-desc {
          font-size: 13px;
          color: #374151;
          margin: 8px 0;
        }
        .cart-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .add-btn {
          background: #6366f1;
          color: #fff;
          font-size: 14px;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .qty-box {
          display: flex;
          align-items: center;
        }
        .qty-box button {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          width: 28px;
          height: 28px;
          cursor: pointer;
          border-radius: 4px;
        }
        .qty-box input {
          width: 35px;
          text-align: center;
          border: 1px solid #d1d5db;
          margin: 0 5px;
          border-radius: 4px;
          height: 28px;
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <h3>Filters</h3>
        <span className="clear-all">Clear All</span>

        <div className="filter-group">
          <h4>Category</h4>
          <div className="filter-option">
            <input type="radio" name="cat" defaultChecked />
            <label>All Products (6)</label>
          </div>
          <div className="filter-option">
            <input type="radio" name="cat" />
            <label>1100VA (3)</label>
          </div>
          <div className="filter-option">
            <input type="radio" name="cat" />
            <label>2100VA (3)</label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="main-header">
          <h2>All Products <span style={{fontWeight:"400", fontSize:"14px"}}>6 products found</span></h2>
          <select className="sort-select">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="product-grid">
          {[1,2,3].map((item, i)=>(
            <div className="product-card" key={i}>
              <div className="product-badge">
                <span className="discount">52% OFF</span>
                <span className="warranty">{i+3}-year Warranty</span>
                <img
                  src="https://via.placeholder.com/150x150.png?text=Product"
                  alt="product"
                  className="product-img"
                />
              </div>
              <div className="product-title">Finike Lithium 1100 VA Inverter</div>
              <div>
                <span className="price">₹27,999</span>
                <span className="old-price">₹58,331</span>
              </div>
              <div className="product-desc">
                ✅ 1280Wh LiFePO4 Lithium Battery with Smart BMS – Safe, reliable, advanced protection.
              </div>
              <div className="cart-actions">
                <button className="add-btn">Add to Cart</button>
                <div className="qty-box">
                  <button>-</button>
                  <input type="text" value="0" readOnly />
                  <button>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;
