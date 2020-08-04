import React, { Component } from 'react'
import FriendRequest from './FriendRequest'
import { connect } from 'react-redux'


class ThirdColumn extends Component {
    componentDidMount(){
        
    }
    render() {
        return (
<div class="col-3 full rounded p-1">
    <div class="container col-12 m-auto bg-light mb-2 rounded pt-2">
        <strong>
            <p class="text-secondary friend_toggle" data-toggle="collapse" data-target="#friendRequest">Friend Request</p>
        </strong><hr/>
        <div id='friendRequest' className=''>
        {this.props.friendRequest===null?null:
        this.props.friendRequest.map(m=>(<FriendRequest name={m.to.firstname}/>))}
        </div>
    </div>

    <div class="container col-12 m-auto bg-light mb-2 rounded pt-2">
        <strong>
            <p class="text-secondary" data-toggle="collapse" data-target="#onlineFriend">Online Friend</p>
        </strong><hr/>
        <div id='onlineFriend' className='collapse'>
{this.props.friendRequest===null?null:this.props.friendRequest.map(m=>(<FriendRequest name={m.to.firstname}/>))}
        </div>
    </div>
</div>
        )
    }
}
const mapStateToProps = state =>{return {...state}}
export default connect(mapStateToProps,)(ThirdColumn)