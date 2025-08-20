import React, { useEffect } from "react";
import "../css/lithiumioninverter.css";
import LithiumIonInverterVideo from '../video/LithiumIon Inverters Introduction_free.mp4';
import lithiumIonBatteriescatalogue from '../assets/catalogues/(V2).pdf';
import inverterimage from '../img/lithiumintegratedinverter.JPG';
import pdfimg from '../img/pdf.png';

const catalogProduct = {
  img: "inverter-1.jpg",
  title: "",
  description: "",
  category: "",
  link: lithiumIonBatteriescatalogue
};

function LithiumIonInverter(props) {
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
              entry.target.classList.contains("why-inverter-section") ||
              entry.target.classList.contains("benefits") ||
              entry.target.classList.contains("products-section") ||
              entry.target.classList.contains("catalog-section")
            ) {
              const items = entry.target.querySelectorAll(
                ".why-inverter-item, .benefit-item, .product-card, .catalog-item"
              );
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("reveal");
                }, index * (entry.target.classList.contains("why-inverter-section") ? 100 : 150));
              });
            }
            observer.unobserve(entry.target);
            console.log(`Section visible: ${entry.target.className}`);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="inverter-wrapper">
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
          src={LithiumIonInverterVideo}
          aria-label="Introduction to Lithium-Ion Inverters at Finike Lithium"
          className="video-bg"
        />
      </section>

      <section id="features" className="why-inverter-section">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-star section-icon"></i> Why Choose Our Inverters?
          </h2>
          <div className="why-inverter-card animate-slide">
            <div className="why-inverter-list">
              <div className="why-inverter-item animate-slide">
                <i className="fas fa-tachometer-alt why-inverter-icon"></i>
                <div>
                  <h3>High Efficiency</h3>
                  <p>Up to 98% conversion efficiency to reduce energy costs and emissions.</p>
                </div>
              </div>
              <div className="why-inverter-item animate-slide">
                <i className="fas fa-leaf why-inverter-icon"></i>
                <div>
                  <h3>Eco-Friendly</h3>
                  <p>Built with recyclable materials to minimize environmental impact.</p>
                </div>
              </div>
              <div className="why-inverter-item animate-slide">
                <i className="fas fa-shield-alt why-inverter-icon"></i>
                <div>
                  <h3>Durability</h3>
                  <p>Designed for 15+ years of reliable, low-maintenance performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits">
        <div className="container">
          <h2 className="animate-letters">Key Benefits</h2>
          <div className="benefit-list">
            {[
              {
                title: "Energy Savings",
                desc: "Lower energy consumption, leading to reduced electricity costs.",
                icon: "fa-bolt",
              },
              {
                title: "Eco-Conscious Design",
                desc: "LiFePO4/Lithium technology that minimizes environmental impact.",
                icon: "fa-globe",
              },
              {
                title: "Long Lifespan",
                desc: "Provides reliable power for up to 15 years with minimal maintenance.",
                icon: "fa-clock",
              },
            ].map((benefit, index) => (
              <div key={index} className="application animate-slide">
                <i className={`fas ${benefit.icon} benefit-icon`}></i>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="comparison" className="products-section">
        <div className="container">
          <h2 className="animate-letters">Our Inverter Models</h2>
          <div className="product-grid">
            {[
              {
                img: inverterimage,
                title: "Lithium-Ion Inverter 1100VA",
                desc: "High-efficiency inverter with up to 98% conversion rate for small-scale applications.",
                alt: "Lithium-Ion Inverter 1100VA",
              },
              {
                img: inverterimage,
                title: "Lithium-Ion Inverter 2100VA",
                desc: "Reliable power solution with 98% efficiency for medium-scale needs.",
                alt: "Lithium-Ion Inverter 2100VA",
              },
              {
                img: inverterimage,
                title: "Lithium-Ion Inverter 3500VA",
                desc: "Robust inverter delivering 98% efficiency for larger residential setups.",
                alt: "Lithium-Ion Inverter 3500VA",
              },
              {
                img: inverterimage,
                title: "Lithium-Ion Inverter 5000VA",
                desc: "High-capacity inverter with 98% efficiency for commercial applications.",
                alt: "Lithium-Ion Inverter 5000VA",
              },
              {
                img: inverterimage,
                title: "Lithium-Ion Inverter 7500VA",
                desc: "Powerful inverter with 98% efficiency for heavy-duty industrial use.",
                alt: "Lithium-Ion Inverter 7500VA",
              },
              {
                img: inverterimage,
                title: "Lithium-Ion Inverter 10000VA",
                desc: "Top-tier inverter with 98% efficiency for large-scale industrial systems.",
                alt: "Lithium-Ion Inverter 10000VA",
              },
            ].map((item, index) => (
              <div key={index} className="product-card animate-slide">
                <img
                  decoding="async"
                  src={item.img}
                  alt={item.alt}
                />
                <i className="fas fa-plug product-icon"></i>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="faq">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-question-circle section-icon"></i> Frequently Asked Questions
          </h2>
          <div className="faq-list">
            {[
              {
                question: "What is a lithium-ion inverter?",
                answer:
                  "A lithium-ion inverter converts DC from a lithium-ion battery to AC, efficiently powering appliances and devices.",
              },
              {
                question: "Why choose a lithium-ion inverter?",
                answer:
                  "They provide higher efficiency, longer lifespan, and a compact design compared to lead-acid inverters.",
              },
              {
                question: "How long does a lithium-ion inverter last?",
                answer:
                  "Our inverters offer 10–15 years of reliable performance with proper maintenance.",
              },
            ].map((faq, index) => (
              <div key={index} className="faq-item animate-slide">
                <button className="faq-toggle">
                  <span>{faq.question}</span>
                </button>
                <div className="faq-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-book section-icon"></i> Lithium-Ion Inverter/UPS Catalog
          </h2>
          <p className="section-subtitle animate-slide">
            Discover our high-efficiency lithium-ion inverter designed for reliability.
          </p>
          <div className="catalog-grid">
            <div className="catalog-item animate-slide">
              <div className="catalog-card">
                <img
                  loading="lazy"
                  decoding="async"
                  src={pdfimg}
                  alt={catalogProduct.title}
                  className="catalog-image"
                />
                <div className="catalog-text">
                  <h3>{catalogProduct.title}</h3>
                  <p>{catalogProduct.description}</p>
                  <span className="category">{catalogProduct.category}</span>
                  <a
                    href={catalogProduct.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalog-link cta-button"
                    aria-label={`View ${catalogProduct.title} catalog`}
                  >
                    View Catalog
                  </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default LithiumIonInverter;