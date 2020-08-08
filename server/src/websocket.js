const User = require('../models/userModel')
const Request = require("../models/requestModel")
const Message = require('../models/messageModel')
const server = require('./index')
const { v4: uuidv4 } = require('uuid');

 
// websocket functions
const io = require('socket.io')(server);
io.on('connection', socket => {
  // this will log when new user will connect
  console.log(`made socket connection at ${socket.id}`)
  io.sockets.emit("imonline",{socketid:socket.id})

  // this will run when user will connnect
  socket.on("updatesocketid",async data=>{
    await User.findByIdAndUpdate(
      {_id:data.userid},
      {socketid:socket.id})
      socket.emit('userOnline',{userid:data.userid})
  })

// this will run when user will disconnect
  socket.on("disconnect",async ()=>{
    console.log(`userid ${socket.id} is offline`)
    const testuser = await User.findOne({socketid:socket.id})
    socket.broadcast.emit("userDisconnected",{testuser})
    await User.updateOne(
      {socketid:socket.id},
      {socketid:""})
    })

  // this will run when new friend request is created
  socket.on('friendRequest', async (data) => { 
    const {to,from} = data
    const requestFind = await Request.find({ to,from})
    if(requestFind.length===0){
        const newRequest = await Request.create(data)
      io.sockets.emit('requestCreated',newRequest)
    }
   });

  //  this will run when friend request is accepted
   socket.on("acceptRequest",async data=>{
      const room = uuidv4()
      await User.findByIdAndUpdate(
        {_id:data.to},
        {$push:{'friend':{
          room,
          friendId:data.from._id
        }}})
        await User.findByIdAndUpdate(
          {_id:data.from._id},
          {$push:{'friend':{
            room,
            friendId:data.to
          }}})
        await Request.deleteOne({_id:data._id},()=>console.log("request deleted"))
        io.sockets.emit('requestAccepted',{data})
        console.log("request accepted")
   })

  //  this will when friend request is deleted
   socket.on("deleteRequest",async data=>{
     console.log("delete request called")
    const testRequest = await Request.deleteOne({_id:data._id})
    io.sockets.emit('deletedRequest',{testRequest})
   })
   
  //  this will run when new chat is created
  socket.on('message', async (data) => { 
    await Message.create(data)
    socket.emit('message',data)
   });

  //  this will run when user join a new room
  socket.on('joinroom', data => { 
    socket.join(data.room)
    console.log("user joined room")
    // socket.emit('chat',{})
   });

  //  random functin for later use
  socket.on('chat', async data => { 
    const chat = await Message.create({...data})
    io.sockets.emit("chat",chat)
    console.log("chat fired",data)
   })
});

module.exports = io