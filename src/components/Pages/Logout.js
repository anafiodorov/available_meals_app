import React from 'react';
import classes from './Logout.module.css';
const Button = (props) => {
  return (
    <div>
      <button className={classes.button} onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
