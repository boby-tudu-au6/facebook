import React, { Component } from 'react'

export default class RegularPost extends Component {
    render() {
        return (
            <div className="bg-light hid rounded mt-2">
            <div className="container-fluid border-bottom lightgray pt-1 rounded-top pb-1 pl-2 row m-auto">
                  <img className="col-1 rounded-circle p-0 ml-3" src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt='img'/>
                  <div className="col-10">
                    <p className="small">Boby</p> 
                    <p className="extra_small">Posted on 6 Dec 2018</p>
                  </div>
              </div>
            <div className="col-12 border-bottom p-0">
              <img className="col-12 m-0 p-0" src="https://images.pexels.com/photos/1141792/pexels-photo-1141792.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt='img'/>
            </div>
            <div className="col-12 border-bottom row m-auto p-2 text-center">
              <div className="col-6"><p className='small'>200 Likes</p></div>
              <div className="col-6"><p className='small'>200 Comments</p></div>
            </div>
              {/* like comment section */}
            <div className="col-12 p-0 border-bottom row m-auto">
              <div className="col-6 p-1 text-center">
                <i className="fa fa-thumbs-o-up"></i>
                Like
              </div>
              <div className="col-6 p-1 text-center">
                <i className="fa fa-comment-o"></i>
                comment
              </div>
            </div>
            <div className="col-12 p-0 pb-3">
              <p className="pl-4 mb-2">View Comment</p>
              <div className="col-12 row m-auto pb-2">
                <img className="col-1 rounded-circle p-0 ml-3" src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt='img'/>
                <form className="ml-2 form form-inline lightgray col-10 round hid">
                  <input className="form-control border-0 col-11 transparent" name='comment' placeholder="Write a comment" />
                  <button className="btn rounded-0 transparen text-primary col-1"><i className="fa fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
            
          </div>
        )
    }
}
