import React, { Component } from 'react'

export default class RegularPost extends Component {
    render() {
        return (
            <div class="bg-light hid rounded mt-2">
            <div class="container-fluid border-bottom lightgray pt-1 rounded-top pb-1 pl-2 row m-auto">
                  <img class="col-1 rounded-circle p-0 ml-3" src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt='img'/>
                  <div class="col-10">
                    <p class="small">Boby</p> 
                    <p class="extra_small">Posted on 6 Dec 2018</p>
                  </div>
              </div>
            <div class="col-12 border-bottom p-0">
              <img class="col-12 m-0 p-0" src="https://images.pexels.com/photos/1141792/pexels-photo-1141792.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt='img'/>
            </div>
            <div class="col-12 border-bottom row m-auto p-2 text-center">
              <div class="col-6"><p class='small'>200 Likes</p></div>
              <div class="col-6"><p class='small'>200 Comments</p></div>
            </div>
              {/* like comment section */}
            <div class="col-12 p-0 border-bottom row m-auto">
              <div class="col-6 p-1 text-center">
                <i class="fa fa-thumbs-o-up"></i>
                Like
              </div>
              <div class="col-6 p-1 text-center">
                <i class="fa fa-comment-o"></i>
                comment
              </div>
            </div>
            <div class="col-12 p-0 pb-3">
              <p class="pl-4 mb-2">View Comment</p>
              <div class="col-12 row m-auto pb-2">
                <img class="col-1 rounded-circle p-0 ml-3" src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt='img'/>
                <form class="ml-2 form form-inline lightgray col-10 round hid">
                  <input class="form-control border-0 col-11 transparent" name='comment' placeholder="Write a comment" />
                  <button class="btn rounded-0 transparen text-primary col-1"><i class="fa fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
            
          </div>
        )
    }
}
