import React, { useState, useEffect } from 'react';
import solarimg from '../img/solarimg.jpeg';
import solarimg2 from '../img/solarimg2.jpg';
import solar2 from '../assets/catalogues/solarcatalog2.pdf';
import solarcatalogue from "../assets/catalogues/(V2).pdf"; 
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

  const features = [
    {
      title: 'Solar Power Management',
      description: 'Uses both Solar Power and AC Mains for charging with priority setting',
      icon: '⚡',
    },
    {
      title: 'Smart Load Sharing',
      description: 'Compatible with smart load sharing for optimized power distribution',
      icon: '🔌',
    },
    {
      title: 'Advanced Monitoring',
      description: 'LCD display with monitoring/data logging features for system information',
      icon: '📊',
    },
    {
      title: 'Flexible Charging',
      description: 'Selectable charging current with High and Normal charging modes',
      icon: '🔋',
    },
    {
      title: 'Comprehensive Protection',
      description: 'Protections against overload, short circuit, battery low, and over temperature',
      icon: '🛡️',
    },
    {
      title: 'Silent Operation',
      description: 'No humming noise with silent UPS technology',
      icon: '🔇',
    },
  ];

  const highlights = [
    { title: 'Capacity Range', desc: 'Available from 2.5KVA to 10KVA for various industrial needs' },
    { title: 'Power Efficiency', desc: 'Maximum solar power utilization during charging and backup mode' },
    { title: 'Grid Options', desc: 'Grid bypass option available for flexible power management' },
  ];

  const supportData = [
    { title: 'Helpline', details: ['+91 97780-44000', '+91 97787-44000'] },
    { title: 'Sales Contact', details: ['+91 84370-42204', 'sales@spinoff.in'] },
    { title: 'Corporate Office', details: ['SCO-117/118, Sector-43B, Chandigarh'] },
    { title: 'Manufacturing Units', details: ['Rajpura NH1, Rajpura-Patiala Road, Punjab', 'Mohali E-226, Ph-BB, SAS Nagar'] },
  ];

  const products = [
    {
      title: '2.5KVA 36V/48V',
      desc1: 'System Rating (Name Plate):  VA 2500',
      desc2: 'Full Load Output Current: Amp 63/46',
      desc3: 'Operating Voltage: V 36/48',
      alt: 'Lithium-Ion Inverter 1100VA',
    },
    {
      title: '3KVA 36V/48V',
      desc1: 'System Rating (Name Plate):  VA 3000',
      desc2: 'Full Load Output Current: Amp 63/48',
      desc3: 'Operating Voltage: V 36/48',
      alt: 'Lithium-Ion Inverter 3000VA',
    },
    {
      title: '3.5KVA 48V',
      desc1: 'System Rating (Name Plate):  VA 3500',
      desc2: 'Full Load Output Current: Amp 63',
      desc3: 'Operating Voltage: V 48',
      alt: 'Lithium-Ion Inverter 3500VA',
    },
    {
      title: '5KVA 48V',
      desc1: 'System Rating (Name Plate):  VA 5000',
      desc2: 'Full Load Output Current: Amp 104',
      desc3: 'Operating Voltage: V 48',
      alt: 'Lithium-Ion Inverter 5000VA',
    },
    {
      title: '5KVA 96V',
      desc1: 'System Rating (Name Plate):  VA 5000',
      desc2: 'Full Load Output Current: Amp 50',
      desc3: 'Operating Voltage: V 96',
      alt: 'Lithium-Ion Inverter 7500VA',
    },
    {
      title: '7.5KVA 96V/120V',
      desc1: 'System Rating (Name Plate):  VA 7500',
      desc2: 'Full Load Output Current: Amp 75/63',
      desc3: 'Operating Voltage: V 96/120',
      alt: 'Lithium-Ion Inverter 7500VA',
    },
    {
      title: '10KVA 120V',
      desc1: 'System Rating (Name Plate):  VA 10000',
      desc2: 'Full Load Output Current: Amp 77',
      desc3: 'Operating Voltage: V 120',
      alt: 'Lithium-Ion Inverter 10000VA',
    },
    {
      title: '10KVA 192V',
      desc1: 'System Rating (Name Plate):  VA 10000',
      desc2: 'Full Load Output Current: Amp 48',
      desc3: 'Operating Voltage: V 192',
      alt: 'Lithium-Ion Inverter 10000VA',
    },
  ];

  const catalogs = [
    {
      title: 'Catalog 1',
      description: 'Complete range of our solar battery products',
      pdf: solarcatalogue,
      thumbnail: 'https://via.placeholder.com/200x300?text=Catalog+2023'
    },
    {
      title: 'Catalog 2',
      description: 'Detailed technical specifications for all models',
      pdf: solar2,
      thumbnail: 'https://via.placeholder.com/200x300?text=Tech+Specs'
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
          
          .section-white {
            background: white;
          }
          
          .section-gray {
            background: #f8f9fa;
          }
          
          .section-blue {
            background: #f0f7ff;
          }
          
          .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
            color: #0066cc;
          }
          
          .section-subtitle {
            font-size: 1.25rem;
            text-align: center;
            max-width: 800px;
            margin: 0 auto 3rem;
            color: #555;
          }
          
          /* Features List */
          .features-container {
            max-width: 1000px;
            margin: 0 auto;
          }
          
          .features-title {
            font-size: 1.5rem;
            color: #2e7d32;
            margin: 2rem 0 1rem;
          }
          
          .features-list {
            list-style-type: disc;
            padding-left: 2rem;
            margin-bottom: 2rem;
          }
          
          .features-list li {
            margin-bottom: 0.8rem;
            line-height: 1.6;
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

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem; /* Reduced gap for mobile */
  margin-top: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  min-height: 200px; /* Ensure cards have a minimum height */
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
  padding: 1rem; /* Reduced padding for mobile */
  background-color: rgba(255, 255, 255, 0.85);
  height: 100%;
}

/* Catalog Grid */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); /* Adjusted min width */
  gap: 1.5rem; /* Reduced gap for mobile */
  margin-top: 2rem;
}

.catalog-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.catalog-image {
  width: 100%;
  height: 250px; /* Reduced height for mobile */
  object-fit: cover;
}

.catalog-content {
  padding: 1rem; /* Reduced padding for mobile */
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
            
            .product-grid, .catalog-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
            
            .product-card, .catalog-card {
              margin: 0 auto;
              max-width: 90%;
            }
            
            .catalog-image {
              height: 200px;
            }
            
            .content-section {
              padding: 2rem 0;
            }
            
            .features-list {
              padding-left: 1.5rem;
            }
            
            .features-list li {
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

      {/* Features Section */}
      <section className="content-section section-white">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-container">
            <h3 className="features-title" id="salient-features-title">
              SALIENT FEATURES
            </h3>
            <ul className="features-list">
              <li>User friendly Wide LCD display for battery user interface.</li>
              <li>Smart Load sharing compatibility.</li>
              <li>Monitoring/data logging feature for better system information at user end (optional).</li>
              <li>Selectable charging current with high charging (HI) and Normal Charging (Low).</li>
              <li>PV availability, battery charging from solar power indication with solar power priority.</li>
              <li>User friendly, control and selection switches with LCD indication on front panel.</li>
              <li>Protections such as Mains MCB Trip, Overload, Short circuit, Battery low, over temperature indication with buzzer as well as display on LCD available.</li>
              <li>Power Saving through No Load Shutdown Feature.</li>
              <li>Maximum Solar Power Utilization during charging and backup mode.</li>
              <li>PV pole reversal protection indication on LCD.</li>
              <li>Deep discharge battery charging from A.C. Mains as well as Solar.</li>
              <li>No humming Noise (Silent UPS).</li>
              <li>AC Mains available, battery charging/charged and it voltage indication provided on LCD display.</li>
              <li>Duel Modes of operation (EC/SC/NC).</li>
              <li>Grid bypass option available.</li>
            </ul>

            <div className="flex flex-col md:flex-row justify-between items-center mt-8">
              <strong className="text-lg font-semibold text-green-600 mb-4 md:mb-0" id="capacity-range">
                2.5KVA | 3 KVA | 3.5 KVA | 5 KVA | 7.5 KVA | 10 KVA
              </strong>
              <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                Also Available in SNMP &amp; GPRS (Simple Network Management Protocol)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="content-section section-gray">
        <div className="container">
          <h2 className="section-title">Technical Specifications</h2>
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

      {/* Product Showcase */}
     {/* Product Showcase */}
<section className="content-section section-blue">
  <div className="container">
    <h2 className="section-title">Our Product Range</h2>
    <p className="section-subtitle">
      High-quality solar battery solutions for every need
    </p>

    <div className="product-grid">
      {products.map((product, index) => (
        <div key={index} className="product-card animate-fade" style={{
   
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '80%',
          backgroundBlendMode: 'luminosity',
          backgroundColor: 'white'
        }}>
          <div className="product-content" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            height: '100%'
          }}>
            <h3 className="product-title">{product.title}</h3>
            {product.desc1 && <p>{product.desc1}</p>}
            {product.desc2 && <p>{product.desc2}</p>}
            {product.desc3 && <p>{product.desc3}</p>}
            {product.desc && <p>{product.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Catalog Section */}
      <section className="content-section section-white">
        <div className="container">
          <h2 className="section-title">Product Catalogs</h2>
          <p className="section-subtitle">
            Download our detailed product catalogs for complete specifications
          </p>

          <div className="catalog-grid">
            {catalogs.map((catalog, index) => (
              <div key={index} className="catalog-card animate-fade">

                <div className="catalog-content">
                  <h3 className="catalog-title">{catalog.title}</h3>
                  <p>{catalog.description}</p>
                  <a
                    href={catalog.pdf}
                    download
                    className="download-button"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarBattery;