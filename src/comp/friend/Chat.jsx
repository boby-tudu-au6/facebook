import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getFriend,setChat } from '../../redux/action/action'
import ChatLeft from './ChatLeft'
import ChatRight from './ChatRight'

class Chat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message:""
        }
    }
    componentDidMount(){
        this.props.getFriend()
    }
    sendMessage = async (e) =>{
        e.preventDefault()
        const {chat} = e.target
        this.props.socket.emit("chat",{
            from:this.props.userid,
            to:this.props.curChat.friendid,
            body:{
                type:"text",
                chat:chat.value
            }
        })
    }
    
    render() {
        // console.log(this.props.userid)
        const userid = localStorage.getItem("userid")
        return (
            <div className='bg-light'>
                <div className='row container p-0 m-auto col-12 text-center justify-content-center'>
                    <div className='col-4 full pt-3 scroll' style={{height:"78vh"}}>
                        {this.props.friend===null?null:
                        this.props.friend.map(friend=>(
                        <div key={Math.random()} className='card pt-0 pb-0 pl-3 pr-3 mb-2' onClick={()=>{
                            this.props.socket.emit("joinroom",{room:friend.room})
                            this.props.setChat({friendid:friend.friendId[0]._id,room:friend.room})
                            }}>
                            <div className='row'>
                                <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="img" className="col-2 rounded-circle p-2"/>
                                <div className='col-9 pt-3 text-left'>
                                <h3 className='lightfont'>{friend.friendId[0].firstname}</h3>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* chat window */}
<div className='col-8 p-0 full' style={{background:"white"}}>
    <div className='container col-12 pl-3 pr-3 pt-3 messageBox'>
        {this.props.messages.length===0?null:
        this.props.messages.map(box=>{
            if(box.from===this.props.userid){
                return <ChatRight key={Math.random()} data={box}/>
            }
            return <ChatLeft key={Math.random()} data={box}/>
        })}
        {/* <ChatLeft/>
        <ChatRight/> */}
        
        
        
    </div>
    <form 
    onSubmit={this.sendMessage}
    className='form form-inline col-12 pl-1 pr-1 pt-2 pb-2 darkgray'>
        <div className='col-1 p-0 pt-2 pb-2 rounded emoji_box'>
            <i className="far fa-smile icon"></i>
        </div>
        <input type="text" name="chat" className='form-control col-10 rounded-pill border-0' placeholder='enter message'/>
    </form>
</div>
    </div>
</div>
        )
    }
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        getFriend:()=>dispatch(getFriend()),
        setChat:payload=>dispatch(setChat(payload))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat)
