import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getFriend,setChat } from '../../redux/action/action'
import ChatLeft from './ChatLeft'
import ChatRight from './ChatRight'
import  ChatWindow  from './ChatWindow'

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
        return (
            <div className='bg-light'>
                <div className='row container p-0 m-auto col-12 text-center justify-content-center'>
                    <div className='col-4 full pt-3 scroll' style={{height:"78vh"}}>
                        <div style={{
                            position:"absolute",
                            zIndex:"100",
                            height:"87vh"
                        }}></div>
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
            {this.props.curChat===null?
            <div className='col-8 full' style={{
                background:"white",
                color:"lightgray",
                paddingTop:"20vh"
                }}>
                <i className="fas fa-meh-rolling-eyes" style={{fontSize:"60px"}}></i>
                <h3>select friend to start conversation</h3>
            </div>:
            <ChatWindow sendMessage={this.sendMessage}/>
            }
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
