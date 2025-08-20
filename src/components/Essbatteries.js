import React, { useEffect } from "react";
import "../css/essbatteries.css";
import telecombattery from "../video/Introduction to ESS Battery at Finike Lithium_free.mp4";
import essbatteriesimg from "../img/essimage.jpeg";
import essBatteriescatalogue from "../assets/catalogues/(V3).pdf"; 
import pdfimg from "../img/pdf.png";

import essimage from '../img/telecomimage.jpeg';
const catalogProduct = [
  {
    img: "ess-battery-1.jpg",
    title: "",
    description: "",
    category: "",
    link: essBatteriescatalogue,
  },
];

function EssBatteries(props) {
  useEffect(() => {
    const toggles = document.querySelectorAll(".faq-toggle");

    const handleToggle = (e) => {
      const toggle = e.currentTarget;
      const content = toggle.nextElementSibling;
      const isActive = content.classList.contains("active");

      document.querySelectorAll(".faq-content.active").forEach((item) => {
        item.classList.remove("active");
        item.previousElementSibling.classList.remove("active");
      });

      if (!isActive) {
        content.classList.add("active");
        toggle.classList.add("active");
      }
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", handleToggle);
    });

    return () => {
      toggles.forEach((toggle) => {
        toggle.removeEventListener("click", handleToggle);
      });
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (
              entry.target.classList.contains("benefits-section") ||
              entry.target.classList.contains("applications-section") ||
              entry.target.classList.contains("gallery-section") ||
              entry.target.classList.contains("about-ess-section") ||
              entry.target.classList.contains("catalog-section")
            ) {
              const items = entry.target.querySelectorAll(
                ".benefit-item, .application, .gallery-item, .why-finike-item, .catalog-item"
              );
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("reveal");
                }, index * (entry.target.classList.contains("why-finike") ? 100 : 150));
              });
            }
            observer.unobserve(entry.target);
            console.log(`Section visible: ${entry.target.className}`);
          } else {
            console.log(
              `Section not visible: ${entry.target.className}, ` +
                `intersectionRatio: ${entry.intersectionRatio}, ` +
                `boundingClientRect: top=${entry.boundingClientRect.top}, ` +
                `bottom=${entry.boundingClientRect.bottom}`
            );
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -50px 0px" }
    );

    sections.forEach((section) => {
      observer.observe(section);
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add("visible");
        console.log(`Initial visibility set for: ${section.className}, top=${rect.top}, bottom=${rect.bottom}`);
      }
    });

    const timeout = setTimeout(() => {
      sections.forEach((section) => {
        if (!section.classList.contains("visible")) {
          section.classList.add("visible");
          console.log(`Forced visibility for section: ${section.className}`);
        }
      });
    }, 1000);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="ess-batteries-wrapper">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <section className="hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={telecombattery}
          aria-label="Introduction to ESS Battery at Finike Lithium"
          className="video-bg"
        />
      </section>
      <section className="about-ess-section">
        <div className="container">
          <div className="about-ess">
            <h2 className="animate-letters">About ESS Batteries</h2>
            <div className="about-ess-content">
              <div className="about-ess-text animate-slide">
                <p>
                  Energy Storage Systems (ESS) leverage advanced LiFePO4 lithium-ion technology to efficiently store excess energy from renewable sources like solar and wind. ESS enhance grid stability, offer reliable backup power, and optimize energy management for homes, businesses, and utilities.
                </p>
              </div>
              <div className="about-ess-image animate-slide">
                <img
                  decoding="async"
                  src={essbatteriesimg}
                  alt="Finike Lithium ESS Battery"
                  id="essaboutimg"
                />
              </div>
            </div>
          </div>
          <div className="why-finike">
            <h2 className="animate-letters">
              <i className="fas fa-check-circle section-icon"></i> Why Choose Finike ESS?
            </h2>
            <div className="why-finike-card animate-slide">
              <div className="why-finike-list">
                <div className="why-finike-item animate-slide">
                  <i className="fas fa-bolt why-finike-icon"></i>
                  <div>
                    <h3>High Efficiency</h3>
                    <p>Optimize energy use with superior charge-discharge efficiency.</p>
                  </div>
                </div>
                <div className="why-finike-item animate-slide">
                  <i className="fas fa-expand why-finike-icon"></i>
                  <div>
                    <h3>Scalability</h3>
                    <p>Perfect for residential, commercial, and grid-scale applications.</p>
                  </div>
                </div>
                <div className="why-finike-item animate-slide">
                  <i className="fas fa-shield why-finike-icon"></i>
                  <div>
                    <h3>Longevity</h3>
                    <p>Designed for over 10 years of reliable performance with minimal maintenance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="benefits-section">
        <div className="container">
          <h2 className="animate-letters">Benefits of Finike ESS Batteries</h2>
          <div className="benefit-list">
            <div className="application animate-slide">
              <i className="fas fa-clock benefit-icon"></i>
              <h3>Extended Lifespan</h3>
              <p>Offers 10+ years of consistent performance with minimal degradation.</p>
            </div>
            <div className="application animate-slide">
              <i className="fas fa-dollar-sign benefit-icon"></i>
              <h3>Cost Savings</h3>
              <p>Reduces energy costs through efficient storage and grid independence.</p>
            </div>
            <div className="application animate-slide">
              <i className="fas fa-leaf benefit-icon"></i>
              <h3>Sustainable</h3>
              <p>Supports clean energy by storing renewable power.</p>
            </div>
            <div className="application animate-slide">
              <i className="fas fa-shield-alt benefit-icon"></i>
              <h3>Enhanced Safety</h3>
              <p>Equipped with an advanced Battery Management System (BMS) to prevent overcharging and thermal issues.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="animate-letters">How Finike ESS Works</h2>
          <div className="how-it-works-content">
            <div className="how-it-works-text">
              <div className="step animate-slide">
                <i className="fas fa-solar-panel step-icon"></i>
                <div>
                  <h3>Energy Capture</h3>
                  <p>Captures surplus energy from solar panels or wind turbines.</p>
                </div>
              </div>
              <div className="step animate-slide">
                <i className="fas fa-battery-half step-icon"></i>
                <div>
                  <h3>Storage</h3>
                  <p>Safely stores energy in advanced LiFePO4 lithium-ion cells for efficient use.</p>
                </div>
              </div>
              <div className="step animate-slide">
                <i className="fas fa-plug step-icon"></i>
                <div>
                  <h3>Distribution</h3>
                  <p>Distributes stored energy on demand, ensuring reliable power whenever needed.</p>
                </div>
              </div>
            </div>
            <div className="how-it-works-image animate-slide">
              <img
                decoding="async"
                src={essimage}
                alt="Finike Lithium ESS Battery"
                id="essuseimg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="applications-section">
        <div className="container">
          <h2 className="animate-letters">Applications</h2>
          <div className="applications-container">
            <div className="application animate-slide">
              <i className="fas fa-home application-icon"></i>
              <h3>Residential</h3>
              <p>Powers homes with solar energy for an uninterrupted supply.</p>
            </div>
            <div className="application animate-slide">
              <i className="fas fa-building application-icon"></i>
              <h3>Commercial</h3>
              <p>Reduces costs and ensures backup power for businesses.</p>
            </div>
            <div className="application animate-slide">
              <i className="fas fa-solar-panel application-icon"></i>
              <h3>Renewable Integration</h3>
              <p>Stores solar and wind energy for consistent, clean power.</p>
            </div>
            <div className="application animate-slide">
              <i className="fas fa-industry application-icon"></i>
              <h3>Industrial</h3>
              <p>Supports large-scale operations with scalable energy storage solutions.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="container">
          <h2 className="animate-letters">Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item animate-slide">
              <button className="faq-toggle">
                <span>
                  <i className="fas fa-question-circle faq-icon"></i> What is an ESS battery?
                </span>
                <i className="fas fa-chevron-down faq-toggle-icon"></i>
              </button>
              <div className="faq-content">
                <p>
                  An ESS battery stores electricity for later use, enabling renewable energy integration and providing backup during outages.
                </p>
              </div>
            </div>
            <div className="faq-item animate-slide">
              <button className="faq-toggle">
                <span>
                  <i className="fas fa-question-circle faq-icon"></i> How long do Finike ESS batteries last?
                </span>
                <i className="fas fa-chevron-down faq-toggle-icon"></i>
              </button>
              <div className="faq-content">
                <p>
                  Finike ESS batteries are designed to last over 10 years with minimal maintenance.
                </p>
              </div>
            </div>
            <div className="faq-item animate-slide">
              <button className="faq-toggle">
                <span>
                  <i className="fas fa-question-circle faq-icon"></i> Are Finike ESS batteries safe?
                </span>
                <i className="fas fa-chevron-down faq-toggle-icon"></i>
              </button>
              <div className="faq-content">
                <p>
                  Yes, they include an advanced BMS to protect against overcharging, overheating, and short circuits.
                </p>
              </div>
            </div>
            <div className="faq-item animate-slide">
              <button className="faq-toggle">
                <span>
                  <i className="fas fa-question-circle faq-icon"></i> Can Finike ESS work with my solar system?
                </span>
                <i className="fas fa-chevron-down faq-toggle-icon"></i>
              </button>
              <div className="faq-content">
                <p>
                  Yes, Finike ESS batteries are compatible with most solar inverters and energy management systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="catalog-section">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-book section-icon"></i> ESS Battery Catalog
          </h2>
          <p className="section-subtitle animate-slide">
            Discover our range of Energy Storage Systems designed for efficiency and reliability.
          </p>
          <div className="catalog-grid">
            {catalogProduct.map((product, index) => (
              <div key={index} className="catalog-item animate-slide">
                <div className="catalog-card">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={pdfimg} // Could use product.img if desired
                    alt={product.title}
                    className="catalog-image"
                  />
                  <div className="catalog-text">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <span className="category">{product.category}</span>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="catalog-link cta-button"
                      aria-label={`View ${product.title} catalog`}
                      onClick={() => console.log(`Catalog link clicked: ${product.link}`)} // Debugging
                    >
                      View Catalog
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commented-out Gallery Section */}
      {/*<section className="gallery-section">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-images gallery-icon"></i> Image Gallery
          </h2>
          <div className="gallery-grid">
            <div className="gallery-item animate-slide">
              <img
                src="https://source.unsplash.com/400x300/?battery"
                alt="ESS Battery Installation"
              />
            </div>
            <div className="gallery-item animate-slide">
              <img
                src="https://source.unsplash.com/400x300/?solar-panel"
                alt="Solar Integration"
              />
            </div>
            <div className="gallery-item animate-slide">
              <img
                src="https://source.unsplash.com/400x300/?energy-storage"
                alt="Battery Module"
              />
            </div>
            <div className="gallery-item animate-slide">
              <img
                src="https://source.unsplash.com/400x300/?renewable-energy"
                alt="Renewable Energy System"
              />
            </div>
          </div>
        </div>
      </section>*/}
    </div>
  );
}

export default EssBatteries;