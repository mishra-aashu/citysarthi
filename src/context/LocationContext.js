import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);

  return (
    <LocationContext.Provider value={{ pickupLocation, setPickupLocation, dropLocation, setDropLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
