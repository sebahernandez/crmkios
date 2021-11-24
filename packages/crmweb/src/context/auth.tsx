import React from 'react';
import Cookies  from 'universal-cookie';

type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);
const cookie = new Cookies();
const isValidToken = () => {
  const token = localStorage.getItem('tuecommerce_token');
  // JWT decode & check token validity & expiration.
  if (token) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());
  function authenticate({ email, password }, cb) {
    makeAuthenticated(true);
    cookie.set('tuecommerce_token', `${email}.${password}`);
    setTimeout(cb, 100); // fake async
  }
  function signout(cb) {
    makeAuthenticated(false);
    cookie.remove('tuecommerce_token');
    setTimeout(cb, 100);
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
