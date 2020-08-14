import React, { Component } from 'react'
import ChatLeft from './ChatLeft'
import ChatRight from './ChatRight'
import Videoapp from '../video/Video'
import withState from '../hoc/withState'

class ChatWindow extends Component {
    componentDidUpdate(){
        if(this.props.video!==null){
            this.props.socket.emit('videostarted')
        }
    }
    render() {
        return (
            <div className='col-8 p-0 full'>
            <div className='row col-12 m-auto bg-light pt-2 pb-1 pl-3 justify-content-between pr-4'
            style={{height:"20vh",minHeight:"70px",maxHeight:"70px"}}>
                <div className='col-6 text-left row'>
                <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="img" className="rounded-circle" width='50px' height='50px'/>
                <div className='col-9 pt-2 text-left'>
        <h3 className='lightfont'>{this.props.curChat.friendFirstName+' '+this.props.curChat.friendLastName}</h3>
                </div>
                </div>
                <div className='row col-2 text-right p-0' style={{height:'50px'}}>
                    <div className='navitem p-3 rounded col-6 text-center' data-toggle="tooltip" title='video call' onClick={this.props.startVideo}>
                        <i className="fas fa-video icon"></i>
                    </div>
                    <div className='navitem p-3 rounded col-6 text-center' data-toggle="tooltip" title='audio call'>
                        <i className="fas fa-phone icon"></i>
                    </div>
                </div>
            </div>
            <div className='container col-12 pl-3 pr-3 pt-3 messageBox'>
                {this.props.video===null?
                <>{this.props.messages.length===0?null:
                this.props.messages.map(box=>{
                    if(box.from===this.props.userid){
                        return <ChatRight key={Math.random()} data={box}/>
                    }
                    return <ChatLeft key={Math.random()} data={box}/>
                })}</>:<Videoapp/>}
            </div>
            {this.props.video===null?
            <form onSubmit={this.props.sendMessage}
            className='form form-inline col-12 pl-1 pr-1 pt-2 pb-2 darkgray'>
                <div className='col-1 p-0 pt-2 pb-2 rounded emoji_box'>
                    <i className="far fa-smile icon"></i>
                </div>
                <input type="text" name="chat" className='form-control col-10 rounded-pill border-0' placeholder='enter message'/>
            </form>:null}
        </div>
        )
    }
}
export default withState(ChatWindow)
