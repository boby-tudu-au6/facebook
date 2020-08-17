const User = require('../models/userModel')
const Request = require("../models/requestModel")
const Message = require('../models/messageModel')
const Post = require("../models/postModel")
const server = require('./index')
const { v4: uuidv4 } = require('uuid');
const bufferToString = require('../controllers/fileUpload/bufferToString/bufferToString')
const cloudinary = require("../controllers/fileUpload/cloudinary/cloudinary")
const { post } = require('../controllers/postRoute')

 
// websocket functions
const io = require('socket.io')(server);
const users = {}
io.on('connection', socket => {
  
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  // this will log when new user will connect
  console.log(`made socket connection at ${socket.id}`)
  io.sockets.emit("imonline",{socketid:socket.id})

  socket.on("chatRead",async data=>{
    await Message.updateOne({_id:data._id},{unread:"false"})
  })
  // this will run when user will connnect
  socket.on("updatesocketid",async data=>{
    await User.findByIdAndUpdate(
      {_id:data.userid},
      {socketid:socket.id})
      socket.emit('userOnline',{userid:data.userid})
  })

// this will run when user will disconnect
  socket.on("disconnect",async ()=>{
    delete users[socket.id];
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
  
  socket.on("leaveroom",({room})=>{
    // socket.leave(`room-${room}`)
    io.of('/').in(room).clients((error, socketIds) => {
      if (error) throw error;
    
      socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(`room-${room}`));
      console.log("leaved room")
    
    });
    io.to(room).emit('useroffline',{userid:socket.id})
  })
  socket.on('joinroom', data => { 
    // const rooms = io.nsps['/'].adapter.rooms;
    console.log(`${socket.id} joined ${data.room}`)
    socket.join(data.room)
    socket.on("videostarted",()=>{
      socket.emit("yourID", socket.id);
      io.sockets.emit("allUsers", {users});
      
      socket.on("callUser", (data) => {
          io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
      })
      
      socket.on("acceptCall", (data) => {
          io.to(data.to).emit('callAccepted', data.signal);
      })
    })
    socket.on('chat', async data => { 
      const chat = await Message.create({...data})
      io.sockets.emit("chat",chat)
      // console.log("chat fired",data)
      })
    
   });

   socket.on("newpost",({data,userid,message})=>{
     const arr = []
     data.forEach(async item=>{
      const imageContent = bufferToString( item.name,item.data)
        const { secure_url } = await cloudinary.uploader.upload(imageContent)
        arr.push({type:item.type,data:secure_url,userid})
        if(data.length===arr.length){
          const newpost = await Post.create({
            from:userid,
            data:arr,
            message
          })
          await User.updateOne({_id:userid},
            {$push:{
              post:{_id:newpost._id}
            }}
          )
          io.sockets.emit("newpostdone",newpost)
        }
     })

    //  data.push({type:mimetype,data:secure_url})
    //  if(req.files.length===data.length){
    //    data.push({type:'text',data:message})
    //    const newPost = await Post.create({
    //      from:userid,
    //      data
    //    })



    // {
    //   data: [
    //     {
    //       id: '0.6529080226177817',
    //       name: '155977.jpg',
    //       type: 'image/jpeg',
    //       data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 43 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c ... 894018 more bytes>
    //     },
    //     {
    //       id: '0.3790362025429215',
    //       name: '157687.jpg',
    //       type: 'image/jpeg',
    //       data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff fe 00 3c 43 52 45 41 54 4f 52 3a 20 67 64 2d 6a 70 65 67 20 76 31 2e 30 20 28 75 73 69 ... 185524 more bytes>
    //     }
    //   ]
    // }
    
   })

  //  random functin for later use
  // socket.on('chat', async data => { 
  //   const chat = await Message.create({...data})
  //   io.sockets.emit("chat",chat)
  //   // console.log("chat fired",data)
  //  })
});

module.exports = io