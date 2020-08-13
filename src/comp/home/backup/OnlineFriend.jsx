import React, { Component } from 'react'
import { connect } from 'react-redux'

class OnlineFriend extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    componentDidMount(){
        // console.log(this.props.data.friendId[0].socketid)
    }
    render() {
        const red = {boxShadow:"1px 1px 15px red",backgroundColor:"red"}
        const green = {boxShadow:"1px 1px 15px green",backgroundColor:"green"}
        return (
<div>
    <div className="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
        <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="dd" className="col-2 bg-secondary rounded-circle p-0 m-0"/>
        <div className="col-8">
        <p className="text-secondary">{this.props.data.friendId[0].firstname}</p>
            <p className="text-secondary" style={{fontSize:'13px'}}>From Sahibganj</p>
        </div>
        <div className='col-1 pt-2'>
            <div style={this.props.data.friendId[0].socketid===""?red:green} 
            className='p-2 m-0 rounded-circle'></div>
        </div>
    </div>
        <hr/>
</div>
        )
    }
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {

    }
}
export default connect(mapStateToProps)(OnlineFriend)