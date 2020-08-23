import React, { Component } from 'react'
import  ChatWindow  from './ChatWindow'
import withState from '../hoc/withState'
import {connect} from 'react-redux'
import {getFriend,setChat} from '../../redux/action/action'

class Chat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message:""
        }
    }
    componentDidMount(){
        this.props.getFriend(this.props.userid)
    }
    render() {
        return (
<div className='bg-light'>
    {this.props.userid!==null?(
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
                if(this.props.curChat!==null){
                    this.props.socket.emit("leaveroom",{room:this.props.curChat.room})
                }
                this.props.socket.emit("joinroom",{room:friend.room})
                    this.props.setChat({
                        friendid:friend.friendId[0]._id,
                        friendFirstName:friend.friendId[0].firstname,
                        friendLastName:friend.friendId[0].lastname,
                        socketid:friend.friendId[0].socketid,
                        room:friend.room,
                        userid:this.props.userid
                    })
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
<ChatWindow/>
}
</div>
    ):null}
</div>
        )
    }
}

export default withState(Chat)
// const mapStateToProps = state =>{return {...state}}
// const mapDispatchToProps = dispatch =>{
//     return {
//         getFriend:()=>dispatch(getFriend()),
//         setChat:payload=>dispatch(setChat(payload))
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Chat)
