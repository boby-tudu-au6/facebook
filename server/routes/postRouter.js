const router = require("express").Router()
const post = require("../controllers/postRoute")

router.post("/register",post.register)
router.post('/login',post.login)
router.post('/search',post.search)
router.post("/getrequest",post.getRequest)
router.post("/getfriend",post.getFriend)
router.post("/getchat",post.getChat)
router.post("/delchat",post.delChat)
router.post("/checklogin",post.checkLogin)
router.post("/getpost",post.getpost)
router.post("/createGroup",post.createGroup)
   
module.exports = router; 