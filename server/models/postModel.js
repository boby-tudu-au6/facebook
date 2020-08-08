const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
  from:{type:String,required:true},
  time:{type:Date, default:Date.now},
  type:String,
  place:String
})

const Post = mongoose.model('post',postSchema)
module.exports = Post