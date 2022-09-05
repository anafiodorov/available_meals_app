import React from 'react';

const AvailableMealsContext = React.createContext({
  availableMeals: [],
  setAvailableMeals: (availableMeals) => {},
});

export default AvailableMealsContext;
