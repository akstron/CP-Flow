import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'

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
      </Router>
  );
}

export default App;
