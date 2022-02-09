import React from 'react';
import Button from '../UI/Button';
import HeaderCartButton from './HeaderCartButton';
import Background from '../UI/Background';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <Background>
      <HeaderCartButton onClick={props.onShowCart} />
      <Link to='/login'>
        <Button>Login</Button>
      </Link>
      <Link to='/signup'>
        <Button>SignUp</Button>
      </Link>
    </Background>
  );
};

export default Header;
