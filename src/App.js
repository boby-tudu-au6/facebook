import React from 'react';
import './App.css';
import Nav from './comp/home/Nav'
import Home from './comp/home/Home'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Chat from './comp/friend/Chat';
import Login from './comp/login/Login';
import { connect } from 'react-redux';
import {checkLogin} from './redux/action/action'
import Profile from './comp/Profile/Profile'
import '../node_modules/antd/dist/antd.css'



function App(props) {
  checkLogin()
  return (
    <Router>
    <div className='true' style={{minWidth:"600px"}}>
      {props.username!==null?<Nav/>:<Login/>}
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/messages' component={Chat}/>
        <Route exact path='/profile' component={Profile}/>
      </Switch>
    </div>
    </Router>
  );
}

const mapStateToProps = state =>{return {...state}}

export default connect(mapStateToProps)(App)
