import { useState } from 'react';
import AvailableMealsContext from './availablemeals-context.js';

const AvailableMealsProvider = (props) => {
  const [meals, setMeals] = useState([]);

  const setAvailableMeals = (availableMeals) => {
    setMeals(availableMeals);
  };

  const availableMealsContext = {
    availableMeals: meals,
    setAvailableMeals: setAvailableMeals,
  };

  return (
    <AvailableMealsContext.Provider value={availableMealsContext}>
      {props.children}
    </AvailableMealsContext.Provider>
  );
};

export default AvailableMealsProvider;
