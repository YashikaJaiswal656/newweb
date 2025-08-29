import React, { useState } from 'react';

const ProductTracking = () => {
  // Sample tracking data - you can replace this with your actual data
  const [trackingData] = useState({
    orderId: "ORD-2024-789123",
    productName: "Lithium Battery Inverter",
    orderDate: "2025-08-29",
    estimatedDelivery: "2025-08-31",
    status: {
      dispatched: { completed: true, date: "2025-08-29", time: "10:30 AM" },
      localShop: { completed: true, date: "2024-08-30", time: "2:15 PM" },
      delivered: { completed: false, date: "", time: "" }
    }
  });

  const getStatusIcon = (completed) => {
    return completed ? "✓" : "○";
  };

  const getStatusClass = (completed) => {
    return completed ? "status-completed" : "status-pending";
  };

  return (
    <div className="tracking-showcase">
      {/* Ambient Background Spheres */}
      <div className="ambient-sphere sphere-1"></div>
      <div className="ambient-sphere sphere-2"></div>
      
      <div className="tracking-container">
        <div className="tracking-header">
          <span className="section-badge">ORDER TRACKING</span>
          <h2 className="tracking-title">Track Your Order</h2>
        </div>

        <div className="tracking-main">
          {/* Order Details Section */}
          <div className="order-details">
            <div className="detail-card">
              <div className="detail-header">
                <h3>Order Details</h3>
                <div className="status-dot"></div>
              </div>
              
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Order ID</span>
                  <span className="detail-value">{trackingData.orderId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Product</span>
                  <span className="detail-value">{trackingData.productName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Order Date</span>
                  <span className="detail-value">{trackingData.orderDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Est. Delivery</span>
                  <span className="detail-value">{trackingData.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Status Section */}
          <div className="status-section">
            <div className="status-card">
              <div className="status-header">
                <h3>Delivery Status</h3>
                <div className="progress-indicator">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{
                      width: trackingData.status.delivered.completed ? '100%' : 
                             trackingData.status.localShop.completed ? '66%' : 
                             trackingData.status.dispatched.completed ? '33%' : '0%'
                    }}></div>
                  </div>
                </div>
              </div>

              <div className="status-timeline">
                {/* Dispatched Status */}
                <div className={`status-item ${getStatusClass(trackingData.status.dispatched.completed)}`}>
                  <div className="status-icon">
                    <span className="status-symbol">{getStatusIcon(trackingData.status.dispatched.completed)}</span>
                  </div>
                  <div className="status-content">
                    <div className="status-title">Product Dispatched</div>
                    <div className="status-description">Your order has been picked up and is on its way</div>
                    {trackingData.status.dispatched.completed && (
                      <div className="status-timestamp">
                        {trackingData.status.dispatched.date} at {trackingData.status.dispatched.time}
                      </div>
                    )}
                  </div>
                </div>

                {/* Local Shop Status */}
                <div className={`status-item ${getStatusClass(trackingData.status.localShop.completed)}`}>
                  <div className="status-icon">
                    <span className="status-symbol">{getStatusIcon(trackingData.status.localShop.completed)}</span>
                  </div>
                  <div className="status-content">
                    <div className="status-title">Reached Local Shop</div>
                    <div className="status-description">Package arrived at your local distribution center</div>
                    {trackingData.status.localShop.completed && (
                      <div className="status-timestamp">
                        {trackingData.status.localShop.date} at {trackingData.status.localShop.time}
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivered Status */}
                <div className={`status-item ${getStatusClass(trackingData.status.delivered.completed)}`}>
                  <div className="status-icon">
                    <span className="status-symbol">{getStatusIcon(trackingData.status.delivered.completed)}</span>
                  </div>
                  <div className="status-content">
                    <div className="status-title">Delivered</div>
                    <div className="status-description">Package delivered to your destination</div>
                    {trackingData.status.delivered.completed && (
                      <div className="status-timestamp">
                        {trackingData.status.delivered.date} at {trackingData.status.delivered.time}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tracking-showcase {
          height: fit-content;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
          position: relative;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          padding: 40px 20px;
          min-height: 100vh;
        }

        .ambient-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.12;
          animation: drift 25s ease-in-out infinite;
        }

        .sphere-1 { 
          top: 15%; 
          right: 10%; 
          width: 250px; 
          height: 250px; 
          background: radial-gradient(circle, #6f86d6, #48c6ef); 
        }

        .sphere-2 { 
          bottom: 15%; 
          left: 10%; 
          width: 200px; 
          height: 200px; 
          background: radial-gradient(circle, #ff758c, #ffb347); 
          animation-delay: 12s; 
        }

        .tracking-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          width: 100%;
        }

        .tracking-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(111, 134, 214, 0.1);
          color: #6f86d6;
          border-radius: 16px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 12px;
          border: 1px solid rgba(111, 134, 214, 0.2);
        }

        .tracking-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: linear-gradient(45deg, #ff758c, #ffb347, #6f86d6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -1px;
        }

        .tracking-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .order-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-card, .status-card {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          padding: 24px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .detail-header, .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(111, 134, 214, 0.1);
        }

        .detail-header h3, .status-header h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 700;
          color: #334155;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 8px;
        }

        .detail-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #64748b;
        }

        .detail-value {
          font-size: 0.9rem;
          font-weight: 700;
          background: linear-gradient(45deg, #ff758c, #ffb347);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .progress-indicator {
          flex: 1;
          margin-left: 20px;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6f86d6, #48c6ef);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .status-timeline {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .status-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          position: relative;
        }

        .status-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 19px;
          top: 40px;
          width: 2px;
          height: 40px;
          background: rgba(111, 134, 214, 0.2);
        }

        .status-completed .status-item:not(:last-child)::after {
          background: linear-gradient(180deg, #6f86d6, #48c6ef);
        }

        .status-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .status-pending .status-icon {
          background: rgba(255, 255, 255, 0.4);
          color: #94a3b8;
          border: 2px solid rgba(148, 163, 184, 0.3);
        }

        .status-completed .status-icon {
          background: linear-gradient(45deg, #6f86d6, #48c6ef);
          color: white;
          box-shadow: 0 4px 12px rgba(111, 134, 214, 0.3);
        }

        .status-content {
          flex: 1;
          padding-top: 4px;
        }

        .status-title {
          font-size: 1rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 4px;
        }

        .status-description {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 8px;
        }

        .status-timestamp {
          font-size: 0.75rem;
          font-weight: 600;
          background: linear-gradient(45deg, #ff758c, #ffb347);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, -10px); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .tracking-showcase {
            padding: 30px 20px;
          }
          
          .tracking-main {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .tracking-showcase {
            padding: 20px 16px;
          }
          
          .tracking-title {
            font-size: 2.2rem;
          }
          
          .detail-card, .status-card {
            padding: 20px;
          }
          
          .ambient-sphere {
            width: 150px !important;
            height: 150px !important;
          }
        }

        @media (max-width: 480px) {
          .tracking-title {
            font-size: 1.8rem;
          }
          
          .status-item {
            gap: 12px;
          }
          
          .status-icon {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
          
          .status-item:not(:last-child)::after {
            left: 15px;
          }
          
          .detail-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductTracking;