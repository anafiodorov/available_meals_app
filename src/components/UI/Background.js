import React, { useContext } from 'react';
import mealImage from '../../assets/meal.jpeg';
import classes from './Background.module.css';
import { Link } from 'react-router-dom';
import AvailableMealsContext from '../../store/availablemeals-context';

const Background = (props) => {
  const mealsCtx = useContext(AvailableMealsContext);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <header className={classes.header}>
          <Link
            className={classes.link}
            onClick={() => window.scrollTo({ top: 0 })}
            to='/'
          >
            <h1>React Meals</h1>
          </Link>
          {props.children}

          {mealsCtx.availableMeals.length !== 0 && (
            <p className={classes.message}>
              The website needs a few moments to wake up :) Please reload the
              page after 30 seconds!
            </p>
          )}
        </header>

        <div className={classes['main-image']}>
          <img src={mealImage} alt='Meal' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Background;
