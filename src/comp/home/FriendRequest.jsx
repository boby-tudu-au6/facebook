import React, { Component } from 'react'

export default class FriendRequest extends Component {
    render() {
        return (
            <div>
                <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
                    <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="dd" class="col-2 bg-secondary rounded-circle p-0 m-0"/>
                    <div class="col-9">
                        <p class="text-secondary">{this.props.name}</p>
                        <p class="text-secondary" style={{fontSize:'13px'}}>From Sahibganj</p>
                    </div>
                    <div class="row col-12 p-1 m-auto justify-content-between">
                        <button className='btn btn-primary btn-sm col-5'>Accept</button>
                        <button className='btn btn-secondary btn-sm col-5'>Delete</button>
                    </div>
                </div>
                    <hr/>
            </div>
        )
    }
}
