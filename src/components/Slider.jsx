import React, { useState, useEffect } from 'react';

const slides = [
  {
    img: "https://thumbs.dreamstime.com/b/solar-panels-bathed-pink-light-symbolize-bright-future-renewable-energy-image-conveys-clean-power-generation-379503001.jpg",
    title: "About Our Company",
    text: "Innovative Energy Solutions"
  },
  {
    img: "https://t4.ftcdn.net/jpg/15/98/41/39/360_F_1598413914_XNraXHs6zY1XWmFQ19ffz1mYqgReNPJr.jpg",
    title: "Power with Purpose",
    text: "Renewable Energy for All"
  },
  {
    img: "https://cdn.pixabay.com/photo/2022/01/10/15/29/wind-mills-6928590_640.jpg",
    title: "Go Green",
    text: "Clean Energy from Nature"
  },
  {
    img: "https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-scenic-sunset-with-blue-sky-showcasing-3d-rendered-solar-power-generation-image_3681955.jpg",
    title: "Future Ready",
    text: "Smart & Sustainable Power"
  }
];
const Slider = () => {
     const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

 
  return (
    
      <div className="slider-container">
        <div className="slider-wrapper" style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map((slide, index) => (
            <div className="slide" key={index} style={{ backgroundImage: `url(${slide.img})` }}>
              <div className="blur">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow left" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="arrow right" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

  )
}

export default Slider