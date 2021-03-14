import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path='/'>
          At home
        </Route>
        <Route path='/about'>
          About
        </Route>
        <Route path='/people'>
          People
        </Route>
        <Route path='/register'>
          <RegistrationForm/>
        </Route>
      </Router>
  );
}

export default App;
