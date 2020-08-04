import React from 'react';
import './App.css';
import Nav from './comp/home/Nav'
import Home from './comp/home/Home'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Chat from './comp/friend/Chat';
import Login from './comp/login/Login';


function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/messages' component={Chat}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
