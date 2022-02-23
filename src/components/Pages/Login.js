import React, { Fragment } from 'react';
import { useState, useContext } from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import Header from '../Layout/Header';

const Login = () => {
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

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

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('UserData' + JSON.stringify(userInput));
    let responseUserData = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput),
    });
    let userLoginData = await responseUserData.json();
    console.log('LoginData ' + userLoginData['accessToken']);
    const { accessToken } = userLoginData;
    console.log('All' + JSON.stringify(userLoginData));
    console.log('UserLoginData ' + userLoginData['name']);
    authCtx.setAuthUser(userLoginData);
    console.log('Ctx user' + JSON.stringify(authCtx.user));
    console.log(authCtx.user['name']);

    if (accessToken) {
      localStorage.setItem('person', JSON.stringify(userLoginData));
      authCtx.logInUser();
      navigate('../', { replace: true });
    }
  };
  return (
    <Fragment>
      <Header />
      <form action='#' className={classes['cta-form']}>
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
            value={userInput.entredFullName}
            id='password'
            type='text'
            placeholder='***********'
            required
            onChange={passwordChangeHandler}
          />
        </div>
        <button
          type='submit'
          className={classes['btn--form']}
          onClick={submitHandler}
        >
          Login
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
