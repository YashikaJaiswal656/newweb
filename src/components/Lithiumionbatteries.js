import React, { useEffect } from "react";
import "../css/lithiumionbatteries.css";
import Lithiumionbatteriesvideo from "../video/Introduction to LithiumIon Batteries_free.mp4";
import twowheelerbattries from "../img/twowheeler.JPG";

import twow from '../img/twow.jpeg';
import auto from '../img/auto.jpeg';
import cycle from '../img/cycle.jpeg';
import erk from '../img/erk.jpeg';
import lithiumIonBatterrycatalogue from "../assets/catalogues/final V1.pdf";
import pdfimg from "../img/pdf.png";

import twowh from '../img/twowheeler.JPG';
import threewh from '../img/threewheeler.JPG';

import golf from '../assets/images/our-services/golf-cart.jpg';

const catalogProduct = [
  {
    img: "ev-battery-1.jpg",
    title: "",
    description: "",
    category: "",
    link: lithiumIonBatterrycatalogue,
  },
];

function LithiumIonBatteries(props) {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (
              entry.target.classList.contains("products") ||
              entry.target.classList.contains("features") ||
              entry.target.classList.contains("about-ev-section") ||
              entry.target.classList.contains("catalog-section")
            ) {
              const items = entry.target.querySelectorAll(
                ".product-card, .feature-item, .why-ev-item, .catalog-item"
              );
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("reveal");
                }, index * (entry.target.classList.contains("about-ev-section") ? 100 : 150));
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

useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const headingText = "EV Batteries";
  const words = headingText.split(" ");

  return (
    <div className="ev-batteries-wrapper">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      {/*<section className="hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={Lithiumionbatteriesvideo}
          aria-label="Introduction to Lithium-Ion Batteries at Finike Lithium"
          className="video-bg"
        />
      </section>*/}
    <section id="products" className="products">
        <div className="container">
          <h2 className="animate-letters">Our Lithium-Ion EV Batteries</h2>
          <div className="product-grid">
            {[
              {
                img: twow,
                title: "Electric Two-Wheeler Battery",
                desc: "Provides enhanced acceleration, extended range, and fast charging for urban mobility.",
              },
              {
                img: erk,
                title: "E-Rickshaw Battery",
                desc: "Long-range and high-efficiency charging for e-rickshaws, ensuring reliable performance.",
              },
               
              {
                img: auto,
                title: "Electric Three-Wheeler Battery",
                desc: "High-performance battery designed for heavy-duty electric vehicles with robust energy output.",
              },
                {
                img: cycle,
                title: "Cycle",
                desc: "Designed for long-range travel and high-efficiency charging. Enjoy extended range, fast charging, and reliable performance.",
              },
              {
                img: golf,
                title: "E-Golf Cart Battery",
                desc: "Reliable and efficient power for short- to medium-range lightweight electric vehicles.",
              },
               {
                img: twowh,
                title: "Two Wheelers Batteries",
                desc: "Reliable power solution with 90% efficiency for medium-scale needs.",
              },
               {
                img: threewh,
                title: "Three Wheelers Batteries",
                desc: "Reliable power solution with 90% efficiency for medium-scale needs.",
              },
            ].map((product, index) => (
              <div key={index} className="product-card animate-slide">
                <img decoding="async" src={product.img} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      <section className="features">
        <div className="container">
          <h2 className="animate-letters">Why Choose Our Batteries?</h2>
          <div className="feature-list">
            {[
              {
                title: "Superior Performance",
                desc: "Fast acceleration and smooth operation for all types of EVs.",
                icon: "fa-tachometer-alt",
              },
              {
                title: "Extended Range",
                desc: "High-capacity batteries for fewer charging stops and more travel.",
                icon: "fa-road",
              },
              {
                title: "Eco-Friendly",
                desc: "Sustainable technology that contributes to a greener future.",
                icon: "fa-leaf",
              },
            ].map((feature, index) => (
              <div key={index} className="application animate-slide">
                <i className={`fas ${feature.icon} features-icon`}></i>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
            <section className="about-ev-section">
        <div className="container">
          <div className="revolutionizing">
            <h2 className="animate-letters">
              <i className="fas fa-bolt section-icon"></i> Powering Electric Mobility
            </h2>
            <div className="about-ev-content">
              <div className="about-ev-text animate-slide">
                <p>
                  Our lithium-ion EV batteries offer high-performance energy solutions with superior efficiency and an extended lifespan. Designed for OEMs, dealers, and enthusiasts, our batteries are driving the future of sustainable transportation.
                </p>
              </div>
              <div className="about-ev-image animate-slide">
                <img
                  decoding="async"
                  src={twowheelerbattries}
                  alt="Lithium-Ion EV Battery"
                  id="evimg"
                />
              </div>
            </div>
          </div>
          <div className="partnership">
            <h2 className="animate-letters">
              <i className="fas fa-handshake section-icon"></i> Your Partner in Sustainable Mobility
            </h2>
            <div className="why-ev-card animate-slide">
              <div className="why-ev-list">
                <div className="why-ev-item animate-slide">
                  <i className="fas fa-check-circle why-ev-icon"></i>
                  <div>
                    <h3>Quality</h3>
                    <p>Engineered for reliability and long-lasting performance.</p>
                  </div>
                </div>
                <div className="why-ev-item animate-slide">
                  <i className="fas fa-bolt why-ev-icon"></i>
                  <div>
                    <h3>Efficiency</h3>
                    <p>Optimized for rapid charging and high energy output.</p>
                  </div>
                </div>
                <div className="why-ev-item animate-slide">
                  <i className="fas fa-leaf why-ev-icon"></i>
                  <div>
                    <h3>Sustainability</h3>
                    <p>Eco-friendly design minimizes environmental impact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="catalog-section">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-book section-icon"></i> Two Wheelers and Three Wheelers Batteries
          </h2>
          <p className="section-subtitle animate-slide">
            Explore our range of lithium-ion batteries for electric vehicles, designed for performance and sustainability.
          </p>
          <div className="catalog-grid">
            {catalogProduct.map((product, index) => (
              <div key={index} className="catalog-item animate-slide">
                <div className="catalog-card">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={pdfimg}
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
    </div>
  );
}

export default LithiumIonBatteries;