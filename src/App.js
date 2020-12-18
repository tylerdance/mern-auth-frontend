import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import './App.css';
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import { Component } from 'react';

function PrivateRoute({ component: Component, ...rest }) {
  const user = localStorage.getItem('jwtToken');
  return <Redirect {...rest} render={(props) => {
    return user ? <Component {...rest} {...props}/> : <Redirect to="/login" />
  }}/>
}

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    let token;
    // if there is no token in localStoragem then the user is authenticated
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token)
    }
  }, [])

  function nowCurrentUser(userData) {
    console.log('nowCurrentUser is here');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  function handleLogout() {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <div className="App">
      {/* <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} /> */}
      <Welcome />
    </div>
  );
}

export default App;
