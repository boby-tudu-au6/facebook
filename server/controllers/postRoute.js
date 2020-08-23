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
const { post } = require("./getRoute");

// User.findOne({_id:"5f2d37d5402ae80e8c46c21c"})
// .populate("friend.friendId",'post')
// .then(data=>{
//   console.log(data.friend[0].friendId)
//   });
let arr=['5f2d3856402ae80e8c46c21d','5f2d37d5402ae80e8c46c21c']
let testdata = [{"friendId":[{"post":["5f3a25338ba5301ad8945247","5f3a46804a411515d07800f9","5f3a47759d0f422ec4802652"],"_id":"5f2d3856402ae80e8c46c21d"}]}
]
const testarr = []
testdata.forEach(item=>{
  let data = item.friendId[0].post
  data.forEach(e=>testarr.push(e))
// Post.find({_id:{$in:posts}})
//     .sort({time:-1})
//     .limit(1)
//     .skip(0)
})
// Post.find({_id:{$in:testarr}})
//     .sort({time:-1})
//     .limit(1)
//     .skip(0)
//     .then(data=>console.log(data))

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
  
  createGroup: async (req,res)=>{
    const {groupName,groupMember,type} = req.body;

    try{
      const newGroup = await Group.create({
        groupName,
        groupMember,
        type
      })
      res.json({message:newGroup})
    }
   catch(err){
     console.log(err)
     res.status(401).json({message:"server error group not created "})
   }
  

  },
  getpost:async (req,res)=>{
    const posts = []
    const {userid,page} = req.body
    const allpost = await User.findOne({_id:userid})
                    .populate("friend.friendId",'post')
                    .select("friendId post")
    allpost.post.forEach(element=>posts.push(element))
    allpost.friend.forEach(element => {
      let newarr = element.friendId[0].post
      newarr.forEach(item=>posts.push(item))
    });
    // console.log(posts)
    const finalpost = await Post.find({_id:{$in:posts}})
                      .sort({time:-1})
                      .limit(5)
                      .skip((page-1)*5)
    res.status(200).json({length:posts.length,data:finalpost})
  }




  
};





  