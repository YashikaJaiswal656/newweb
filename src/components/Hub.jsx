import React from 'react';

const Hub = () => {
  return (
    <div className="battery-performance-hub">
      {/* Background Elements */}
      <div className="bg-particle particle-alpha"></div>
      <div className="bg-particle particle-beta"></div>
      <div className="bg-particle particle-gamma"></div>

      {/* Main Title Section */}
      <div className="title-banner">
        <h1 className="main-title">About ESS Batteries</h1>
        <div className="title-underline">
          <div className="underline-segment segment-orange"></div>
          <div className="underline-dot"></div>
          <div className="underline-segment segment-blue"></div>
        </div>
        
      </div>

      {/* Two Column Layout */}
      <div className="performance-layout">
        
        {/* Left Column - Performance Metrics */}
        <div className="metrics-column">
          <div className="performance-card">
            <div className="card-icon">
              <div className="icon-circle orange-bg">
                ⚡
              </div>
            </div>
            <h2 className="card-title">Superior Performance</h2>
            <div className="efficiency-display">
              <span className="big-number">98</span>
              <span className="percentage">%</span>
            </div>
            <div className="efficiency-bar">
              <div className="bar-fill orange-fill"></div>
            </div>
            <p className="efficiency-label">Energy Efficiency</p>
            <div className="card-description">
              <p>
                        Energy Storage Systems (ESS) leverage advanced LiFePO4 lithium-ion technology to efficiently store excess energy from renewable sources like solar and wind. ESS enhance grid stability, offer reliable backup power, and optimize energy management for homes, businesses, and utilities.</p>
            </div>
          </div>
        </div>

        {/* Right Column - Image Only */}
        <div className="range-column">
          <div className="range-card">
            {/* Vehicle Image */}
            <div className="vehicle-showcase">
              <img src="https://finikelithium.com/static/media/essimage.1d90d0433dee34d35b82.jpeg" alt="Electric Vehicle" />
            </div>
          </div>
        </div>

      </div>



      <style jsx>{`
        .battery-performance-hub {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .bg-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 154, 86, 0.05);
          animation: drift 8s ease-in-out infinite;
        }

        .particle-alpha {
          width: 150px;
          height: 150px;
          top: 15%;
          left: 10%;
        }

        .particle-beta {
          width: 100px;
          height: 100px;
          top: 60%;
          right: 10%;
          animation-delay: -3s;
        }

        .particle-gamma {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 15%;
          animation-delay: -6s;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        .title-banner {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        .main-banner-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          color: #ff9a56;
          margin: 0 0 20px 0;
          text-shadow: 0 2px 10px rgba(255, 154, 86, 0.2);
        }

        .title-underline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .underline-segment {
          width: 80px;
          height: 3px;
          border-radius: 2px;
        }

        .segment-orange {
          background: #ff9a56;
        }

        .segment-blue {
          background: #4a90e2;
        }

        .underline-dot {
          width: 10px;
          height: 10px;
          background: #4a90e2;
          border-radius: 50%;
        }

        .banner-subtitle {
          font-size: 1.2rem;
          color: #64748b;
          margin: 0;
          font-weight: 400;
        }

        .performance-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .metrics-column,
        .range-column {
          display: flex;
          flex-direction: column;
        }

        .performance-card,
        .range-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .card-icon {
          margin-bottom: 20px;
        }

        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          font-weight: bold;
        }

        .orange-bg {
          background: linear-gradient(135deg, #ff9a56, #ff7730);
        }

        .blue-bg {
          background: linear-gradient(135deg, #4a90e2, #357abd);
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 30px 0;
        }

        .efficiency-display {
          display: flex;
          align-items: baseline;
          margin-bottom: 15px;
        }

        .big-number {
          font-size: 4rem;
          font-weight: 700;
          color: #22c55e;
          line-height: 1;
        }

        .percentage {
          font-size: 2rem;
          color: #22c55e;
          margin-left: 5px;
        }

        .efficiency-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .bar-fill {
          height: 100%;
          border-radius: 4px;
          width: 98%;
        }

        .orange-fill {
          background: linear-gradient(90deg, #ff9a56, #ff7730);
        }

        .efficiency-label {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0 0 10px 0;
          font-weight: 500;
        }

        .range-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
          font-size: 1rem;
          line-height: 1.7;
          color: #475569;
          margin: 0;
        }

        .text-highlight-blue {
          color: #4a90e2;
          font-weight: 600;
        }

        .text-highlight-orange {
          color: #ff7730;
          font-weight: 600;
        }

        .range-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          margin: 0 0 30px 0;
          font-weight: 500;
        }

        .range-scale {
          margin-bottom: 30px;
        }

        .scale-markers {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 10px;
        }

        .range-bar {
          height: 12px;
          background: #e2e8f0;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }

        .range-progress {
          height: 100%;
          width: 85%;
          border-radius: 6px;
        }

        .blue-gradient {
          background: linear-gradient(90deg, #4a90e2, #357abd, #7c3aed);
        }

        .range-indicator {
          position: absolute;
          top: -2px;
          right: 15%;
          width: 16px;
          height: 16px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
        }

        .vehicle-showcase {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vehicle-showcase img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .page-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 50px;
          position: relative;
          z-index: 2;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(74, 144, 226, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #4a90e2;
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .battery-performance-hub {
            padding: 30px 15px;
          }

          .performance-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .performance-card,
          .range-card {
            padding: 30px 20px;
          }

          .main-banner-title {
            font-size: 2.2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .big-number {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Hub