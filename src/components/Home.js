import React from 'react';
import '../css/home.css';


import WhoTh from './Whoth';
import OurProduct from './OurProduct';
import Mission from './Mission';
import Card from './Card';
import Range from './Range';
function Home() {

  return (
    


    <>
   <section className="slider-section" style={{opacity:"1"}}>
        <div className="video-overlay"></div>
        <video autoPlay loop muted playsInline className="video-bg" id='homevd' aria-label="Finike Lithium manufacturing overview">
          <source src="https://finikelithium.com/static/media/Lithium%20Manufacturing%20Company_free.a8d255ac8824f0ce25f4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

  <WhoTh/>
  <OurProduct/>
  <Mission/>
  <Card/>
  <Range/>
    
    </>
  );
}

export default Home;