import React, { Component } from 'react'
import withState from '../hoc/withState'
import {connect} from 'react-redux'

class FriendRequest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    componentDidMount(){
        // this.props.socket.on("")
    }
    render() {
        return (
<div>
    <div className="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
        <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="dd" className="col-2 bg-secondary rounded-circle p-0 m-0"/>
        <div className="col-9">
        <p className="text-secondary">{this.props.data.from.firstname}</p>
            <p className="text-secondary" style={{fontSize:'13px'}}>From Sahibganj</p>
        </div>
        <div className="row col-12 p-1 m-auto justify-content-between">
            <button 
            className='btn btn-primary btn-sm col-5'
            onClick={()=>this.props.socket.emit("acceptRequest",{...this.props.data})}
            >Accept</button>
            <button 
            className='btn btn-secondary btn-sm col-5'
            onClick={()=>this.props.socket.emit("deleteRequest",{...this.props.data})}
            >Delete</button>
        </div>
    </div>
        <hr/>
</div>
        )
    }
}

const mapStateToProps = state =>{return {...state}}

export default connect(mapStateToProps)(FriendRequest)