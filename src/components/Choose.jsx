import React, { useState } from 'react';

const Choose = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Extended Battery Life',
      description: 'High energy density lithium-ion technology delivers exceptional range and reliable performance for electric vehicles and energy storage systems.',
      metric: '30% Longer',
      color: '#ff758c',
      gradient: 'linear-gradient(135deg, #ff758c, #ffb347)',
      icon: '🔋'
    },
    {
      title: 'Ultra-Fast Charging',
      description: 'Advanced fast-charging technology significantly reduces downtime and maximizes operational efficiency across all applications.',
      metric: '3x Faster',
      color: '#6f86d6',
      gradient: 'linear-gradient(135deg, #6f86d6, #48c6ef)',
      icon: '⚡'
    },
    {
      title: 'Low Maintenance',
      description: 'Durable, eco-friendly battery design with minimal maintenance requirements and superior recyclability for sustainable operations.',
      metric: '90% Less',
      color: '#a8edea',
      gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      icon: '🔧'
    },
    {
      title: 'Cost Efficiency',
      description: 'Optimized energy efficiency reduces operational costs while delivering maximum return on investment for long-term savings.',
      metric: '40% Savings',
      color: '#ffb347',
      gradient: 'linear-gradient(135deg, #ffb347, #ff758c)',
      icon: '💰'
    }
  ];

  return (
    <>
      <style jsx>{`
        .choose-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
          padding: 48px 16px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Background Elements */
        .background-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .orb-1 {
          top: 80px;
          left: 40px;
          width: 288px;
          height: 288px;
          background: linear-gradient(45deg, #ff758c, #ffb347);
        }

        .orb-2 {
          bottom: 80px;
          right: 40px;
          width: 240px;
          height: 240px;
          background: linear-gradient(45deg, #6f86d6, #48c6ef);
        }

        .orb-3 {
          top: 50%;
          left: 60%;
          width: 192px;
          height: 192px;
          background: linear-gradient(45deg, #a8edea, #fed6e3);
        }

        .main-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          gap: 80px;
          align-items: start;
        }

        .brand-section {
          display: flex;
          flex-direction: column;
          text-align:center;
        }

        .brand-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(30px);
          border-radius: 24px;
          padding: 48px 32px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .main-title {
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(45deg, #ff758c, #ffb347, #6f86d6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -1.5px;
        }

        .subtitle {
          font-size: 1rem;
          color: #64748b;
          font-weight: 500;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .brand-highlights {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .highlight-badge {
          background: linear-gradient(45deg, #6f86d6, #48c6ef);
          color: white;
          padding: 12px 20px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.875rem;
          box-shadow: 0 8px 20px rgba(111, 134, 214, 0.3);
          white-space: nowrap;
        }

        .features-section {
          display: flex;
          flex-direction: column;
          margin-top:30px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 24px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(25px);
          border-radius: 16px;
          padding: 32px 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .feature-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 16px;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .feature-card:nth-child(1) .feature-icon {
          background: linear-gradient(135deg, #ff758c, #ffb347);
        }

        .feature-card:nth-child(2) .feature-icon {
          background: linear-gradient(135deg, #6f86d6, #48c6ef);
        }

        .feature-card:nth-child(3) .feature-icon {
          background: linear-gradient(135deg, #a8edea, #fed6e3);
        }

        .feature-card:nth-child(4) .feature-icon {
          background: linear-gradient(135deg, #ffb347, #ff758c);
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .feature-description {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
          font-weight: 500;
          flex: 1;
        }

        .feature-metric {
          color: white;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.875rem;
          display: inline-block;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .feature-card:nth-child(1) .feature-metric {
          background: linear-gradient(135deg, #ff758c, #ffb347);
        }

        .feature-card:nth-child(2) .feature-metric {
          background: linear-gradient(135deg, #6f86d6, #48c6ef);
        }

        .feature-card:nth-child(3) .feature-metric {
          background: linear-gradient(135deg, #a8edea, #fed6e3);
        }

        .feature-card:nth-child(4) .feature-metric {
          background: linear-gradient(135deg, #ffb347, #ff758c);
        }

        .feature-card:hover .feature-metric {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .main-wrapper {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .brand-highlights {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .choose-container {
            padding: 32px 16px;
          }

          .main-wrapper {
            gap: 32px;
          }

          .brand-card {
            padding: 40px 24px;
          }

          .main-title {
            font-size: 2rem;
            letter-spacing: -1px;
          }

          .subtitle {
            font-size: 1.125rem;
          }

          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .feature-card {
            padding: 24px 20px;
          }

          .feature-icon {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }

          .feature-title {
            font-size: 1.125rem;
          }

          .bg-orb {
            width: 160px !important;
            height: 160px !important;
          }
        }

        @media (max-width: 480px) {
          .choose-container {
            padding: 24px 12px;
          }

          .main-title {
            font-size: 1.5rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .brand-highlights {
            flex-direction: column;
            gap: 8px;
          }

          .highlight-badge {
            font-size: 0.8rem;
            padding: 10px 16px;
            text-align: center;
          }

          .feature-card {
            padding: 20px 16px;
          }

          .feature-icon {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }
.features-grid {
            grid-template-columns:  1fr;
            gap: 20px;
          }
          .feature-metric {
            font-size: 0.8rem;
            padding: 10px 16px;
          }

          .bg-orb {
            width: 120px !important;
            height: 120px !important;
          }
        }
      `}</style>

      <div className="choose-container">
        {/* Background Elements */}
        <div className="background-elements">
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <div className="bg-orb orb-3"></div>
        </div>

        <div className="main-wrapper">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-card">
              <h1 className="main-title">Why Choose Finike?</h1>
              <p className="subtitle">
                Revolutionary lithium-ion technology powering the future of sustainable energy storage solutions.
              </p>
              <div className="brand-highlights">
                <div className="highlight-badge">Industry Leading</div>
                <div className="highlight-badge">Premium Quality</div>
                <div className="highlight-badge">Sustainable Future</div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="features-grid">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card"
                >
                  <div className="feature-content">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                  <div className="feature-metric">
                    {feature.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Choose;