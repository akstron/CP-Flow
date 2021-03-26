import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import AskForm from './components/AskForm';
import Question from './components/Question';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path='/'>
          At home
        </Route>
        <Route path='/ask'>
          {/* <AskForm/> */}
          <Question questionId={"605b87f8f7cffc3a6c09365b"}/>
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
