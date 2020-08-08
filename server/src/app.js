require('dotenv').config()
require('./db');
const morgan = require('morgan')
const express = require('express')
const cors = require("cors")


const getRouter = require('../routes/getRouter')
const postRouter = require('../routes/postRouter')


const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
// app.use(morgan('combined'))
// morgan ko baad me use karenge
// pura console. bhar jaata hai
app.use(getRouter)
app.use(postRouter)
// const io = require('socket.io')(server);
// io.on('connection', socket => {
//   console.log(`made socket connection at ${socket.id}`)
//   // socket.on('connect', data => { /* … */ });
//   // socket.on('disconnect', () => { /* … */ });
// });



// app.get('/', (req, res) => res.json({message:"welcome to apne"}))

//routes global middlewares


module.exports = app