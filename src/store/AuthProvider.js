import { useState } from 'react';
import AuthContext from './auth-context.js';

const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setAuthUser = (authUser) => {
    console.log('AuthUser in setAUthUser' + JSON.stringify(authUser));
    setUser(authUser);
  };

  const logInUser = () => {
    setIsLoggedIn(true);
  };
  const logOutUser = () => {
    setIsLoggedIn(false);
  };

  const authContext = {
    user: user,
    setAuthUser: setAuthUser,
    isLoggedIn: isLoggedIn,
    logInUser: logInUser,
    logOutUser: logOutUser,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
