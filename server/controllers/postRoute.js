const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Post = require("../models/postModel");
const Request = require('../models/requestModel')
const jwt = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");
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

  
  search:async(req,res)=>{
    const {q} = req.body
    try{
      const user = await User.find({
        $or:[
          {'firstname':{$regex:q,$options:"i"}}, 
          {'lastname':{$regex:q,$options:"i"}}
        ]
      }).limit(6)
      return res.status(200).json({user})
    }catch(err){
      return res.status(500).json({message:"server error"})
    }
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
      return res.status(200).json({message:"invalid token"})
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
  },
  getProfile:async (req,res)=>{
    const {userid} = req.body
    const user = await User.findOne({_id:userid})
    res.status(200).json(user)
  },
  getName:async (req,res)=>{
    const {id} = req.body
    const user = await User.findOne({_id:id})

    res.status(200).json({firstname:user.firstname,lastname:user.lastname})
  },
  getPostImg:async(req,res)=>{
    const {arr} = req.body
    const post = await Post.find({_id:{$in:arr}})
    .select("data")
    res.status(200).json({post})
  },
  test:async(req,res)=>{
    // const {token} = req.headers
    try{
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJmcmllbmQiOlt7InJvb20iOiJhMzUwOGM3Mi0yZDk1LTRhN2MtOTcxYi1hN2EwZmRmYjE2MmUiLCJmcmllbmRJZCI6IjVmMmQzYTEzNDAyYWU4MGU4YzQ2YzIyMSJ9LHsicm9vbSI6ImE3ZmY5MTY3LWFmN2EtNDcwOS1hOWY4LWE4YWFmOWI0ZDMyMSIsImZyaWVuZElkIjoiNWYyZDM4NTY0MDJhZTgwZThjNDZjMjFkIn1dLCJmcmllbmRSZXF1ZXN0IjpbXSwibm90aWZpY2F0aW9uIjpbXSwic29ja2V0aWQiOiIiLCJwcm9maWxlUGljIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHE4aWptbGJmL2ltYWdlL3VwbG9hZC92MTU5ODE5ODMyNy9icWZqbWhvN240dnU3Z2hqOHhkdS5qcGciLCJjb3ZlckltZyI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RxOGlqbWxiZi9pbWFnZS91cGxvYWQvdjE1OTgyNzgzNTUvZzJ1dHg1dnRqdHd4Y21nMG12bXQuanBnIiwicG9zdCI6WyI1ZjQyMzJlMWRhMDk1NDFiZGMwYjUzZTgiLCI1ZjQyODljNzY5M2ExNDI5MTQxZjY0MmUiLCI1ZjQyOTIzODQyMmUxMTI1MDQwN2ZmMzQiLCI1ZjQzMThjMmI3ODRmZDFkNzBiYzVhOWIiLCI1ZjQzNDhkN2RiMzRiYzMzZjAwMWI5M2UiLCI1ZjQzY2FkNGE5ZjUxNDMxOTQwNzg2MmMiXSwiX2lkIjoiNWYyZDM3ZDU0MDJhZTgwZThjNDZjMjFjIiwiZmlyc3RuYW1lIjoiQm9ieSIsImxhc3RuYW1lIjoiVHVkdSIsImJpcnRoZGF5IjoiMjAyMC0wOC0wNyIsImdlbmRlciI6Im1hbGUiLCJlbWFpbCI6ImpzOTAzNzgzQGdtYWlsLmNvbSIsInBob25lIjoiIiwicGFzc3dvcmQiOiIkMmIkMTAkWTdxVHRmQlUxbjBrb0toSy5kTFRydUJWQi9vSzdJNjBuNFlrNFFlMnFwLzROd0VibUVPbksiLCJsYXN0TG9naW4iOiIyMDIwLTA4LTA3VDExOjE1OjMzLjUwMFoiLCJfX3YiOjAsImN1ckNoYXQiOnsiZnJpZW5kaWQiOiI1ZjJkM2ExMzQwMmFlODBlOGM0NmMyMjEiLCJmcmllbmRGaXJzdE5hbWUiOiJyYWpqdSIsImZyaWVuZExhc3ROYW1lIjoia3VtYXIiLCJzb2NrZXRpZCI6Il9zZkRFMHJDaFZORFFOZGJBQUFQIiwicm9vbSI6ImEzNTA4YzcyLTJkOTUtNGE3Yy05NzFiLWE3YTBmZGZiMTYyZSIsInVzZXJpZCI6IjVmMmQzN2Q1NDAyYWU4MGU4YzQ2YzIxYyJ9LCJ0b2tlbiI6IjEzMmFlM2Y1LThiM2EtNGI2ZC1iYTI0LTRhMTFmYTVlNmNiZSIsImJpbyI6Ik5BamhqZ2hmIiwiY2l0eSI6Ik11bWJhaSIsImVkdWNhdGlvbiI6IkdyYWR1YXRpb24iLCJsYW5ndWFnZSI6Ik1hcmF0aGkiLCJyZWxhdGlvbnNoaXAiOiJJbiBhIFJlbGF0aW9uc2hpcCJ9XSwiaWF0IjoxNTk4MzIxNzgwLCJleHAiOjE1OTgzMjUzODB9.wHEkDxT7-XDwYPIalTJff6u4KgM4Ay2zuvWmDWG4mTs'
      const data = jwt.verify(token,'secret')
      const data2 = await User.findOne({_id:data.user[0]._id})
      if(data.user[0].token===data2.token){
        return res.status(200).json(data.user)
      }
    }catch(err){
      return res.status(401).json({message:"invalid token"})
    }
  },

  resetPassword: async (req, res) => {
    let type = req.query.type;
    let mobile = req.query.mobile;
    let email = req.query.email;
    if (type === "email") {
      let data = await User.findOne({ email: email });
      console.log(data);
      if (data) {
        var userOtp = Math.floor(Math.random() * 10000000000) + "";
        userOtp = userOtp.slice(0, 5);

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "rmanas000@gmail.com",
            pass: "12jk1a0348!@#",
          },
        });

        var receiverEmail = email;
        let mailOptions = {
          from: "Facebook",
          to: receiverEmail,
          bcc: "mrmanasranjan547@gmail.com",
          subject: "Password Reset Code",
          text: `Your Password Reset verification code is:   ${userOtp} `,
          html: `<b "style"="color:blue"> Welcome to Facebook.Thanks For Registering With Us Mr. Your Facebook verification code is :-  ${userOtp} </b>`,
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) return console.log(error);
          await User.findOneAndUpdate(
            { email: email },
            { vCode: userOtp },
            { new: true },
            (err, doc) => {
              console.log(doc);
            }
          );
          res.json({message:"otp sent to your reg email"})
          console.log("Message sent: %s", info.messageId);
        });

      }
      
    } else {
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { email } = req.query;
      const { vCode } = req.query;
      // Code = parseInt(vCode);
      const foundUser = await User.find({ email: email });
      console.log((foundUser[0].vCode))
      if (!foundUser) return res.json({ msg: "user doenot exixt" });
      // else if (typeof Code !== "number")
      //   return res.send("code format mismatched");
      else if (vCode == foundUser[0].vCode) {
        const foundUser = await User.findOneAndUpdate(
          { email: email },
          { passReset: true },
          { new: true },
          (err, doc) => {
            console.log(doc);
          }
        );
        if (!foundUser) return res.json("user not exists");
        res.status(200).json({ msg: "code verified" });
      } else return res.send("code didnt match");
    } catch (err) {
      console.log(err);
    }
  },
  passChange:async(req,res)=>{
    let {email} = req.query
    const hashedPassword = await hash(req.body.password, 10);
    let userData =await User.find({email:email})
    if(!userData) return res.json({message:"no user found for this details"})
    if(userData[0].passReset === true) {
      await User.findOneAndUpdate({email:email},{password:hashedPassword},{new:true},(err,doc)=>{
        console.log(doc)
        res.json({message:"Password reset Successfully"})
      })
    }else{
      res.json({err:"please verify your email or mobile first"})
    }


  }




  
};





  