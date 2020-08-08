import React, { Component } from 'react'

export default class CreatePost extends Component {
    render() {
        return (
            <div className="col-12 m-auto bg-light rounded p-0 hid">
                <div className="container-fluid border-bottom lightgray pt-1 rounded-top">
                    <h6>Create post</h6>
                </div>
                <div className="row col-12 pt-2 pl-2 pb-2 bg-light m-auto border-bottom">
                    <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="" className="col-1 rounded-circle p-0 ml-3"/>
                    <div className="col-10">
                        <form className='form col-12'>
                            <input type="text" className='form-control rounded-pill' placeholder="what's on your mind boby"/>
                        </form>
                    </div>
                </div>
                <div className="col-12 row container p-1 m-auto text-center justify-content-center">
                    <div className="col-4 lightgray text-dard round m-1">
                        <i className="fa fa-file-image-o"></i>
                        <p className="small d-inline">Image/Video</p>
                    </div>
                    <div className="col-4 lightgray text-dard round m-1">
                        <i className="fa fa-user-plus"></i>
                        <p className="small d-inline">Tag friends</p>
                    </div>
                </div>
            </div>
        )
    }
}
