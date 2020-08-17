import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    logout, 
    checkLogin, 
    searchFriend,
    setSocket, 
    getRequest, 
    updateRequest,
    getFriend,
    baseurl,
    sendRequest,
    setOnlineChat,
    delChatId
} from '../../redux/action/action'
import io from 'socket.io-client'
import Login from '../login/Login'
import {DebounceInput} from 'react-debounce-input';
import Badge from './Badge'
import {websocket} from './websockets'
import withState from '../hoc/withState'

class Nav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            socket:io(baseurl)
        }
    }
    componentWillUnmount(){
        this.props.checkLogin()
        this.state.socket.close()
    }

    async componentDidMount(){
        this.props.getPost(this.props.userid)
        this.props.history.listen((location)=>{
            if(location.pathname!=='/messages'){
                if(this.props.curChat!==null){
                    this.state.socket.emit("leaveroom",{room:this.props.curChat.room})
                }
                this.props.delChatId(this.props.userid)
            }
        })
        this.props.getRequest(this.props.userid)
        
        this.state.socket.on('imonline',()=>{setTimeout(()=>this.props.getFriend(this.props.userid),2000)})
        this.state.socket.on("userDisconnected",data=>this.props.getFriend(this.props.userid))
        this.state.socket.on("deletedRequest",data=>{this.props.getRequest(this.props.userid)})
        this.state.socket.on("newpost",()=>console.log("new post arrived"))
        this.state.socket.on("requestCreated",data=>{
            if(data.to===this.props.userid){
                this.props.getRequest(this.props.userid)
            }})
        this.state.socket.on('connect',()=>{
            // alert(this.props.userid)
            websocket.connect(
                this.state.socket,
                this.props.setSocket,
                this.props.userid,
                this.props.getFriend
            )
        })
        this.state.socket.on("requestAccepted",data=>{
            websocket.requestAccepted(
                data,this.props.userid,
                this.props.getRequest,
                this.props.getFriend
            )
        })
        this.state.socket.on("chat",data=>{
            websocket.chat(data,
                this.state.socket,
                this.props.location.pathname,
                this.props.curChat,
                this.props.userid,
                this.props.setOnlineChat)
        })
        this.state.socket.on("newpostdone",data=>console.log(data))
    }
    render() {
        let chats=0;
        if(this.props.messages.lenght!==0){
            chats = this.props.messages.filter(
                chat=>chat.unread==='true' && chat.to===this.props.userid)
        }
        return (
            <div>
                <nav className="navbar navbar-dark navbar-expand-sm pt-0 pb-0">
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
            let friend = false
            let check = this.props.friendId.find(d=>d===e._id)
            if(check!==undefined){friend=true}
            return (
<div key={Math.random()} className="card bg-light text-dark text-center rounded-0 col-12 pl-4 pr-2">
<div className="card-body p-2 row justify-content-between col-12">
<p className='d-inline'>{`${e.firstname} ${e.lastname}`}</p>
<div className='row btn-group'>
{friend===false?<button 
className='btn btn-success btn-sm' 
onClick={()=>{
    this.props.sendRequest()
this.props.socket.emit("friendRequest",{to:e._id,from:this.props.userid,time:(new Date()).toLocaleString})}}
>Send request</button>:
<button
className='btn btn-primary btn-sm'>View profile
</button>}
<button className='btn btn-danger btn-sm' onClick={()=>console.log((new Date()).toLocaleString())}>Visit profile</button>
</div>
</div>
</div>)
        }):null}
        </div>
        </div>

        
    <ul className="navbar-nav col-6 ml-2">
        <Link to='/profile' className="nav-item col-3 p-0 d-flex" title='profile' data-toggle="tooltip">
            <div className="col-4 p-1">
                <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="" className="col-12 rounded-circle p-0"/>
            </div>
            <div className="col-10 p-0">
        <p className="nav-link text-light" href="/g">{ this.props.username }</p>
            </div>
        </Link>
        <li className="nav-item col-1 p-1 rounded navitem text-center" title='friend request' data-toggle="tooltip">
            {this.props.friendRequest.length===0?null:<Badge data={this.props.friendRequest.length}/>}
            <Link to='/friends' className="nav-link active">
                <i className="fas fa-user-friends icon"></i>
            </Link>
        </li>
        <li className="nav-item col-1 p-1 rounded navitem text-center" title='messages' data-toggle="tooltip">
        {chats.length===0?null:<Badge data={chats.length}/>}
        
            <Link to='/messages' className="nav-link active">
                <i className="fab fa-facebook-messenger icon"></i>
            </Link>
        </li>
        <li className="nav-item col-1 p-1 rounded navitem text-center" title='notification' data-toggle="tooltip">
        <span className="badge badge-danger">9</span>
            <div className="dropdown text-center justify-content-center">
            <p className="nav-link active border-0" data-toggle="dropdown">
                <i className="fas fa-bell icon"></i>
            </p>
                <div className="dropdown-menu mr-4">
                    <a className="dropdown-item" href="#">Link 1</a>
                    <a className="dropdown-item" href="#">Link 2</a>
                    <a className="dropdown-item" href="#">Link 3</a>
                </div>
                </div>
        </li>
        <li className="nav-item col-1 p-1 rounded navitem text-center" title='logout' data-toggle="tooltip">
            <a className="nav-link active" onClick={this.logout}>
                <i className="fas fa-power-off icon"></i>
            </a>
        </li>
    </ul>
    </nav>
            </div>)
    }
    logout = ()=>{
        this.props.socket.close()
        this.props.logout()
    }
}

// const mapStateToProps = state =>{return {...state}}
// const mapDispatchToProps = dispatch=>{
//     return {
//         checkLogin:()=>dispatch(checkLogin()),
//         logout:()=>dispatch(logout()),
//         searchFriend:(payload)=>dispatch(searchFriend(payload)),
//         setSocket:payload=>dispatch(setSocket(payload)),
//         getRequest:payload=>dispatch(getRequest(payload)),
//         updateRequest:payload=>dispatch(updateRequest(payload)),
//         getFriend:()=>dispatch(getFriend()),
//         sendRequest:()=>dispatch(sendRequest()),
//         setOnlineChat:payload=>dispatch(setOnlineChat(payload)),
//         delChatId:(payload)=>dispatch(delChatId(payload))
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Nav))
export default withState(withRouter(Nav))