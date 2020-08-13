import React, { Component } from 'react'
import Peer from 'simple-peer'
import {connect} from 'react-redux'
import './video.css'
import styled from "styled-components";

class Videocall extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      yourID:"",
      users:{},
      stream:null,
      receivingCall:false,
      caller:"",
      callerSignal:null,
      callAccepted:false,
      userVideoStream:{},
      partnerVideo:{}
    }
  }
  componentDidMount(){
    navigator.mediaDevices.getUserMedia({
      video:true,audio:true
    }).then(stream=>{
      this.setState({stream:stream,userVideoStream:stream})
    })
    this.props.socket.on('yourID',id=>{
      this.setState({yourID:id})
    })
    this.props.socket.on("allUsers",users=>this.setState({users}))
    this.props.socket.on("hey",data=>{
      this.setState({
        receivingCall:true,
        caller:data.from,
        callerSignal:data.signal
      })

    })
  }

  callPeer = id=>{
    const peer = new Peer({
      initiator:true,
      trickle:false,
      stream:this.state.stream,
      config:{
        iceServers: [
          {
              urls: "stun:numb.viagenie.ca",
              username: "sultan1640@gmail.com",
              credential: "98376683"
          },
          {
              urls: "turn:numb.viagenie.ca",
              username: "sultan1640@gmail.com",
              credential: "98376683"
          }
      ]
      },
    })

    peer.on("signal", data => {
      this.props.socket.emit("callUser", { userToCall: id, signalData: data, from: this.state.yourID })
    })

    peer.on("stream", stream => {
      if (this.state.partnerVideo) {
        this.setState({partnerVideo:stream})
      }
    });

    this.props.socket.current.on("callAccepted", signal => {
      // this.setCallAccepted(true);
      this.setState({callAccepted:true})
      peer.signal(signal);
    })
  }

  acceptCall=()=> {
    this.setState({callAccepted:true})
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: this.state.stream,
    });
    peer.on("signal", data => {
      this.props.socket.current.emit("acceptCall", { signal: data, to: this.state.caller })
    })

    peer.on("stream", stream => {
      this.setState({partnerVideo:stream})
    });

    peer.signal(this.state.callerSignal);
  }
    render() {
      const Container = styled.div`
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
      `;

      const Row = styled.div`
        display: flex;
        width: 100%;
      `;

      const Video = styled.video`
        border: 1px solid blue;
        width: 50%;
        height: 50%;
      `;
      let UserVideo;
      if(this.state.stream!==null){
        UserVideo = (<Video playsInline muted srcObject={this.state.userVideoStream} ref={this.state.userVideoStream} src={this.state.userVideoStream} autoPlay />)
      }
      let PartnerVideo;
  if (this.state.callAccepted!==false) {
    PartnerVideo = (
      <Video playsInline src={this.state.partnerVideo} autoPlay />
    );
  }
  let incomingCall;
  if (this.state.receivingCall!==false) {
    incomingCall = (
      <div>
        <h1>{this.state.caller} is calling you</h1>
        <button onClick={this.acceptCall}>Accept</button>
      </div>
    )
  }
        return (
          <Container>
          <Row>
            {UserVideo}
            {PartnerVideo}
          </Row>
          <Row>
            {Object.keys(this.state.users).map(key => {
              if (key === this.state.yourID) {
                return null;
              }
              return (
                <button key={Math.random()} onClick={() => this.callPeer(key)}>Call {key}</button>
              );
            })}
          </Row>
          <Row>
            {incomingCall}
          </Row>
        </Container>
        )
    }
}
const mapStateToProps = state =>{return {...state}}
export default connect(mapStateToProps)(Videocall)
