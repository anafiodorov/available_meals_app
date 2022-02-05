import React from 'react';

const AuthContext = React.createContext({
  user: {},
  setAuthUser: (authUser) => {},
});

export default AuthContext;
