import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path='/'>
          At home
        </Route>
        <Route path='/ask'>
          Ask
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        <Route path='/login'>
          <LoginForm/>
        </Route>
        <Route path='/register'>
          <RegistrationForm/>
        </Route>
      </Router>
  );
}

export default App;
