import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from './Icons';
import '../css/headercss.css';

const Cartheader = ({ cart }) => {
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="header">
      <div className="">
        
      </div>
    </div>
  );
};

export default Cartheader;