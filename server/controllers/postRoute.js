const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Post = require("../models/postModel");
const Request = require('../models/requestModel')
const jwt = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("./fileUpload/cloudinary/cloudinary")
const bufferToString = require('./fileUpload/bufferToString/bufferToString');
const { json } = require("express");

// User.findOne({_id:"5f2d37d5402ae80e8c46c21c"})
// .populate("friend.friendId",'post')
// .then(data=>{
//   console.log(data.friend[0].friendId)
//   });
let arr=['5f2d3856402ae80e8c46c21d','5f2d37d5402ae80e8c46c21c']
// User.findOne({_id:{$in:arr.split(',')}})
// .select('firstname')
// .then(data=>console.log(data))

module.exports = {
  // register route
  register: async (req, res) => {
    const {
      firstname,
      lastname,
      gender,
      birthday,
      email,
      phone,
      password
    } = req.body;
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      birthday,
      gender,
      email,
      phone,
      password: hashedPassword
    });
    res.status(201).json({ status: "success", data: newUser });
  },

  //login route
  login: async (req, res) => {
    try {
      const { email, password, phone } = req.body;
     
      let loggedUser = null
      if (email==null){  loggedUser = await User.find({phone})}
      else{  loggedUser = await User.find({email})}
      const isMatched = await compare(password, loggedUser[0].password);
      
      if (loggedUser !== null) {
        if (!isMatched) return res.json("Incorrect credentials");

        const test = uuidv4()
        const newdata = await User.findOneAndUpdate({email:loggedUser[0].email},{token:test})  
        
        const userdata = await User.find({_id:newdata._id})
        const token = jwt.sign({ user: userdata }, "secret", {
          expiresIn: "1h"
        });
        res.status(200).json({ status: "success", data: loggedUser[0], token });
      } else {
        res.status(401).json({ status: "failed", message: "unauthorized" });
      }
    } catch (err) {
      return res.json({ msg: err });
    }
  },

  // send message route
  sendMessage: async (req, res) => {
    const { data } = req.body;
    await User.findByIdAndUpdate(
      { _id: data },
      { $push: { friendRequest: data } }
    );
  },
  search:async(req,res)=>{
    const {q} = req.body
    const user = await User.find({
      $or:[
        {'firstname':{$regex:q,$options:"i"}}, 
        {'lastname':{$regex:q,$options:"i"}}
      ]
    }).limit(6)
    return res.status(200).json({user})
  },
  getRequest:async (req,res)=>{
    const {_id} = req.body
    const allrequest = await Request.find({to:_id}).populate('from')
    return res.status(200).json(allrequest)
  },

  // get all friends of provided userid
  getFriend:async (req,res)=>{
      const user = await User.findOne({_id:req.body._id})
      .populate('friend.friendId')
      return res.status(201).json(user)
  },
  getChat:async(req,res)=>{
    const {userid,friendid,curChat} = req.body
    await User.updateOne({_id:userid},{curChat})
    await Message.updateMany({to:userid,unread:"true"},{unread:"false"})
    const chats1 = await Message.find({to:userid,from:friendid})
    const chats2 = await Message.find({to:friendid,from:userid})
    const chats = chats1.concat(chats2)

    return res.status(200).json(chats)
  },
  delChat:async(req,res)=>{
    const {userid} = req.body
    await User.updateOne({_id:userid},{curChat:{}})
  },
  checkLogin:async(req,res)=>{
    const {user} = req.body
    try{
      const data = jwt.verify(user,'secret')
      const data2 = await User.findOne({_id:data.user[0]._id})
      if(data.user[0].token===data2.token){
        return res.status(200).json(data.user)
      }
    }catch(err){
      return res.status(401).json({message:"invalid token"})
    }
  },
  // post:async (req,res)=>{
  //   const { originalname,buffer,mimetype } = req.files
  //   const { message, userid } = req.body
  //   try{
  //     const data=[]
  //     req.files.forEach(async element => {
  //       const { originalname,buffer,mimetype } = element
  //       const imageContent = bufferToString( originalname,buffer)
  //       const { secure_url } = await cloudinary.uploader.upload(imageContent)
  //       console.log("upload done")
  //       data.push({type:mimetype,data:secure_url})
  //       if(req.files.length===data.length){
  //         data.push({type:'text',data:message})
  //         const newPost = await Post.create({
  //           from:userid,
  //           data
  //         })
  //         console.log(req.body.message)
  //         return res.status(200).json(data)
  //       }
  //     });
  //   }catch(err){
  //     res.status(400).json({message:"something wrong happened"})
  //   }
  // }
  getpost:async (req,res)=>{
    const {userid} = req.body
    const allpost = await User.findOne({_id:"5f2d37d5402ae80e8c46c21c"})
                    .populate("friend.friendId",'post')
    res.status(200).json({post:allpost.friend[0].friendId})
//     User.findOne({_id:"5f2d37d5402ae80e8c46c21c"})
// .populate("friend.friendId",'post')
// .then(data=>{
//   console.log(data.friend[0].friendId)
//   });
  }
};





  