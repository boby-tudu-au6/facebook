const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname:String,
  lastname:String,
  birthday:String,
  gender:String,
  phone:String,
  email:String,
  password:String,
  token:String,
  friend:[{type:Object}],
  friendRequest:[{type:Schema.Types.ObjectId,ref:"request"}],
  notification:[{type:Object}],
  socketid:{type:String,default:""},
  profilePic:String,
  coverImg:String,
  lastLogin:{ type: Date, default: Date.now },
  place:String,
  curChat:{type:Object},
  post:[{ type: Schema.Types.ObjectId, ref: "post" }]
})

const User = mongoose.model('user',userSchema)
module.exports = User