import React, { Fragment } from 'react';
import Button from '../UI/Button';
import HeaderCartButton from './HeaderCartButton';
import Background from '../UI/Background';
import { useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import CartContext from '../../store/cart-context';
import { Link } from 'react-router-dom';
import Logout from '../Pages/Logout';
import { useNavigate } from 'react-router-dom';
import Base64 from '../Base64';
import classes from './Header.module.css';
import AvailableMealsContext from '../../store/availablemeals-context';

const Header = (props) => {
  let navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const mealsCtx = useContext(AvailableMealsContext);

  const logOutUser = () => {
    authCtx.logOutUser();
    cartCtx.emptyCart();
    localStorage.removeItem('LoggedInPerson');
    window.scrollTo({ top: 0 });
  };
  const gotoTopPage = () => {
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const getPayload = (jwt) => {
      return JSON.parse(Base64.atob(jwt.split('.')[1]));
    };
    let loggedInPerson = JSON.parse(localStorage.getItem('LoggedInPerson'));

    if (loggedInPerson) {
      const accessToken = loggedInPerson.accessToken;
      console.log(accessToken);

      const payload = getPayload(accessToken);
      console.log('Payload ' + payload.exp);
      const expiration = new Date(payload.exp * 1000);
      const now = new Date();
      console.log('exp:' + expiration);
      console.log('curr:' + now);

      if (expiration.getTime() - now.getTime() < 0) {
        console.log('JWT has expired or will expire soon');
        navigate('/login');
      } else {
        authCtx.setAuthUser(loggedInPerson);
        authCtx.logInUser();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Background>
        <HeaderCartButton onClick={props.onShowCart} />
        {!authCtx.isLoggedIn && (
          <Fragment>
            <Link onClick={gotoTopPage} to='/login'>
              <Button>Login</Button>
            </Link>
            <Link onClick={gotoTopPage} to='/signup'>
              <Button>SignUp</Button>
            </Link>
          </Fragment>
        )}
        {authCtx.isLoggedIn && <Logout onClick={logOutUser}>Logout</Logout>}
        {mealsCtx.length == 0 && (
          <p className={classes.message}>
            The website needs a few moments to wake up :) Please reload the page
            after 30 seconds!
          </p>
        )}
      </Background>
    </div>
  );
};

export default Header;
