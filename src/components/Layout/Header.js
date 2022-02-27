import React, { Fragment } from 'react';
import Button from '../UI/Button';
import HeaderCartButton from './HeaderCartButton';
import Background from '../UI/Background';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import CartContext from '../../store/cart-context';
import { Link } from 'react-router-dom';
import Logout from '../Pages/Logout';

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const logOutUser = () => {
    authCtx.logOutUser();
    cartCtx.emptyCart();
    localStorage.removeItem('person');
    window.scrollTo({ top: 0 });
  };
  return (
    <Background>
      <HeaderCartButton onClick={props.onShowCart} />
      {!authCtx.isLoggedIn && (
        <Fragment>
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
          <Link to='/signup'>
            <Button>SignUp</Button>
          </Link>
        </Fragment>
      )}
      {authCtx.isLoggedIn && <Logout onClick={logOutUser}>Logout</Logout>}
    </Background>
  );
};

export default Header;
