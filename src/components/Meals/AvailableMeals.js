import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import React, { useState, useEffect, useContext } from 'react';
import AvailableMealsContext from '../../store/availablemeals-context';

const AvailableMeals = () => {
  // const [availableMeals, setAvailableMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mealsCtx = useContext(AvailableMealsContext);

  useEffect(() => {
    let isMounted = true;
    async function getAvailableMeals() {
      fetch(`${process.env.REACT_APP_SERVER_URL}/meals`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (isMounted) {
            mealsCtx.setAvailableMeals(
              data.map((item) => ({
                key: item.mealid,
                id: item.mealid,
                name: item.mealname,
                description: item.description,
                price: parseInt(item.price),
              }))
            );
            setIsLoading(false);
          }
          // if (isMounted) {
          //   setAvailableMeals(
          //     data.map((item) => ({
          //       key: item.mealid,
          //       id: item.mealid,
          //       name: item.mealname,
          //       description: item.description,
          //       price: parseInt(item.price),
          //     }))
          //   );
          //   setIsLoading(false);
          // }
        });
    }
    getAvailableMeals();
    return () => {
      isMounted = false;
    };
  }, [mealsCtx]);

  if (isLoading) {
    return (
      <section>
        <div className={classes['meals-spinner']}>
          <div className='spinner-border text-warning' role='status'>
            <span className='sr-only'></span>
          </div>
        </div>
      </section>
    );
  }
  const mealsList = (
    filteredMeals.length === 0 ? mealsCtx.availableMeals : filteredMeals
  ).map((meal) => (
    <MealItem
      key={meal.key}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  const inputHandler = (event) => {
    const arg = event.target.value;
    const filteredAvailableMeals = mealsCtx.availableMeals.filter((meal) => {
      console.log(meal);
      return meal.name.includes(arg);
    });
    setFilteredMeals(filteredAvailableMeals);
  };
  return (
    <section className={classes.meals}>
      <input
        className={classes.input}
        type='text'
        placeholder='Search'
        onChange={inputHandler}
      />
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
