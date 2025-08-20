import React from 'react';
import '../css/whoth.css';

const WhoTh = () => {
  const cards = [
    {
      icon: 'fas fa-bolt',
      title: 'High Power Output',
      subtag: 'Reliable performance',
      description: 'Finike lithium batteries deliver high-capacity output ensuring optimal energy efficiency for residential and industrial use.',
      image: 'https://finikelithium.com/static/media/rajpura-factory-working.07a75bec3fee6bc81a54.jpg',
    },
    {
      icon: 'fas fa-leaf',
      title: 'Eco-Friendly',
      subtag: 'Sustainable energy',
      description: 'Our solutions are crafted to support a green future, utilizing recyclable materials and clean energy designs.',
      image: 'https://finikelithium.com/static/media/rajpura-factory-working.07a75bec3fee6bc81a54.jpg',
    },
    {
      icon: 'fas fa-solar-panel',
      title: 'Solar Integration',
      subtag: 'Seamless adaptability',
      description: 'Finike batteries are perfectly suited for solar energy setups, ensuring uninterrupted energy backup and efficiency.',
      image: 'https://finikelithium.com/static/media/rajpura-factory-working.07a75bec3fee6bc81a54.jpg',
    }
  ];

  return (
    <section className="who-we-are-finike-bg" style={{opacity:"1"}}>
      
      <div className="decorative-background">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
      </div>

      <div className="section-border-top"></div>
      <div className="section-border-bottom"></div>

        <div className="products-header">
          <div className="header-card">
            <div className="header-icon">
              <i className="fas fa-award"></i>
            </div>
            <h2 className="gradient-title">Why Choose Finike</h2>
          </div>
          
        </div>
      <div className="finike-gradient-wrapper-bg">
        {cards.map((card, index) => (
          <div key={index} className="finike-gradient-card-bg">
            <div className="card-header">
              <div className="finike-gradient-icon-bg">
                <i className={card.icon}></i>
              </div>
              <div className="card-title-section">
                <div className="finike-gradient-heading-bg">{card.title}</div>
                <div className="finike-gradient-subtag-bg">{card.subtag}</div>
              </div>
            </div>

            <div className="finike-gradient-description-bg">{card.description}</div>
            
            <div className="image-container">
              <img src={card.image} alt={card.title} className="finike-gradient-image-bg" />
              <div className="image-overlay"></div>
            </div>

            <div className="card-footer">
              <div className="feature-badge">Premium Quality</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoTh;