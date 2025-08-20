import React, { useEffect, useState, useRef } from 'react';
import '../css/about.css';
import lithiumVideo from '../video/mfact.mp4';
import missionImage from '../img/ourmission.jpeg';
import visionImage from '../img/ourvision.jpeg';
import solarBatteries from '../img/battery_upscayl_4x_realesrgan-x4plus.jpeg';
import evBatteries from '../img/twowheeler.JPG';
import energySystem from '../img/ess.JPG';
import 'leaflet/dist/leaflet.css';

function About() {
  const [MapComponents, setMapComponents] = useState(null);
  const [mapError, setMapError] = useState(null);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    console.log('About: Starting dynamic import for map...');

    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet').then((module) => {
          console.log('About: react-leaflet imported successfully');
          return {
            MapContainer: module.MapContainer,
            TileLayer: module.TileLayer,
            Marker: module.Marker,
            Popup: module.Popup,
            useMap: module.useMap,
          };
        }).catch((err) => {
          console.error('About: Failed to load react-leaflet:', err);
          if (isMounted.current) setMapError('Failed to load react-leaflet library');
          throw err;
        }),
        import('leaflet').then((L) => {
          console.log('About: leaflet imported successfully');
          delete L.default.Icon.Default.prototype._getIconUrl;
          L.default.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowChevalier: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
          return L;
        }).catch((err) => {
          console.error('About: Failed to load leaflet:', err);
          if (isMounted.current) setMapError('Failed to load Leaflet library');
          throw err;
        }),
      ])
        .then(([mapComponents]) => {
          if (isMounted.current) {
            setMapComponents(mapComponents);
            console.log('About: Map components loaded');
          }
        })
        .catch((err) => {
          console.error('About: Promise.all error:', err);
        });
    } else {
      console.warn('About: Window is undefined, skipping import');
      setMapError('Window is not defined');
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const MapEffect = ({ mapRef }) => {
    const map = MapComponents?.useMap();

    useEffect(() => {
      if (map && mapContainerRef.current) {
        console.log('About: Map instance obtained');
        const invalidateMapSize = () => {
          map.invalidateSize();
          console.log('About: Map size invalidated');
        };

        const timeoutId = setTimeout(invalidateMapSize, 200);

        const handleResize = () => {
          invalidateMapSize();
        };
        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                invalidateMapSize();
                console.log('About: Map container is visible, invalidated size');
              }
            });
          },
          { threshold: 0.1 }
        );

        if (mapContainerRef.current) {
          observer.observe(mapContainerRef.current);
        }

        return () => {
          clearTimeout(timeoutId);
          window.removeEventListener('resize', handleResize);
          if (mapContainerRef.current) {
            observer.unobserve(mapContainerRef.current);
          }
        };
      }
    }, [map]);

    mapRef.current = map;
    return null;
  };

  useEffect(() => {
    console.log('About: Initializing IntersectionObserver');
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('About: Section visible:', entry.target.className);
            entry.target.classList.add('visible');
            if (entry.target.className.includes('why-choose-us')) {
              const items = entry.target.querySelectorAll('.choose-item');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('reveal');
                }, index * 150);
              });
            }
            if (entry.target.classList.contains('branch-offices')) {
              const mapContainer = entry.target.querySelector('.map-container');
              if (mapContainer) {
                mapContainer.style.display = 'block';
                mapContainer.style.visibility = 'visible';
                mapContainer.style.opacity = '1';
                if (mapRef.current) {
                  setTimeout(() => mapRef.current.invalidateSize(), 200);
                }
              }
            }
            if (!entry.target.classList.contains('branch-offices')) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        console.log('About: Section initially visible:', section.className);
        section.classList.add('visible');
        // Force map visibility if branch-offices is in viewport
        if (section.classList.contains('branch-offices')) {
          const mapContainer = section.querySelector('.map-container');
          if (mapContainer) {
            mapContainer.style.display = 'block';
            mapContainer.style.visibility = 'visible';
            mapContainer.style.opacity = '1';
            // Trigger map resize
            if (mapRef.current) {
              setTimeout(() => mapRef.current.invalidateSize(), 200);
            }
          }
        }
      }
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [MapComponents]); // Re-run if MapComponents changes

  const headingText = 'Empowering a Sustainable Future';
  const words = headingText.split(' ');

  // Branch offices data
  const branchOffices = [
    { name: 'Chandigarh', position: [30.7333, 76.7794] },
    { name: 'Rajpura', position: [30.4833, 76.5923] },
    { name: 'Patna', position: [25.5941, 85.1376] },
    { name: 'Jharkhand', position: [23.3441, 85.3096] },
    { name: 'Jammu', position: [32.7266, 74.8570] },
    { name: 'Delhi', position: [28.7041, 77.1025] },
  ];

  return (
    <div className="about-wrapper">
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-letters">
            {words.map((word, index) => (
              <span key={index} className="word" data-word={index}>
                {word}&nbsp;
              </span>
            ))}
          </h1>
          <p className="animate-slide" id="about-slied">
            Finike Lithium provides innovative lithium-ion battery solutions for electric vehicles and renewable energy, driving a sustainable future.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <h2 className="animate-letters">About Us</h2>
          {/*<p className="animate-slide" id="about-text">
            Finike Lithium is a pioneer in advanced lithium-ion battery technology.
            Headquartered in Chandigarh with a factory in Punjab, India, and various zonal and regional presences across the country, we specialize in high-performance energy
            storage for electric vehicles, solar systems, and industrial applications.
            Our dedication to innovation and sustainability positions us as a trusted
            partner in the global shift to clean energy, delivering reliable,
            efficient batteries that reduce carbon emissions.
          </p>*/}
          <p className="animate-slide" id="about-text">
            Finike Lithium is a pioneer in advanced 
            lithium-ion battery technology, delivering high-performance energy 
            storage solutions for EVs, solar systems, and industrial applications. 
            Headquartered in Chandigarh, with a manufacturing facility in Punjab 
            and a nationwide presence, we are committed to innovation and sustainability.
             Our reliable, efficient batteries support the global transition to clean 
             energy by 
            reducing carbon emissions and powering a greener future.
          </p>
        </div>
      </section>

      <section className="mission-vision">
        <div className="container">
          <div className="image-box">
            <figure className="image-box-img">
              <img
                decoding="async"
                src={missionImage}
                alt="Our Mission"
                className="grow-animation"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                  console.error('Mission image failed to load');
                }}
              />
            </figure>
            <div className="image-box-content">
              <h3 className="animate-letters">Our Mission</h3>
              {/*<p className="animate-slide" id="mission-text">
                To accelerate clean energy adoption with cutting-edge lithium-ion battery solutions, empowering businesses and communities with efficient, sustainable energy storage while upholding the highest standards of quality and reliability.
              </p>*/}
              <p className="animate-slide" id="mission-text">
                To accelerate the adoption of clean energy through advanced lithium-ion battery solutions, empowering businesses and communities with efficient, sustainable power storage while upholding the highest standards of quality, safety, and reliability.
              </p>
            </div>
          </div>
          <div className="image-box reverse">
            <figure className="image-box-img">
              <img
                decoding="async"
                src={visionImage}
                alt="Our Vision"
                className="grow-animation"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                  console.error('Vision image failed to load');
                }}
              />
            </figure>
            <div className="image-box-content">
              <h3 className="animate-letters">Our Vision</h3>
             {/* <p className="animate-slide" id="vision-text">
                A world powered by renewable energy, where our advanced battery technologies enable seamless integration of clean energy into transportation, industry, and beyond, fostering a resilient, sustainable ecosystem.
              </p>*/}
              <p className="animate-slide" id="vision-text">
               To create a world powered by renewable energy, where our advanced battery technologies enable the seamless integration of clean power into transportation, industry, and daily life—building a resilient and sustainable ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="container">
          <h2 className="animate-letters">Why Choose Finike Lithium?</h2>
          <div className="choose-list">
            <div className="choose-item">
              <i className="fas fa-battery-full"></i>
              <h4>Battery Life</h4>
              <p>High energy density for extended range and reliable performance in EVs and energy storage systems.</p>
            </div>
            <div className="choose-item">
              <i className="fas fa-bolt-lightning"></i>
              <h4>Charging Time</h4>
              <p>Fast-charging technology minimizes downtime and enhances efficiency.</p>
            </div>
            <div className="choose-item">
              <i className="fas fa-recycle"></i>
              <h4>Maintenance</h4>
              <p>Durable, recyclable batteries with minimal upkeep and eco-friendly benefits.</p>
            </div>
            <div className="choose-item">
              <i className="fas fa-coins"></i>
              <h4>Charging Cost</h4>
              <p>Efficient batteries reduce charging costs for both personal and commercial use.</p>
            </div>
            <div className="choose-item">
              <i className="fas fa-wallet"></i>
              <h4>Cost Efficiency</h4>  
              <p>Long-lasting batteries that lower replacement and maintenance costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="our-products" id="our-solutions">
        <div className="container">
          <h2 className="animate-letters">Our Solutions</h2>
          <p className="animate-slide">
            Explore our high-performance lithium-ion battery systems, designed for reliability and sustainability across diverse applications.
          </p>
          <div className="product-grid">
            <div className="product-item">
              <img
                decoding="async"
                src={evBatteries}
                alt="Electric Vehicle Batteries"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  console.error('EV Batteries image failed to load');
                }}
              />
              <h4>Electric Vehicle Batteries</h4>
              <p>High-capacity lithium-ion batteries for electric vehicles, offering extended range and superior efficiency.</p>
            </div>
            <div className="product-item">
              <img
                decoding="async"
                src={solarBatteries}
                alt="Solar Batteries"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  console.error('Solar Batteries image failed to load');
                }}
              />
              <h4>Solar Batteries</h4>
              <p>Reliable energy storage solutions for solar systems, enabling consistent power for homes and businesses.</p>
            </div>
            <div className="product-item">
              <img
                decoding="async"
                src={energySystem}
                alt="Energy Storage Systems"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  console.error('Energy Storage image failed to load');
                }}
              />
              <h4>Energy Storage Systems</h4>
              <p>Scalable lithium-ion systems for industrial and commercial applications, ensuring uninterrupted power supply.</p>
            </div>
          </div>
        </div>
      </section>*/}

      {/*<section className="branch-offices">
        <div className="container">
          <h2 className="animate-letters">Our Branch Offices</h2>
          <p className="animate-slide">
            Finike Lithium is proud to serve across India with offices in key locations, ensuring accessibility and support for our innovative energy solutions.
          </p>
          {mapError ? (
            <div style={{ color: 'red' }}>Error loading map: {mapError}</div>
          ) : !MapComponents ? (
            <div>Loading map...</div>
          ) : (
            <div
              ref={mapContainerRef}
              className="map-container"
              style={{
                height: '400px',
                width: '100%',
                marginTop: '2rem',
                border: '2px solid #ccc',
                backgroundColor: '#f0f0f0',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <MapComponents.MapContainer
                center={[22.5, 80.5]} // Center of India
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                whenCreated={(map) => {
                  console.log('About: MapContainer created');
                  mapRef.current = map;
                  setTimeout(() => map.invalidateSize(), 200); // Ensure map renders
                }}
              >
                <MapEffect mapRef={mapRef} />
                <MapComponents.TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {branchOffices.map((office, index) => (
                  <MapComponents.Marker key={index} position={office.position}>
                    <MapComponents.Popup>{office.name}</MapComponents.Popup>
                  </MapComponents.Marker>
                ))}
              </MapComponents.MapContainer>
            </div>
          )}
        </div>
      </section>*/}

     {/* <section className="video-section">
        <div className="container">
          <h2 className="animate-letters">Our Journey in Action</h2>
          <p className="animate-slide">
            See how Finike Lithium is shaping a sustainable future with innovative lithium-ion battery solutions.
          </p>
          <div className="video-container">
            <video controls>
              <source src={lithiumVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>*/}
    </div>
  );
}

export default About;