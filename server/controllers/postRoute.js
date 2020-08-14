const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const Request = require('../models/requestModel')
const { compare, hash } = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
  
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
  }
};


  