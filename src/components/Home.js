import React, { useEffect } from 'react';
import '../css/home.css';
import bannervideo from '../video/Lithium Manufacturing Company_free.mp4';
import mohalifactoryimg from '../img/mohali factory.jpg';
import rajpurafactoryimg from '../img/rajpura-factory-working.jpg';
import batteryimg from '../img/image.jpg';
import essImage from '../img/telecomimage.jpeg';
import ecycelimage from '../img/ecycelimage.JPG';
import essbssimage from '../img/essimage.jpeg';

import solarimage from '../img/solarimage.jpeg';

import lithiumintegratedimage from '../img/lithiumintegratedinverter.JPG';
import lithiumbattries from '../img/lithiumbatteriesforinverter.JPG';
import twowheelerimg from '../img/twowheeler.JPG';
import threewheelerimg from '../img/threewheeler.JPG';
import metrialhandling from '../assets/images/our-services/material-handling-traction.jpg';
import golfcartimage from '../assets/images/our-services/golf-cart.jpg';
import finikelithium3 from '../assets/images/products/finike-lithium-3.jpg';
import finikelithium4 from '../assets/images/products/finike-lithium-4.jpg';
import finikelithium5 from '../assets/images/products/finike-lithium-5.jpg';
import finikelithium6 from '../assets/images/products/finike-lithium-6.jpeg';
import finikelithium7 from '../assets/images/products/finike-lithium-7.jpg';
import finikelithium8 from '../assets/images/products/finike-lithium-8.jpg';
import finikelithium10 from '../assets/images/products/finike-lithium-10.jpg';
const BASE_IMAGE_URL = 'https://finikelithium.com/wp-content/themes/finikelithium/assets/images';

const projects = [
  { img: mohalifactoryimg, description: 'Mohali Facility', title: 'Manufacturing Plant', isLocal: true },
  { img: rajpurafactoryimg, description: 'Rajpura Facility', title: 'Manufacturing Plant', isLocal: true },
  { img: finikelithium3, description: '', title: 'Battery Testing System',isLocal: true },
  { img: finikelithium4, description: '', title: 'Module Testing System',isLocal: true },
  { img: finikelithium5, description: '', title: 'Pack Testing System' ,isLocal: true},
  { img: finikelithium6, description: '', title: 'Battery Testing System' ,isLocal: true},
  { img: finikelithium7, description: '', title: 'Auto Calibration' ,isLocal: true},
  { img: finikelithium8, description: '', title: 'Internal Resistance Testing' ,isLocal: true},
  { img: finikelithium10, description: '', title: 'Lithium ESS Product Range' ,isLocal: true},
];

const features = [
  { img: lithiumintegratedimage, title: 'Lithium Integrated Inverters/UPS' ,isLocal: true},
  { img: lithiumbattries, title: 'Lithium batteries for inverters' ,isLocal: true},
  { img: essImage, title: 'Lithium batteries for TELECOM/ESS/Solar', isLocal: true },
  { img: essbssimage, title: 'Energy Storage Systems (ESS/BSS/Solar)' ,isLocal: true},
  { img: twowheelerimg, title: 'Lithium batteries for Two-Wheelers(EV)' ,isLocal: true},
  { img: threewheelerimg, title: 'Lithium batteries for Three-Wheelers(EV)' ,isLocal: true},
  { img: ecycelimage, title: 'E-Cycle Lithium Battery' ,isLocal: true},
  { img: solarimage, title: 'Solar Lithium Battery' ,isLocal: true},
  { img: metrialhandling, title: 'Lithium batteries for Material Handling & Traction' ,isLocal: true},
  { img: golfcartimage, title: 'Lithium batteries for Golf Carts' ,isLocal: true},

];

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(`Section visible: ${entry.target.className}`);
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('project-section') || entry.target.classList.contains('feature-section')) {
              const items = entry.target.querySelectorAll('.grid-item');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('reveal');
                  console.log(`Revealing item ${index} in ${entry.target.className}`);
                }, index * 150);
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('visible');
      }
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-wrapper">
      {/* Slider Section */}
      <section className="slider-section">
        <div className="video-overlay"></div>
        <video autoPlay loop muted playsInline className="video-bg" id='homevd' aria-label="Finike Lithium manufacturing overview">
          <source src={bannervideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Company Intro Section with Promoter */}
      <section className="intro-section">
        <div className="container">
          <h2 className="whoweare">Who We Are</h2>
          <div className="intro-content">
            <div className="intro-text">
              <p className="animate-slide">
                Finike Lithium is at the forefront of lithium-ion battery innovation, dedicated to powering a sustainable future. Operating state-of-the-art manufacturing facilities in Rajpura, we specialize in high-performance LiFePO4/Lithium batteries and advanced Battery Management Systems (BMS). Our solutions drive a wide range of applications, from electric mobility to renewable energy storage, ensuring reliability, safety, and efficiency.
              </p>
              <p className="animate-slide">
                Our capabilities are strengthened by our promoter,{' '}
                <a href="https://spinoff.in/" className="highlight-link">
                  Spinoff Technopark Ltd.
                </a>
                , Punjab’s leading manufacturer of in-house LED solutions. Renowned for its expertise in solar energy, LED lighting, and security surveillance systems. This strategic partnership empowers us to deliver cutting-edge energy solutions worldwide.
              </p>
            </div>
            <div className="intro-image">
              <img
                src={rajpurafactoryimg}
                alt="Finike Lithium Rajpura manufacturing facility"
                className="animate-zoom"
                loading="lazy"
                id="introimg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                  console.error('Intro image failed to load: Rajpura factory');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title animate-letters">Our Products</h2>
          <div className="about-content">
            <div className="about-text">
              <h3 className="animate-letters">Key Features</h3>
              <ul className="animate-slide">
                <li>LiFePO4 lithium-ion batteries with a 10–12-year lifespan, free from acid hazards.</li>
                <li>Pure sine wave output for reliable and consistent power delivery.</li>
                <li>DSP and ASIC technology for superior safety and efficiency.</li>
                <li>Advanced BMS with low- and high-voltage cut-off protection.</li>
                <li>Dual LCD/LED display for intuitive status monitoring.</li>
                <li>UPS mode for stable voltage output during power fluctuations.</li>
                <li>Portable, user-friendly design for seamless installation.</li>
                <li>Low power consumption for eco-conscious operation.</li>
                <li>25A fast charging for cost-effective and rapid recharging.</li>
                <li>Comprehensive protection against electrical faults.</li>
                <li>Maintenance-free UPS/inverter system for long-term reliability.</li>
              </ul>
              <div className="about-counter animate-slide">
                <h4>Future Goal</h4>
                <div className="counter-number">
                  <span className="counter">5</span>
                  <strong>GWh</strong>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img
                src={batteryimg}
                alt="Finike Lithium battery production line"
                className="animate-zoom"
                loading="lazy"
                id="aboutimg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                  console.error('Product image failed to load: Battery production line');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-area">
        <div className="container">
          <h2 className="section-title animate-letters">Mission & Vision</h2>
          <p className="mission-quote animate-slide">
            “Partnering to deliver innovative energy solutions for a sustainable planet.”
          </p>
        </div>
      </section>

      {/* Project Section */}
      <section className="project-section">
        <div className="container">
          <h2 className="section-title animate-letters">Our Infrastructure</h2>
          <div className="project-grid">
            {projects.map((item, index) => (
              <div key={index} className="grid-item">
                <div className="project-card">
                  <img
                    src={item.isLocal ? item.img : `${BASE_IMAGE_URL}/products/${item.img}`}
                    alt={`Finike Lithium ${item.title} at ${item.description}`}
                    className="animate-zoom"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                      console.error(`Project image failed: ${item.img}, URL: ${item.isLocal ? 'Local' : `${BASE_IMAGE_URL}/products/${item.img}`}`);
                    }}
                  />
                  <div className="project-item-text">
                    <p>{item.description}</p>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <div className="container">
          <h2 className="section-title animate-letters">Lithium Battery Product Range</h2>
          {/*<p className="section-subtitle animate-slide">
            We develop innovative solutions across diverse sectors using advanced cell chemistries. Our in-house Battery Management System (BMS) is rigorously tested to ensure exceptional performance.
          </p>*/}
          <p className="section-subtitle animate-slide">
          We deliver advanced energy solutions across key sectors using cutting-edge 
          cell chemistries. Our in-house Battery Management System (BMS) is 
          precision-engineered and tested for superior performance and reliability </p>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className="grid-item">
                <div className="feature-card">
                  <img
                    src={feature.isLocal ? feature.img : `${BASE_IMAGE_URL}/our-services/${feature.img}`}
                    alt={`Finike Lithium ${feature.title} product for ${feature.title.toLowerCase()} applications`}
                    className="animate-zoom"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Available';
                      console.error(`Feature image failed: ${feature.img}, URL: ${feature.isLocal ? 'Local' : `${BASE_IMAGE_URL}/our-services/${feature.img}`}`);
                    }}
                  />
                  <h3>{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;