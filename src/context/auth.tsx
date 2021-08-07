import React from 'react';

type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);

const isValidToken = () => {
  const token = sessionStorage.getItem('pickbazar_token');
  // JWT decode & check token validity & expiration.
  if (token) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());
  function authenticate({ usuario, password }, cb) {
    makeAuthenticated(true);
    sessionStorage.setItem('pickbazar_token', `${usuario}.${password}`);
    setTimeout(cb, 50); // fake async
  }
  function signout(cb) {
    makeAuthenticated(false);
    sessionStorage.removeItem('pickbazar_token');
    setTimeout(cb, 50);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
