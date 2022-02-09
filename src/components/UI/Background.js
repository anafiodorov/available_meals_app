import React from 'react';
import mealImage from '../../assets/meal.jpeg';
import classes from './Background.module.css';
import { Link } from 'react-router-dom';

const Background = (props) => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <header className={classes.header}>
          <Link className={classes.link} to='/'>
            <h1>React Meals</h1>
          </Link>
          {props.children}
        </header>

        <div className={classes['main-image']}>
          <img src={mealImage} alt='Meal' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Background;
