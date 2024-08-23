import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, placeOrder }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <header>
        <h1>Walmart Cart</h1>
        <Link to="/">Back to Home</Link>
      </header>
      <main>
        <h2>Cart Overview</h2>
        <div className="cart-summary">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="cart-total">
            <p>Total Cost: ${total.toFixed(2)}</p>
            <button onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
