import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SignUp.module.css';
const SignUp = () => {
  let navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    fullName: '',
    email: '',
    password: '',
    city: '',
    street: '',
    postalCode: '',
  });
  const userNameChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, fullName: event.target.value };
    });
  };
  const emailChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };
  const passwordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };
  const cityChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, city: event.target.value };
    });
  };
  const streetChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, street: event.target.value };
    });
  };
  const postalCodeChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, postalCode: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(userInput));
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
      });
    setUserInput({
      entredFullName: '',
      entredEmail: '',
      city: '',
      street: '',
      postalCode: '',
    });
    navigate('../', { replace: true });
  };
  return (
    <div className={classes.container}>
      <form action='#' className={classes['cta-form']}>
        <div>
          <label htmlFor='full-name'>Full Name</label>
          <input
            value={userInput.fullName}
            id='full-name'
            type='text'
            placeholder='John Smith'
            required
            onChange={userNameChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='email'>Email address</label>
          <input
            value={userInput.email}
            id='email'
            type='email'
            placeholder='me@emample.com'
            required
            onChange={emailChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            value={userInput.password}
            id='password'
            type='password'
            placeholder='*********'
            required
            onChange={passwordChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='city'>City</label>
          <input
            value={userInput.city}
            id='city'
            type='city'
            placeholder='Pitesti'
            required
            onChange={cityChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='street'>Street</label>
          <input
            value={userInput.street}
            id='street'
            type='street'
            placeholder='Street'
            required
            onChange={streetChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            value={userInput.postalCode}
            id='postalCode'
            type='postalCode'
            placeholder='Postal Code'
            required
            onChange={postalCodeChangeHandler}
          />
        </div>
        <button
          type='submit'
          className={classes['btn--form']}
          onClick={submitHandler}
        >
          Sign up now
        </button>
      </form>
    </div>
  );
};

export default SignUp;
