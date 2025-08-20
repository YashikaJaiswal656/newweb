import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Contactus from './components/Contactus';
import Essbatteries from './components/Essbatteries';
import Footer from './components/Footer';
import Home from './components/Home';
import Lithiumionbatteries from './components/Lithiumionbatteries';
import Lithiumioninverter from './components/Lithiumioninverter';
import Navbar from './components/Navbar';
import Telecombatteries from './components/Telecombatteries';
import WarrantyRegister from './components/Warrantyregister';
import Getquote from './components/Getquote';
import Techsupport from './components/Technicalsupport';
import Ecom from './components/Ecom';
import Cart from './components/CartModal';
import Productdetail from './components/ProductDetailsModal';
import Solarbatteries from './components/Solarbattery';
import BuyNow from './components/BuyNow';
import Checkout from './components/CheckoutPage';
import Customersupport from './components/Customersupport';
import OnlinePayment from './components/OnlinePayment';
/*import CouponBanner from './components/CouponBanner';*/

import Privacypolicy from './components/Privacypolicy';
import Termsandconditions from './components/Termsandconditions';
import Cancellationrefundpolicy from './components/Cancellationrefundpolicy';
import Shippingpolicy from './components/Shippingpolicy';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const validPincodes = ['140401', '140402', '140403'];

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div>
               {/* <CouponBanner />*/}
        <Navbar cart={cart} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contactus />} />
            <Route path="/ess-batteries" element={<Essbatteries />} />
            <Route path="/lithiumion-batteries" element={<Lithiumionbatteries />} />
            <Route path="/lithiumion-inverter" element={<Lithiumioninverter />} />
            <Route path="/telecom-batteries" element={<Telecombatteries />} />
            <Route path="/solar-batteries" element={<Solarbatteries />} />
            <Route path="/warranty" element={<WarrantyRegister />} />
            <Route path="/technical-support" element={<Techsupport />} />
            <Route path="/get-quote" element={<Getquote />} />
            <Route path="/customer-support" element={<Customersupport />} />
            <Route path="/shop-online" element={<Ecom cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/productDetail/:productId" element={<Productdetail cart={cart} setCart={setCart} />} />
            <Route path="/buy-now/:productId" element={<BuyNow />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} validPincodes={validPincodes} />} />
            <Route path="/online-payment" element={<OnlinePayment />} />

            <Route path="/privacypolicy" element={<Privacypolicy />} />
            <Route path="/termsandconditions" element={<Termsandconditions />} />
            <Route path="/cancellationrefundpolicy" element={<Cancellationrefundpolicy />} />
            <Route path="/shippingpolicy" element={<Shippingpolicy />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Independence Day Coupon Banner */}

      </div>
    </Router>
  );
}

export default App;