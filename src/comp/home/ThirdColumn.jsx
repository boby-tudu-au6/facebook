import React, { Component } from 'react'
import FriendRequest from './FriendRequest'
import OnlineFriend from './OnlineFriend'
import withState from '../hoc/withState'


class ThirdColumn extends Component {
    componentDidUpdate(){
        if(this.props.friend!==null){
            let arr = []
            this.props.friend.forEach(item=>arr.push(item.friendId[0]._id))
        }
    }
    // componentDidMount(){
    //     console.log(this.props.friend)
        
    // }
    render() {
        return (
<div className="col-3 full rounded p-1">
    <div className="container col-12 m-auto bg-light mb-2 rounded pt-2">
        <strong>
            <p className="text-secondary friend_toggle" data-toggle="collapse" data-target="#friendRequest">Friend Request</p>
        </strong><hr/>
        <div id='friendRequest'>
        {this.props.friendRequest.length===0?null:this.props.friendRequest.map(m=><FriendRequest key={Math.random()} data={m}/>)}
        </div>
    </div>

    <div className="container col-12 m-auto bg-light mb-2 rounded pt-2">
        <strong>
            <p className="text-secondary" data-toggle="collapse" data-target="#onlineFriend">Online Friend</p>
        </strong><hr/>
        <div id='onlineFriend'>
        {this.props.friend===null?null:
        this.props.friend.map(m=>(<OnlineFriend key={Math.random()} data={m}/>))}
        
{/* <div>
    <div className="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
        <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="dd" className="col-2 bg-secondary rounded-circle p-0 m-0"/>
        <div className="col-8">
        <p className="text-secondary">boby tudu</p>
            <p className="text-secondary" style={{fontSize:'13px'}}>From Sahibganj</p>
        </div>
        <div 
        className='col-1 text-center justify-content-center pt-2'>
            <div
        style={{boxShadow:"1px 1px 15px red"}} className='bg-danger p-2 m-0 rounded-circle'></div>
        </div>
    </div>
        <hr/>
</div> */}
        </div>
    </div>
</div>
        )
    }
}
export default withState(ThirdColumn)