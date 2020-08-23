import React, { PureComponent } from 'react'
import { Button } from 'antd';
import PhotoIcon from '@material-ui/icons/Photo';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Modal from 'react-modal'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import withState from '../hoc/withState'
import SecondColumn from '../home/SecondColumn'
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
      document.title = 'Profile|Apne'
        return (
            <>

<div class="container row col-12 m-auto pt-0">
{/* <!-- first column --> */}
<div class="col-8 ml-auto mr-auto mt-2">
<div style={{height:"50vh"}} class="row col-12 m-auto">
        <div class="col-12" style={{
          height:"80%",
          backgroundImage: "url('https://images.unsplash.com/photo-1506422748879-887454f9cdff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')",
          backgroundPosition:"center",
          backgroundSize:"cover"}}>
          
          <Button style={{marginLeft: "35rem", marginTop: "7rem"}}>TimeLine</Button>
          <Button>TimeLine</Button><div style={{marginTop: "-10rem"}}> 
          <img style={{ border:  "white 4px solid", zIndex: 2}}
            src={Dp}
            class=" mt-5  rounded-circle" alt="" />
             <Fab onClick={()=>{this.setState({profileimageModel:true})}} color="secondary" aria-label="edit" style={{outline:"none",marginTop:"8rem !important",marginLeft:"-3.5rem"}}>
        <EditIcon />
      </Fab>
            </div>
            </div>
        <div class="col-12" style={{color:"blue", marginLeft: "15rem", zIndex: -1, height:"20%",backgroundColor: "rgb(255, 255, 255)"}}>
          <Button style={{color:"blue"}}>TimeLine</Button>
          <Button style={{color:"blue"}}>Activity</Button>
          <Button style={{color:"blue"}} >Friends</Button>
          <Button style={{color:"blue"}}>Photos</Button>
          <Button style={{color:"blue"}}> Archieves</Button>
          <Button style={{color:"blue"}}>More</Button>
          
        </div>
        <hr class="col-12 pl-0 " style={{marginTop:"-0.1rem"}}  />
      </div>
      <div className='p-3'></div>
        <div className='col-12 row m-auto text-center p-0'>
          <div class="col-4 full pt-1">
        <div class="col-12 bg-light mb-2 rounded hid" style={{height: "20vh"}}></div>
            <div class="col-12 row bg-light mb-2 ml-auto mr-auto rounded hid" style={{height: "30vh"}}>
            <PhotoIcon className="col-12" style={{color:"green",marginLeft:"-6rem"}} />
              <img  class="col-6"  src={Dp} alt="dp1"/>
              <img  class="col-6"  src={Dp} alt="dp2"/>
            </div>
          </div>
          <div className='col-8 p-0'>
          <SecondColumn/>
          </div>
        </div>
      </div>
</div>
    <Modal 
    className="Modal" 
    isOpen={this.state.profileimageModel} 
    onRequestClose={true}>
      <Segment placeholder className="row p-4 m-auto">
      <button
        style={{
          background: "red",
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
          <div id="nobox" className="col-12">
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