import React, { useEffect, useState, useRef } from 'react';
import '../css/about.css';

import missionImage from '../img/ourmission.jpeg';
import visionImage from '../img/ourvision.jpeg';
import solarBatteries from '../img/battery_upscayl_4x_realesrgan-x4plus.jpeg';
import evBatteries from '../img/twowheeler.JPG';
import energySystem from '../img/ess.JPG';
import 'leaflet/dist/leaflet.css';
import Wrap from './Wrap';
import Vision from './Vision';
import Choose from './Choose';

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
    <>
    <section className="hero" style={{opacity:"1"}}>
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
        <Wrap/>
        <Vision/>
        <Choose/>
        </>
  );
}

export default About;