import React, { PureComponent } from 'react'
import { Button } from 'antd';
import PhotoIcon from '@material-ui/icons/Photo';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Modal from 'react-modal'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import withState from '../hoc/withState'
import {

  Segment,
  Header,
  Icon,
  Statistic,
  Label,
  TextArea,
  Form,
} from "semantic-ui-react";
import './style.css'
const Dp = "https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-1/p160x160/116347584_125646719220795_8469568938332917903_o.jpg?_nc_cat=111&_nc_sid=dbb9e7&_nc_ohc=Obur3lZkUlYAX-qkk2a&_nc_ht=scontent.fpat3-1.fna&_nc_tp=6&oh=5656be8ac8a107a378b3fda25111a89e&oe=5F567CB8"
class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
          profileimageModel:false,
          file:null
            
        }
    }


    componentDidUpdate(){
        
    }


  handleSubmit = (e) => { 

      e.preventDefault();
      const {message} = e.target
      this.props.socket.emit("uploadProfile",{
          data:this.state.file,
          userid:this.props.userid,
         
      })
      console.log(this.state.file)

  }; 
     handleChangeFile = (event) => {
       const file = event.target.files[0]
       const data = {
         id:Math.random(),
         type:file.type,
         name:file.name,
         data:file
       }
      this.setState({file:data});

    };
    handleFileUpload =(e)=>{
      alert('file upload done')
    }
    render() {
        return (
            <>

<div class="container row col-12 m-auto pt-0">
{/* 
<!-- first column --> */}
<div class="col-8 row ">
<div style={{height:"30vh"}}
        class="row col-12">
        <div class="col-12" style={{height:"80%",backgroundImage: "url('https://lh3.googleusercontent.com/proxy/gGha5GX_tYiAl6xFk8ZosFE3kcE8QpNAtUygqaqGWiFudQX8qkLqReVy4Fr3N63Oa2vTrD66V6TJ6BHXH7Hp0dyNckp-42Mi4CehgO6_ID-1DAZDzrLkpHEA2aHkSTMM3msLaoOYBnDK2HQYS7lQ0LErcQ')"}}>
          
          <Button style={{marginLeft: "35rem", marginTop: "7rem"}}>TimeLine</Button>
          <Button>TimeLine</Button><div style={{marginTop: "-10rem"}}> <img style={{ border:  "white 4px solid", zIndex: 2}}
            src={Dp}
            class=" mt-5  rounded-circle" alt="" />
             <Fab onClick={()=>{this.setState({profileimageModel:true})}} color="secondary" aria-label="edit" style={{outline:"none",marginTop:"8rem !important",marginLeft:"-3.5rem"}}>
        <EditIcon />
      </Fab>
            </div>
            </div>
        <div class="col-12 mt-3 " style={{color:"blue", marginLeft: "15rem", zIndex: -1, height:"20%",backgroundColor: "rgb(255, 255, 255)"}}>
          <Button style={{color:"blue"}}>TimeLine</Button>
          <Button style={{color:"blue"}}>Activity</Button>
          <Button style={{color:"blue"}} >Friends</Button>
          <Button style={{color:"blue"}}>Photos</Button>
          <Button style={{color:"blue"}}> Archieves</Button>
          <Button style={{color:"blue"}}>More</Button>
          
        </div>
        <hr class="col-12 pl-0 " style={{marginTop:"-0.1rem"}}  />
      </div>
  <div class="col-4 full " style  ={{marginTop: "5rem"}}>
    <div class="col-12 row bg-light mb-2 rounded hid" style={{height: "30vh"}}>
    <PhotoIcon className="col-12" style={{color:"green",marginLeft:"-6rem"}} />
       <img  class="col-6"  src={Dp} alt="dp1"/>
       <img  class="col-6"  src={Dp} alt="dp2"/>
    </div>
    <div class="col-12 bg-light mb-2 rounded hid" style={{height: "20vh"}}></div>
    <div class="col-12 bg-light mb-2 rounded hid" style={{height: "20vh"}}></div>
    <div class="col-12 bg-light mb-2 rounded hid" style={{height: "20vh"}}></div>
  </div>

{/* 

  <!-- second column --> */}
  <div class="col-8 full "  style={{marginTop: "5rem"}}>

    {/* <!-- create post section --> */}
    <div class="col-12 m-auto bg-light rounded p-0  ">
      <div class="container-fluid border-bottom lightgray pt-1 rounded-top">
        <h6>Create post</h6>
      </div>
      <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto border-bottom">
        <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt=""
          class="col-1 rounded-circle p-0 ml-3" />
        <div class="col-10">
          <form class='form col-12'>
            <textarea name="newpost" cols="30" rows="10" class="form-control col-12 border-0 rounded-0 bg-light"
              placeholder="Write something here"></textarea>
          </form>
        </div>
      </div>
      <div class="col-12 row container p-1 m-auto text-center justify-content-center">
        <div class="col-4 lightgray text-dard round m-1">
          <i class="fa fa-file-image-o"></i>
          <p class="small d-inline">Image/Video</p>
        </div>
        <div class="col-4 lightgray text-dard round m-1">
          <i class="fa fa-user-plus"></i>
          <p class="small d-inline">Tag friends</p>
        </div>
      </div>
    </div>

    {/* <!--          regular post section--> */}
    <div class="bg-light hid rounded mt-2">
      <div class="container-fluid border-bottom lightgray pt-1 rounded-top pb-1 pl-2 row m-auto">
        <img class="col-1 rounded-circle p-0 ml-3" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
          alt='img' />
        <div class="col-10">
          <p class="small">Manas</p>
          <p class="extra_small">Posted on 6 Dec 2018</p>
        </div>
      </div>
      <div class="col-12 border-bottom p-0 " style={{marginLeft: "25%"}}>
        <img style={{height: "40vh", width: "40vh" ,border:  "white 4px solid"}} class="col-12 m-0 p-0 rounded-circle "
          src="https://images.pexels.com/photos/1141792/pexels-photo-1141792.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      </div>
      <div class="col-12 border-bottom row m-auto p-2 text-center">
        <div class="col-6">
          <p class='small'>200 Likes</p>
        </div>
        <div class="col-6">
          <p class='small'>200 Comments</p>
        </div>
      </div>
      {/* <!--            like comment section--> */}
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
          <img class="col-1 rounded-circle p-0 ml-3" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
            alt='img' />
          <form class="ml-2 form form-inline lightgray col-10 round hid">
            <input class="form-control border-0 col-11 transparent" name='comment' placeholder="Write a comment" />
            <button class="btn rounded-0 transparen text-primary col-1"><i class="fa fa-paper-plane"></i></button>
          </form>
        </div>
      </div>

    </div>


  </div>
</div>
<div class="col-1 full"> </div>
{/* <!-- third column --> */}
<div class="col-3 full">
  <div class="container col-12 m-auto bg-light mb-2">
    <strong>
      <p class="text-secondary">Friend Request</p>
    </strong>
    <hr />
    <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
      <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt=""
        class="col-3 bg-secondary rounded-circle p-0" />
      <div class="col-9">
        <p class="text-secondary">ManasRanjan</p>
        <p class="text-secondary" style={{fontSize: "10px"}}>From Jamshedpur</p>
      </div>
      <div class="row col-12 p-1 m-auto justify-content-between">
        <div class="col-5 bg-primary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Accept</div>
        <div class="col-5 bg-secondary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Delete</div>
      </div>
    </div>
    <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
      <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt=""
        class="col-3 bg-secondary rounded-circle p-0" />
      <div class="col-9">
        <p class="text-secondary">ManasRanjan</p>
        <p class="text-secondary" style={{fontSize: "10px"}}>From Jamshedpur</p>
      </div>
      <div class="row col-12 p-1 m-auto justify-content-between">
        <div class="col-5 bg-primary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Accept</div>
        <div class="col-5 bg-secondary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Delete</div>
      </div>
    </div>

    <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
      <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt=""
        class="col-3 bg-secondary rounded-circle p-0" />
      <div class="col-9">
        <p class="text-secondary">ManasRanjan</p>
        <p class="text-secondary" style={{fontSize: "10px"}}>From Jamshedpur</p>
      </div>
      <div class="row col-12 p-1 m-auto justify-content-between">
        <div class="col-5 bg-primary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Accept</div>
        <div class="col-5 bg-secondary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Delete</div>
      </div>
    </div>
    <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
      <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt=""
        class="col-3 bg-secondary rounded-circle p-0" />
      <div class="col-9">
        <p class="text-secondary">ManasRanjan</p>
        <p class="text-secondary" style={{fontSize: "10px"}}>From Jamshedpur</p>
      </div>
      <div class="row col-12 p-1 m-auto justify-content-between">
        <div class="col-5 bg-primary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Accept</div>
        <div class="col-5 bg-secondary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Delete</div>
      </div>
    </div>
    <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
      <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt=""
        class="col-3 bg-secondary rounded-circle p-0" />
      <div class="col-9">
        <p class="text-secondary">ManasRanjan</p>
        <p class="text-secondary" style={{fontSize: "10px"}}>From Jamshedpur</p>
      </div>
      <div class="row col-12 p-1 m-auto justify-content-between">
        <div class="col-5 bg-primary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Accept</div>
        <div class="col-5 bg-secondary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Delete</div>
      </div>
    </div>
    <div class="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
      <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt=""
        class="col-3 bg-secondary rounded-circle p-0" />
      <div class="col-9">
        <p class="text-secondary">ManasRanjan</p>
        <p class="text-secondary" style={{fontSize: "10px"}}>From Jamshedpur</p>
      </div>
      <div class="row col-12 p-1 m-auto justify-content-between">
        <div class="col-5 bg-primary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Accept</div>
        <div class="col-5 bg-secondary rounded text-light pt-1 pb-1" style={{fontSize: "13px"}}>Delete</div>
      </div>
    </div>

  </div>
  



</div>
</div>
<Modal className="Modal" isOpen={this.state.profileimageModel} onRequestClose={true}>
       
        <Segment placeholder className="row">
        <button
          style={{
            background: "transparent",
            width: "inherit",
            outline: "none",
            border:"none"
          }}
          onClick={() => {
            this.setState({profileimageModel:false});
          }}
        >
          <CloseIcon
            style={{ marginLeft: "500px", marginTop: "-5rem", zIndex: "2" }}
          />{" "}
        </button>
          <div
            id="nobox"
            className="col-12 mb-5 "
            style={{ marginLeft: "35%" }}
          >
            {" "}
            Uplaod Your Profile Picture
          </div>
          <div id="nobox" className="col-12 ">
            {" "}
            <Form.Field>
              <input type="file" onChange={this.handleChangeFile} className="mb-5" />
              <Button type="submit" onClick={this.handleSubmit}>
                Upload
              </Button>
            </Form.Field>
          </div>
        </Segment>
      </Modal>

            </>
            
        )
    }
}

export default   withState(Profile) 