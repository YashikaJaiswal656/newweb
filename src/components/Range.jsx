import React, { useState } from 'react';


const ProductRange = [
  {
    id: 1,
    image: "https://finikelithium.com/static/media/lithiumintegratedinverter.b0205ecd2da92687afec.JPG",
    title: "Lithium Integrated Inverters/UPS",
    category: "Power Solutions",
    icon: "⚡",
    color: "from-pink-400 to-purple-600"
  },
  {
    id: 2,
    image: "https://finikelithium.com/static/media/lithiumbatteriesforinverter.e1b26165863b6bce0b2e.JPG",
    title: "Lithium batteries for inverters",
    category: "Battery Systems",
    icon: "🔋",
    color: "from-blue-400 to-cyan-600"
  },
  {
    id: 3,
    image: "https://finikelithium.com/static/media/telecomimage.16edfd792d28533ef465.jpeg",
    title: "Lithium batteries for TELECOM/ESS/Solar",
    category: "Telecom Solutions",
    icon: "📡",
    color: "from-amber-400 to-orange-600"
  },
  {
    id: 4,
    image: "https://finikelithium.com/static/media/essimage.1d90d0433dee34d35b82.jpeg",
    title: "Energy Storage Systems (ESS/BSS/Solar)",
    category: "Storage Systems",
    icon: "🏗️",
    color: "from-emerald-400 to-green-600"
  },
  {
    id: 5,
    image: "https://finikelithium.com/static/media/twowheeler.139385b79b35e2ad50ac.JPG",
    title: "Lithium batteries for Two-Wheelers(EV)",
    category: "Electric Vehicles",
    icon: "🏍️",
    color: "from-violet-400 to-purple-600"
  },
  {
    id: 6,
    image: "https://finikelithium.com/static/media/threewheeler.60e05d5a677afbd4af6f.JPG",
    title: "Lithium batteries for Three-Wheelers(EV)",
    category: "Electric Vehicles",
    icon: "🛺",
    color: "from-sky-400 to-blue-600"
  },
  {
    id: 7,
    image: "https://finikelithium.com/static/media/ecycelimage.841ee8a6cc31693af1c7.JPG",
    title: "E-Cycle Lithium Battery",
    category: "E-Mobility",
    icon: "🚲",
    color: "from-rose-400 to-pink-600"
  },
  {
    id: 8,
    image: "https://finikelithium.com/static/media/solarimage.93d06d41f7f90fd30928.jpeg",
    title: "Solar Lithium Battery",
    category: "Solar Solutions",
    icon: "☀️",
    color: "from-yellow-400 to-amber-600"
  },
  {
    id: 9,
    image: "https://finikelithium.com/static/media/material-handling-traction.5a5b4f9615790f8e2222.jpg",
    title: "Lithium batteries for Material Handling & Traction",
    category: "Industrial",
    icon: "🏭",
    color: "from-teal-400 to-cyan-600"
  },
  {
    id: 10,
    image: "https://finikelithium.com/static/media/golf-cart.c24a4bca4962f4130f16.jpg",
    title: "Lithium batteries for Golf Carts",
    category: "Recreation",
    icon: "⛳",
    color: "from-lime-400 to-green-600"
  }
];

const Range = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    
    <section className="infrastructure-section" style={{opacity:"1"}}>
      
      <div className="decorative-bg">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      
      <div className="products-header">
        <div className="header-card">
          <div className="header-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <h2 className="gradient-title">Product Range</h2>
        </div>
        
      </div>

        <div className="infrastructure-grid">
          {ProductRange.map((item) => (
            <div key={item.id} className="infrastructure-card">
              <div className="card-image-container">
                <div className="image-glow"></div>
                <div className="image-wrapper">
                  <img src={item.image} alt={item.title}                   loading="lazy"
  decoding="async"
 className="infrastructure-image" 
 onClick={() => openModal(item)}
 />
                  <div className="status-badge">{item.status}</div>
                  
                  <div className="facility-icon">{item.icon}</div>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="facility-title">{item.title}</h3>
                
                <div className="location-info">
                  <div className="location-dot"></div>
                  <span className="location-text">{item.category}</span>
                </div>
                
                <div className="capacity-info">
                  <div className="capacity-icon">
                    <i className="fas fa-cog"></i>
                  </div>
                  <span className="capacity-text">Performance</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      <div className="decorative-dot dot-1"></div>
      <div className="decorative-dot dot-2"></div>
      <div className="decorative-dot dot-3"></div>
      
      {selectedImage && (
        <div className="modal-overlay">
          
          <div className="modal-backdrop" onClick={closeModal}></div>
          
          <div className="modal-content">
            
            <button className="modal-close-btn" onClick={closeModal}>
              <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="modal-image-container">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="modal-image"
              />
              
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Range;
