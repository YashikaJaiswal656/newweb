import { useState } from 'react';

const Infrastructure = [
  {
    id: 1,
    image: "https://finikelithium.com/static/media/twow.d948ca0babeefc1598fa.jpeg",
    title: "Electric Two-Wheeler Battery",
    location: "Provides enhanced acceleration, extended range, and fast charging for urban mobility."
  },
  {
    id: 2,
    image: "https://finikelithium.com/static/media/erk.a537fabffe3cc87a6f0b.jpeg",
    title: "E-Rickshaw Battery",
    location: "Long-range and high-efficiency charging for e-rickshaws, ensuring reliable performance."
  },
  {
    id: 3,
    image: "https://finikelithium.com/static/media/auto.3cf3e8f265f90954c4e2.jpeg",
    title: "Electric Three-Wheeler Battery",
    location: "High-performance battery designed for heavy-duty electric vehicles with robust energy output."
  },
  {
    id: 4,
    image: "https://finikelithium.com/static/media/cycle.f881e71e11518aa2063b.jpeg",
    title: "Cycle",
    location: "Designed for long-range travel and high-efficiency charging. Enjoy extended range, fast charging, and reliable performance."
  },
  {
    id: 5,
    image: "https://finikelithium.com/static/media/golf-cart.c24a4bca4962f4130f16.jpg",
    title: "E-Golf Cart Battery",
    location: "Reliable and efficient power for short- to medium-range lightweight electric vehicles."
  },
  {
    id: 6,
    image: "https://finikelithium.com/static/media/twowheeler.139385b79b35e2ad50ac.JPG",
    title: "Two Wheelers Batteries",
    location: "Reliable power solution with 90% efficiency for medium-scale needs."
  },
  {
    id: 7,
    image: "https://finikelithium.com/static/media/threewheeler.60e05d5a677afbd4af6f.JPG",
    title: "Three Wheelers Batteries",
    location: "Reliable power solution with 90% efficiency for medium-scale needs."
  }
];

const Batteries = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="premium-inverter-collection">
      <div className="collection-background">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
      </div>
      
      <div className="collection-container">
        <div className="collection-header">
          
          <h1 className="collection-title">Our Lithium-Ion EV Batteries
</h1>
          <p className="collection-subtitle">
            Engineered for excellence with up to 98% efficiency across all power ranges
          </p>
        </div>

        <div className="power-inverter-grid">
          {Infrastructure.map((item, index) => (
            <div 
              key={item.id} 
              className={`power-inverter-card ${index % 2 === 0 ? 'card-layout-left' : 'card-layout-right'}`}
              onClick={() => openModal(item)}
            >
              <div className="power-rating-badge">
                <span className="rating-value">Long-lasting</span>
              </div>
              
              <div className="product-image-section">
                <div className="product-image-container">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="product-image"
                    loading="lazy"
                  />
                  <div className="hover-overlay">
                    <div className="overlay-text-container">
                      <span className="overlay-text">View Details</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-info-section">
                <div className="product-status">
                  <div className="status-dot"></div>
                  <span className="status-label">Fast acceleration</span>
                </div>
                
                <h3 className="product-title">{item.title}</h3>
                <p className="product-description">{item.location}</p>
                
                <div className="product-footer">
                  <div className="process-info">
                    <span className="process-label">Process</span>
                    <span className="process-value">High Capacity</span>
                  </div>
                  <div className="efficiency-badge">
                    <span className="efficiency-text">98% Efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="product-modal-backdrop">
          <div className="modal-overlay" onClick={closeModal}>
            <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-button" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="product-modal-content">
                <div className="modal-product-image-wrapper">
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.title}
                    className="modal-product-image"
                  />
                </div>
                <div className="modal-product-details">
                  <h3 className="modal-product-title">{selectedImage.title}</h3>
                  <p className="modal-product-description">{selectedImage.location}</p>
                  <div className="product-specifications">
                    <div className="specification-item">
                      <span className="specification-label">Power Output</span>
                      <span className="specification-value">{selectedImage.power}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Status</span>
                      <span className="specification-value">{selectedImage.status}</span>
                    </div>
                    <div className="specification-item">
                      <span className="specification-label">Process</span>
                      <span className="specification-value">{selectedImage.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Batteries;