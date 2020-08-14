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
app.use(express.json({limit:"100kb"}))
app.use(getRouter)
app.use(postRouter)


module.exports = app