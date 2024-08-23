import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import CartPage from './CartPage';
import OffersPage from './OffersPage';
import './style.css';

function App() {
    const [cart, setCart] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = () => {
    setOrderCount(orderCount + 1);
    setCart([]); // Clear the cart after placing the order
  };

  console.log(orderCount)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage addToCart={addToCart} orderCount={orderCount}  />} />
          <Route path="/cart" element={<CartPage cart={cart} placeOrder={placeOrder} />} />
          <Route path="/offers" element={<OffersPage orderCount={orderCount}  />} />
        </Routes>
        <footer>
          <p>Customer Service | Contact Us | About Us | Privacy Policy | Terms of Service</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
