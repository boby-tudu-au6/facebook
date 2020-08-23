import React, { useEffect, useState, useRef } from 'react';
import {connect} from 'react-redux';
import Peer from "simple-peer";
import styled from "styled-components";
import {delChatId} from '../../redux/action/action'
import { useStateIfMounted } from "use-state-if-mounted";

const Container = styled.div`
  height: auto;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
`;

const Video = styled.video`
  
`;
function Audioapp(props){
  const [yourID, setYourID] = useStateIfMounted("");
  const [users, setUsers] = useStateIfMounted({});
  const [stream, setStream] = useStateIfMounted();
  const [receivingCall, setReceivingCall] = useStateIfMounted(false);
  const [caller, setCaller] = useStateIfMounted("");
  const [callerSignal, setCallerSignal] = useStateIfMounted();
  const [socketid, setSocket] = useStateIfMounted('');
  const [callAccepted, setCallAccepted] = useStateIfMounted(false)

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = props.socket
    try{
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })
    }catch(err){
      console.log("audio not found")
      console.log(err.message)
    }

    if(socket.current!==null){
      
        socket.current.on("audio_yourID", (id) => {
            setYourID(id);
          })
          socket.current.on("audio_allUsers", ({users}) => {
            setUsers(users);
          })
          socket.current.on("audio_useroffline",({userid})=>{
            // alert('user offline')
            setCallAccepted(false)
            setCaller("")
            setCallerSignal(null)
            setReceivingCall(false)
          })
      
          socket.current.on("audio_hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
          })
          // console.log(props.curChat)
          if(props.curChat.socketid!==''){
            setSocket(props.curChat.socketid)
          }
    }
  }, [props.socket,users,props.curChat]);

  
  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {

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
      stream: stream,
    });

    peer.on("signal", data => {
      socket.current.emit("audio_callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("audio_callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })
    // socket.current.on("imonline",()=>setSocket(props.curChat))

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <div>
        <Video className='localVideo col-3' playsInline muted ref={userVideo} autoPlay />
      </div> 
    );
  }
  let btnclass = 'btn rounded-circle btn-success'
  let onclickfunc = ()=>callPeer(props.curChat.socketid)
  let incomingCall=null;
  if (receivingCall===true && callAccepted===false) {
    btnclass = `${btnclass} box bounce-1`
    onclickfunc = acceptCall
    // incomingCall = (
    //   <div className='box bounce-1'>
    //     <h1>{caller} is calling you</h1>
    //     <button onClick={acceptCall}>Accept</button>
    //   </div>
    // )
  }
  let PartnerVideo=<div style={{
      position:"absolute",
      left:"0px",
      width:"600px",
      height:"350px",
      backgroundColor:"black"
    }}>
    {socketid!==''?<button className={btnclass}
    style={{marginTop:"300px"}} onClick={onclickfunc}>
      <i className="fas fa-phone"></i></button>:null}
  </div>;
  if (callAccepted===true) {
    PartnerVideo = (
      <div style={{
        position:"absolute",
        left:"0px",
        width:"600px",
        height:"350px",
        backgroundColor:"black"
      }}>
        <Video className='remoteVideo' playsInline ref={partnerVideo} autoPlay />
        <div className='controls row col-12 justify-content-center m-auto'>
          <button className='btn btn-danger rounded-circle m-auto'
          onClick={()=>{
            if(props.curChat!==null){props.socket.emit("leaveroom",{room:props.curChat.room})}
            props.delChatId(props.userid)
            }}>
            <i className="fas fa-phone-slash"></i>
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <Container>
      <Row>
        {UserVideo}
        {PartnerVideo}
      </Row>
      <Row>
        {callAccepted===false && receivingCall===false?Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          if(key === props.curChat.socketid){
            return (
              <button key={Math.random()} onClick={() => callPeer(key)}>Call {key}</button>
            );
          }
        }):null}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
  );
}
const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch =>{
  return {
    delChatId:payload=>dispatch(delChatId(payload))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Audioapp)
