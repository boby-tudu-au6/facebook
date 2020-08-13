import React, { useEffect, useState, useRef } from 'react';
import {connect} from 'react-redux';
import Peer from "simple-peer";
import styled from "styled-components";


const Container = styled.div`
  height: auto;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
`;

const Video = styled.video`
  
`;
function Videoapp(props){
    const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false)

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = props.socket
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    if(socket.current!==null){
      
        socket.current.on("yourID", (id) => {
            setYourID(id);
          })
          socket.current.on("allUsers", ({users}) => {
            setUsers(users);
          })
          socket.current.on("useroffline",({userid})=>{
            // alert('user offline')
            setCallAccepted(false)
            setCaller("")
            setCallerSignal(null)
            setReceivingCall(false)
          })
      
          socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
          })
    }
  }, [props.socket,users]);

  
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
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

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
        <Video className='localVideo col-3' playsInline muted ref={userVideo} autoPlay>
      </Video>
        {/* <div className='controls row col-12 text-center justify-content-center m-auto bg-secondary'>
          <button className='btn btn-danger rounded-circle'>
            <i class="fas fa-phone-slash"></i>
          </button>
          <button className='hangupBtn btn btn-primary rounded-circle'>
            <i class="fas fa-phone-slash"></i>
          </button>
        </div>*/}
      </div> 
    );
  }

  let PartnerVideo=null;
  if (callAccepted===true) {
    PartnerVideo = (
      <div className='remoteDiv'>
        <Video className='remoteVideo' playsInline ref={partnerVideo} autoPlay>
      </Video>
        <div className='controls row col-12 justify-content-center m-auto'>
          <button className='btn btn-danger rounded-circle'>
            <i class="fas fa-phone-slash"></i>
          </button>
          <button className='hangupBtn btn btn-primary rounded-circle'>
            <i class="fas fa-phone-slash"></i>
          </button>
        </div>
      </div>
    );
  }

  let incomingCall=null;
  if (receivingCall===true && callAccepted===false) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
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
        {callAccepted===false && receivingCall===false?Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button key={Math.random()} onClick={() => callPeer(key)}>Call {key}</button>
          );
        }):null}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
  );
}
const mapStateToProps = state=>{return {...state}}
export default connect(mapStateToProps)(Videoapp)
