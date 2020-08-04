import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout, checkLogin, searchFriend,setSocket, getRequest} from '../../redux/action/action'
import io from 'socket.io-client'
import Login from '../login/Login'
import {DebounceInput} from 'react-debounce-input';
import Axios from 'axios'

class Nav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userid:localStorage.getItem("userid")
        }
        this.socket = this.props.socket
    }
    

    async componentDidMount(){
        this.props.checkLogin()
        const userid = localStorage.getItem('userid')
        // this.props.socket.on("connect",()=>alert("connection made"))
        this.props.socket.on("requestCreated",data=>{
            if(data.to===userid){
                alert("request recieved")
            }
        })
        this.props.getRequest(userid)
    }
    sendRequest = (e)=>{
        e.preventDefault()
    }
    componentDidUpdate(){
        const userid = localStorage.getItem("userid")
        this.props.getRequest(userid)
    }
    render() {
        
        return (
            <div>
                {this.props.user!==null?<nav className="navbar navbar-dark navbar-expand-sm pt-0 pb-0">
                <Link className="navbar-brand logo" to='/'>
                    <i className="fab fa-facebook-square logo"></i>
                </Link>
        <div className='col-5 p-0'>
        <form className='form form-inline searchform rounded col-12 p-0'>
            <DebounceInput
            className='form-control border-0 col-11 pt-0 rounded-0'
            placeholder="search"
            minLength={1}
            debounceTimeout={1000}
            onChange={e => this.props.searchFriend(e.target.value)} />
            <button type="submit" className="btn btn-light text-secondary border-0 form-control col-1 m-0 rounded-0">
                <i className="fa fa-search"></i>
            </button>
        </form>
        <div className='col-11 p-0 shadow rounded-bottom text-center justify-content-center bg-light' style={{position:"absolute",zIndex:"100",overflow:"hidden"}}>
        {this.props.searchResult!==null?this.props.searchResult.map(e=>{
            return (
<div class="card bg-light text-dark text-center rounded-0 col-12 pl-4 pr-2">
<div class="card-body p-2 row justify-content-between col-12">
<p className='d-inline'>{`${e.firstname} ${e.lastname}`}</p>
<div className='row btn-group'>
<button 
className='btn btn-success btn-sm' 
onClick={()=>{
this.props.socket.emit("friendRequest",{to:e._id,from:this.state.userid,time:(new Date).toLocaleString})}}
>Send request</button>
<button className='btn btn-danger btn-sm' onClick={()=>console.log((new Date).toLocaleString())}>Visit profile</button>
</div>
</div>
</div>)
        }):null}
        </div>
        </div>

        
    <ul className="navbar-nav col-6 ml-2">
        <Link to='/profile' className="nav-item col-3 p-0 d-flex">
            <div className="col-4 p-1">
                <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="" className="col-12 rounded-circle p-0"/>
            </div>
            <div className="col-10 p-0">
        <p className="nav-link text-light" href="/g">{ this.props.username }</p>
            </div>
        </Link>
        <li className="nav-item col-1 p-1 rounded navitem text-center">
            <Link to='/friends' className="nav-link active">
                <i className="fas fa-user-friends icon"></i>
            </Link>
        </li>
        <li className="nav-item col-1 p-1 rounded navitem text-center">
            <Link to='/messages' className="nav-link active">
                <i className="fab fa-facebook-messenger icon"></i>
            </Link>
        </li>
        <li className="nav-item col-1 p-1 rounded navitem text-center">
            <div class="dropdown text-center justify-content-center">
            <p className="nav-link active border-0" data-toggle="dropdown">
                <i className="fas fa-bell icon"></i>
            </p>
                <div class="dropdown-menu mr-4">
                    <a class="dropdown-item" href="#">Link 1</a>
                    <a class="dropdown-item" href="#">Link 2</a>
                    <a class="dropdown-item" href="#">Link 3</a>
                </div>
                </div>
        </li>
        <li className="nav-item col-1 p-1 rounded navitem text-center">
            <a className="nav-link active" onClick={this.logout}>
                <i className="fas fa-power-off icon"></i>
            </a>
        </li>
    </ul>
    </nav>:<Login/>}
            </div>)
    }
    logout = ()=>{
        this.props.logout()
    }
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch=>{
    return {
        checkLogin:()=>dispatch(checkLogin()),
        logout:()=>dispatch(logout()),
        searchFriend:(payload)=>dispatch(searchFriend(payload)),
        setSocket:payload=>dispatch(setSocket(payload)),
        getRequest:payload=>dispatch(getRequest(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Nav))