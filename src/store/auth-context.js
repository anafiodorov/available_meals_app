import React from 'react';

const AuthContext = React.createContext({
  user: {},
  setAuthUser: (authUser) => {},
  isLoggedIn: false,
  logInUser: () => {},
  logOutUser: () => {},
});

export default AuthContext;
