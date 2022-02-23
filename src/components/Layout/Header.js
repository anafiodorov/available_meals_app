import React, { Fragment } from 'react';
import Button from '../UI/Button';
import HeaderCartButton from './HeaderCartButton';
import Background from '../UI/Background';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const authCtx = useContext(AuthContext);
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
      {authCtx.isLoggedIn && (
        <Link to='/logout'>
          <Button>Logout</Button>
        </Link>
      )}
    </Background>
  );
};

export default Header;
