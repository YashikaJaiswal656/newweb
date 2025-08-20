import { useState } from 'react';
import '../css/modal.css'
const Infrastructure = [
  {
    id: 1,
    image: "https://finikelithium.com/static/media/lithiumintegratedinverter.b0205ecd2da92687afec.JPG",
    title: "Lithium-Ion Inverter 1100VA",
    location: "High-efficiency inverter with up to 98% conversion rate for small-scale applications.",
    capacity: "High Volume Production",
    status: "Active",
    power: "1100VA"
  },
  {
    id: 2,
    image: "https://finikelithium.com/static/media/lithiumintegratedinverter.b0205ecd2da92687afec.JPG",
    title: "Lithium-Ion Inverter 2100VA",
    location: "Reliable power solution with 98% efficiency for medium-scale needs.",
    capacity: "Advanced Testing",
    status: "Operational",
    power: "2100VA"
  },
  {
    id: 3,
    image: "https://finikelithium.com/static/media/lithiumintegratedinverter.b0205ecd2da92687afec.JPG",
    title: "Lithium-Ion Inverter 3500VA",
    location: "Robust inverter delivering 98% efficiency for larger residential setups.",
    capacity: "Precision Testing",
    status: "Active",
    power: "3500VA"
  },
  {
    id: 4,
    image: "https://finikelithium.com/static/media/lithiumintegratedinverter.b0205ecd2da92687afec.JPG",
    title: "Lithium-Ion Inverter 5000VA",
    location: "High-capacity inverter with 98% efficiency for commercial applications.",
    capacity: "Full Scale Testing",
    status: "Operational",
    power: "5000VA"
  },
  {
    id: 5,
    image: "https://finikelithium.com/static/media/lithiumintegratedinverter.b0205ecd2da92687afec.JPG",
    title: "Lithium-Ion Inverter 7500VA",
    location: "Powerful inverter with 98% efficiency for heavy-duty industrial use.",
    capacity: "Quality Assurance",
    status: "Active",
    power: "7500VA"
  },
  {
    id: 6,
    image: "https://finikelithium.com/static/media/lithiumintegratedinverter.b0205ecd2da92687afec.JPG",
    title: "Lithium-Ion Inverter 10000VA",
    location: "Top-tier inverter with 98% efficiency for large-scale industrial systems.",
    capacity: "Automated Systems",
    status: "Operational",
    power: "10000VA"
  }
];

const Modal = () => {
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
          
          <h1 className="collection-title">Advanced Lithium-Ion Inverters</h1>
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
                <span className="rating-value">{item.power}</span>
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
                  <div className={`status-dot ${item.status.toLowerCase()}`}></div>
                  <span className="status-label">{item.status}</span>
                </div>
                
                <h3 className="product-title">{item.title}</h3>
                <p className="product-description">{item.location}</p>
                
                <div className="product-footer">
                  <div className="process-info">
                    <span className="process-label">Process</span>
                    <span className="process-value">{item.capacity}</span>
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

export default Modal;