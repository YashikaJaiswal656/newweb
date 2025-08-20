import React, { useEffect } from "react";
import "../css/telecombatteries.css";

import telecombatteriescatalogue from '../assets/catalogues/(V3).pdf'; 
import pdfimg from "../img/pdf.png";

import telecomaboutimg from '../img/telecomimage.jpeg';

const catalogProduct = [
  {
    img: "telecom-battery-1.jpg",
    title: "",
    description: "",
    category: "",
    link: telecombatteriescatalogue,
  },
];

function TelecomBatteries(props) {
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
              entry.target.classList.contains("about-telecom-section") ||
              entry.target.classList.contains("features") ||
              entry.target.classList.contains("catalog-section")
            ) {
              const items = entry.target.querySelectorAll(
                ".why-telecom-item, .feature-item, .catalog-item"
              );
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("reveal");
                }, index * (entry.target.classList.contains("about-telecom-section") ? 100 : 150));
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
    <div className="telecom-wrapper">
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
          
          aria-label="Introduction to Finike Lithium Telecom Batteries"
          className="video-bg"
        />
      </section>


      <section id="key-benefits" className="about-telecom-section">
        <div className="container">
          <div className="overview">
            <h2 className="animate-letters">
              <i className="fas fa-bolt section-icon"></i> Next-Generation Telecom Power
            </h2>
            <div className="about-telecom-content">
              <div className="about-telecom-text animate-slide">
                <p>
                  Finike Lithium batteries offer superior power and efficiency, ensuring seamless performance for telecom applications. Embrace sustainable energy for a greener future.
                </p>
              </div>
              <div className="about-telecom-image animate-slide">
                <img
                  decoding="async"
                  src={telecomaboutimg}
                  alt="Finike Lithium Telecom Battery"
                  id="telecombatt"
                />
              </div>
            </div>
          </div>
          <div className="key-benefits">
            <h2 className="animate-letters">
              <i className="fas fa-star section-icon"></i> Why Choose Finike Lithium?
            </h2>
            <div className="why-telecom-card animate-slide">
              <div className="why-telecom-list">
                {[
                  {
                    title: "High Power Output",
                    desc: "Delivers fast, reliable performance for telecom systems.",
                    icon: "fa-tachometer-alt",
                  },
                  {
                    title: "Extended Uptime",
                    desc: "Longer operational life with fewer recharges.",
                    icon: "fa-clock",
                  },
                  {
                    title: "Eco-Conscious Design",
                    desc: "Sustainable technology that reduces environmental impact.",
                    icon: "fa-leaf",
                  },
                  {
                    title: "Rapid Charging",
                    desc: "Minimizes downtime with quick charge cycles.",
                    icon: "fa-charging-station",
                  },
                  {
                    title: "Reliable Performance",
                    desc: "Ensures consistent power delivery in demanding conditions.",
                    icon: "fa-shield-alt",
                  },
                  {
                    title: "Optimized Efficiency",
                    desc: "Low energy loss for maximum output and performance.",
                    icon: "fa-bolt",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="why-telecom-item animate-slide">
                    <i className={`fas ${benefit.icon} why-telecom-icon`}></i>
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-cogs section-icon"></i> Cutting-Edge Features
          </h2>
          <div className="feature-list">
            {[
              {
                title: "Ultra-Fast Charging",
                desc: "Reduces downtime with rapid charging technology",
                icon: "fa-charging-station",
              },
              {
                title: "Extended Lifespan",
                desc: "Delivers years of reliable service for telecom networks.",
                icon: "fa-battery-full",
              },
              {
                title: "High Efficiency",
                desc: "Minimizes energy loss for optimal performance.",
                icon: "fa-rocket",
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

      <section className="faq">
        <div className="container">
          <h2 className="animate-letters">
            <i className="fas fa-question-circle section-icon"></i> Frequently Asked Questions
          </h2>
          <div className="faq-list">
            {[
              {
                question: "Why are Finike Lithium batteries ideal for telecom?",
                answer:
                  "Our batteries provide high efficiency, rapid charging, and reliable performance, ensuring uninterrupted power for telecom networks.",
              },
              {
                question: "What is the lifespan of these batteries?",
                answer:
                  "Engineered for durability, our batteries offer years of reliable service with minimal maintenance.",
              },
              {
                question: "Are these batteries eco-friendly?",
                answer:
                  "Yes, our lithium-ion batteries are designed for sustainability, reducing your environmental footprint.",
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
            <i className="fas fa-book section-icon"></i> Telecom Battery Catalog
          </h2>
          <p className="section-subtitle animate-slide" id="telecomcontent">
            Explore our range of lithium-ion batteries designed for telecom applications, ensuring reliability and efficiency.
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

export default TelecomBatteries;