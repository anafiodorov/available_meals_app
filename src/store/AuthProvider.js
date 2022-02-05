import { useState } from 'react';
import AuthContext from './auth-context.js';
const AuthProvider = (props) => {
  const [user, setUser] = useState({});

  const setAuthUser = (authUser) => {
    console.log('AuthUser in setAUthUser' + JSON.stringify(authUser));
    setUser(authUser);
  };
  const authContext = {
    user: user,
    setAuthUser: setAuthUser,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
