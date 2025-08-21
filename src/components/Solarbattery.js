import React, { useState, useEffect } from 'react';
import solarimg from '../img/solarimg.jpeg';
import solarimg2 from '../img/solarimg2.jpg';
import solar2 from '../assets/catalogues/solarcatalog2.pdf';
import solarcatalogue from "../assets/catalogues/(V2).pdf"; 
import Features from './Features';
const SolarBattery = () => {
  const galleryImages = [
    { id: 1, description: 'Finike Solar Inverter Front View' },
    { id: 2, description: 'Finike Lithium Battery System' },
    { id: 3, description: 'Industrial Installation Example' },
  ];

  const specifications = [
    { name: 'System Rating', values: ['2.5KVA', '3KVA', '3.5KVA', '5KVA', '7.5KVA', '10KVA'] },
    { name: 'Input Voltage', values: ['76-90V (3KVA)', '110V (5KVA)', '200V (10KVA)'] },
    { name: 'Max Solar Array Power', values: ['3600W (3KVA)', '6000W (10KVA)'] },
    { name: 'Efficiency', values: ['>90%'] },
    { name: 'Output Voltage', values: ['220V ± 7V'] },
    { name: 'Frequency', values: ['50Hz ± 1Hz'] },
  ];

  const highlights = [
    { title: 'Capacity Range', desc: 'Available from 2.5KVA to 10KVA for various industrial needs' },
    { title: 'Power Efficiency', desc: 'Maximum solar power utilization during charging and backup mode' },
    { title: 'Grid Options', desc: 'Grid bypass option available for flexible power management' },
  ];

  const Infrastructure = [
  {
    id: 1,
    
    title: "2.5KVA 36V/48V",
    location: "System Rating (Name Plate): VA 2500",
    icon: "🏭",
    capacity: "Full Load Output Current: Amp 63/46 Operating Voltage: V 36/48"
  },
  {
    id: 2,
    
    title: "3KVA 36V/48V",
    location: "System Rating (Name Plate): VA 3000",
    icon: "🔋",
    capacity: "Full Load Output Current: Amp 63/48 Operating Voltage: V 36/48"
  },
  {
    id: 3,
    
    title: "3.5KVA 48V",
    location: "System Rating (Name Plate): VA 3500",
    icon: "⚡",
    capacity: "Full Load Output Current: Amp 63 Operating Voltage: V 48"
  },
  {
    id: 4,
    
    title: "5KVA 48V",
    location: "System Rating (Name Plate): VA 5000",
    icon: "📦",
    capacity: "Full Load Output Current: Amp 104 Operating Voltage: V 48"
  },
  {
    id: 5,
    title: "5KVA 96V",
    location: "System Rating (Name Plate): VA 5000",
    icon: "🔬",
    capacity: "Full Load Output Current: Amp 50 Operating Voltage: V 96"
  },
  {
    id: 6,
    title: "7.5KVA 96V/120V",
    location: "System Rating (Name Plate): VA 7500",
    icon: "⚙️",
    capacity: "Full Load Output Current: Amp 75/63 Operating Voltage: V 96/120"
  },
  {
    id: 7,
    title: "10KVA 120V",
    location: "System Rating (Name Plate): VA 10000",
    icon: "🔧",
    capacity: "Full Load Output Current: Amp 77 Operating Voltage: V 120"
  },
  {
    id: 8,
    title: "10KVA 192V",
    location: "System Rating (Name Plate): VA 10000",
    icon: "🌟",
    capacity: "Full Load Output Current: Amp 48 Operating Voltage: V 192"
  }
];

  // State for gallery navigation
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery Navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  // IntersectionObserver for animations
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('products-section')) {
              const items = entry.target.querySelectorAll('.product-card');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('reveal');
                }, index * 150);
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="solar-battery min-h-screen flex flex-col font-poppins text-gray-800 bg-gray-50">
      <style>
        {`
          /* Base Styles */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Poppins', sans-serif;
            line-height: 1.6;
          }
          
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          /* Header */
          .main-header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
          }
          
          /* Hero Banner */
          .hero-banner {
            position: relative;
            width: 100%;
            height: 70vh;
            min-height: 500px;
            overflow: hidden;
          }
          
          .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
          
          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            padding: 2rem;
          }
          
          .hero-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          }
          
          .hero-subtitle {
            font-size: 1.5rem;
            max-width: 800px;
            margin-bottom: 2rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          }
          
          /* Content Sections */
          .content-section {
            padding: 5rem 0;
          }
          
        /* Technical Specifications Section */
.content-section.section-gray {
  padding: 3rem 0; /* Reduced padding for mobile */
}

.overflow-x-auto {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  max-width: 100%;
  margin: 0 auto;
}

.spec-image-container {
  width: 100%;
  max-width: 1000px; /* Maximum width for larger screens */
  margin: 0 auto;
}

.spec-image {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
  max-width: 100%; /* Prevent overflow */
  display: block;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
/* Hero Banner */
.hero-banner {
  position: relative;
  width: 100%;
  height: 60vh; /* Adjusted for mobile */
  min-height: 300px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  padding: 1rem; /* Reduced padding for mobile */
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 90%;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .hero-banner {
    height: 50vh;
    min-height: 350px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .product-grid, .catalog-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 45vh;
    min-height: 300px;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .product-grid, .catalog-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .spec-image-container {
    max-width: 100%;
  }

  .spec-image {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 576px) {
  .hero-banner {
    height: 40vh;
    min-height: 250px;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
  }

  .product-grid, .catalog-grid {
    grid-template-columns: 1fr; /* Single column for very small screens */
    gap: 1rem;
  }

  .product-card, .catalog-card {
    margin: 0 auto;
    max-width: 90%;
  }

  .catalog-image {
    height: 200px; /* Further reduced for small screens */
  }

  .content-section {
    padding: 2rem 0; /* Further reduced padding */
  }

  .features-list {
    padding-left: 1.5rem;
  }

  .features-list li {
    font-size: 0.9rem;
  }
}
          
          .download-button {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: #0066cc;
            color: white;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            transition: background 0.3s;
          }
          
          .download-button:hover {
            background: #0052a3;
          }
          
          /* Responsive Adjustments */
          @media (max-width: 992px) {
            .hero-banner {
              height: 60vh;
              min-height: 400px;
            }
            
            .hero-title {
              font-size: 2.5rem;
            }
            
            .hero-subtitle {
              font-size: 1.25rem;
            }
          }
          
          @media (max-width: 768px) {
            .hero-banner {
              height: 50vh;
              min-height: 300px;
            }
            
            .hero-title {
              font-size: 2rem;
            }
            
            .section-title {
              font-size: 2rem;
            }
            
            .product-grid, .catalog-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
          }
          
          @media (max-width: 576px) {
            .hero-banner {
              height: 40vh;
              min-height: 250px;
            }
            
            .hero-title {
              font-size: 1.75rem;
            }
            
            .hero-subtitle {
              font-size: 1rem;
            }
            
            .section-title {
              font-size: 1.75rem;
            }
            
            .product-grid, .catalog-grid {
              grid-template-columns: 1fr;
            }
          }
          
          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade {
            animation: fadeIn 1s ease-out forwards;
          }
      
            // In your CSS (inside the style tags), add this:
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.product-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  opacity: 0.1;
  z-index: 0;
}

.product-content {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.8);
}
  .solar-banner {
            position: relative;
            width: 100%;
            height: 90vh; /* Default height for larger screens */
            min-height: 300px; /* Minimum height to prevent collapse */
            overflow: hidden;
            background-color: #f0f7ff; /* Fallback background color if image fails to load */
          }
            @media (max-width: 1200px) {
            .solar-banner {
              height: 60vh;
              min-height: 350px;
            }
            
            .hero-title {
              font-size: 2.5rem;
            }
            
            .hero-subtitle {
              font-size: 1.25rem;
            }
            
            .product-grid, .catalog-grid {
              grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            }
          }
          
          @media (max-width: 992px) {
            .solar-banner {
              height: 50vh;
              min-height: 300px;
            }
            
            .hero-title {
              font-size: 2rem;
            }
            
            .hero-subtitle {
              font-size: 1.1rem;
            }
            
            .section-title {
              font-size: 2rem;
            }
          }
          
          @media (max-width: 768px) {
            .solar-banner {
              height: 45vh;
              min-height: 280px;
            }
            
            .hero-title {
              font-size: 1.75rem;
            }
            
            .hero-subtitle {
              font-size: 1rem;
            }
            
            .section-title {
              font-size: 1.75rem;
            }
            
            .product-grid, .catalog-grid {
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 1rem;
            }
            
            .spec-image-container {
              max-width: 100%;
            }
            
            .spec-image {
              width: 100%;
              height: auto;
            }
          }
          
          @media (max-width: 576px) {
            .solar-banner {
              height: 40vh;
              min-height: 250px;
            }
            
            .hero-title {
              font-size: 1.5rem;
            }
            
            .hero-subtitle {
              font-size: 0.9rem;
              max-width: 90%;
            }
            
            .section-title {
              font-size: 1.5rem;
            }
            
            .section-subtitle {
              font-size: 0.9rem;
            }
            
        }
          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade {
            animation: fadeIn 1s ease-out forwards;
          }
        `}
      </style>

      {/* Header */}
      <header className="main-header">
        <div className="container py-4">
          {/* Add your header content here */}
        </div>
      </header>

      {/* Hero Banner */}
      <section className="solar-banner">
        <img
          src={solarimg}
          alt="Solar Battery System"
          className="hero-image"
        />
        <div className="hero-overlay animate-fade">
          <h1 className="hero-title">Advanced Solar Battery Solutions</h1>
          <p className="hero-subtitle">
            High-efficiency solar battery systems for industrial and commercial applications
          </p>
        </div>
      </section>

      

      <Features/>

      {/* Technical Specifications */}
      <section className="content-section section-gray">
        <div className="container">
          
          <h2 className="main-title" style={{textAlign:"center"}}>Technical Specifications</h2> 
          
          
<p className="section-subtitle">
            Detailed technical specifications for our Solar USP/SPCU systems
          </p>
          <div className="overflow-x-auto">
            <img
              src={solarimg2}
              alt="Technical Specifications Table"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <p className="text-center mt-6 text-gray-600">
            Note: Technical Specifications can be changed without prior notice.
          </p>
        </div>
      </section>


      <section className="infrastructure-section" style={{opacity:"1"}}>
      <div className="decorative-bg">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      

      <div className="infrastructure-container">
        
        <div className="infrastructure-header">
          <div className="header-card">
            <div className="header-icon">
              <i className="fas fa-building"></i>
            </div>
            <h2 className="main-title">Our Product Range</h2>
          </div>
          
        </div>

        
        <div className="infrastructure-grid">
          {Infrastructure.map((item) => (
            <div key={item.id} className="infrastructure-card">
             
              
              <div className="card-content">
                <h3 className="facility-title">{item.title}</h3>
                
                <div className="location-info">
                  <div className="location-dot"></div>
                  <span className="location-text">{item.location}</span>
                </div>
                
                <div className="capacity-info">
                  <div className="capacity-icon">
                    <i className="fas fa-cog"></i>
                  </div>
                  <span className="capacity-text">{item.capacity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
   </div>

      <div className="catalog-container">
      
      <div className="catalog-floating-orb catalog-orb-1"></div>
      <div className="catalog-floating-orb catalog-orb-2"></div>
      <div className="catalog-floating-orb catalog-orb-3"></div>
      <div className="catalog-floating-orb catalog-orb-4"></div>
      <div className="catalog-floating-orb catalog-orb-5"></div>
      
      <div className="catalog-content">
        
        <div className="catalog-bg-pattern">
          <div className="catalog-pattern-circle"></div>
          <div className="catalog-pattern-circle"></div>
          <div className="catalog-pattern-circle"></div>
        </div>

        
        <div className="catalog-header">
          <div className="catalog-pulse-container">
            <div className="catalog-header-icon">
              📋
            </div>
          </div>
          <h2 className="catalog-main-title">Product Catalogs</h2>
          <div className="catalog-title-underline">
            <div className="catalog-line-segment"></div>
            <div className="catalog-line-dot"></div>
            <div className="catalog-line-segment"></div>
          </div>
          <p className="catalog-subtitle">Download our detailed product catalogs for complete specifications</p>
        </div>

        
        <div className="catalog-main-card">
          <div className="catalog-card-glow"></div>
          
          

          <div className="catalog-card-content">


           
            <div className="catalog-cta-section">
              <a 
                href="https://finikelithium.com/static/media/(V2).9ac6ce9d86c79f272811.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="catalog-cta-button"
              >
                <div className="catalog-button-bg"></div>
                <div className="catalog-button-content">
                  <span className="catalog-button-icon"></span>
                  <span className="catalog-button-text"> Catalog 1</span>
                  <div className="catalog-button-arrow">→</div>
                </div>
                <div className="catalog-button-glow"></div>
              </a>
                            <a 
                href="https://finikelithium.com/static/media/solarcatalog2.cf5da577acda1a2ae454.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="catalog-cta-button"
              >
                <div className="catalog-button-bg"></div>
                <div className="catalog-button-content">
                  <span className="catalog-button-icon"></span>
                  <span className="catalog-button-text">Catalog 2</span>
                  <div className="catalog-button-arrow">→</div>
                </div>
                <div className="catalog-button-glow"></div>
              </a>
              
            </div>
            
          </div>
        </div>

        

      </div>

    </div>
    </section>
    </div>
  );
};

export default SolarBattery;