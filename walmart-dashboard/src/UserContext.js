import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ id: 1, name: 'John Doe', segment: 'Medium Spend', churnRisk: 0.2 });
    const [offers, setOffers] = useState(['10% off on Electronics', 'Free Shipping on orders above $50']);

    return (
        <UserContext.Provider value={{ user, setUser, offers, setOffers }}>
            {children}
        </UserContext.Provider>
    );
};
