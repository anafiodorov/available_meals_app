import React from 'react';
import mealImage from '../../assets/meal.jpeg';
import Button from '../UI/Button';
import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';
import { Link } from 'react-router-dom';
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1 className={classes.item1}>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
        <Link to='/signup'>
          <Button>SignUp</Button>
        </Link>
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} alt='Meal' />
      </div>
    </React.Fragment>
  );
};

export default Header;
