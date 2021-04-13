import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import AskForm from './components/AskForm';
import Question from './components/Question';
import Answer from './components/Answer';
import EditForm from './components/EditForm';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/ask'>
          <AskForm/>
        </Route>
        <Route path='/user/profile'>
          <Profile/>
        </Route>
        <Route path='/user/edit'>
          <EditForm/>
        </Route>
        <Route path='/login'>
          <LoginForm/>
        </Route>
        <Route path='/register'>
          <RegistrationForm/>
        </Route>
        <Route path='/user/question'>
          <Question/>
        </Route>
        <Route path='/user/answer'>
          <Answer/>
        </Route>
      </Router>
  );
}

export default App;
