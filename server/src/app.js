require('dotenv').config()
require('./db');
const morgan = require('morgan')
const express = require('express')
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


const getRouter = require('../routes/getRouter')
const postRouter = require('../routes/postRouter')

app.use(getRouter)
app.use(postRouter)


module.exports = app