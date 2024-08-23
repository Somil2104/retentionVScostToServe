import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const OffersPage = ({ orderCount }) => {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    console.log(orderCount)
    const offerings = orderCount < 5
    ? setOffers([
        { category: 'Electronics', offer: '20% off on all smartphones. (Use code ELECTRO20)' },
        { category: 'Clothing', offer: 'Buy one, get one 50% off on select apparel. (Use code BOGO50)' },
      ])
    : setOffers([
        { category: 'Food', offer: '10% off on Bananas. (Use code BAN10)' },
        { category: 'Beauty', offer: '15% off on beauty products. (Use code BEAUTY15)' },
      ]);
  }, [orderCount])
  return (
    <div>
      <header>
        <h1>Walmart Offers</h1>
        <Link to="/">Back to Home</Link>
      </header>
      <main>
        <h2>Current Offers</h2>
        <div className="offers-list">
          {offers.map((offer, index) => (
            <div className="offer" key={index}>
              <h3>{offer.category}</h3>
              <p>{offer.offer}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default OffersPage;
