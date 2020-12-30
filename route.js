const express = require("express");
const router = express.Router();

const signin = require('./controllers/signin');
const signup = require('./controllers/signup');
const signout = require('./controllers/signout');
const contents = require('./controllers/contents')
const isLike = require('./controllers/isLike');
const mypage = require("./controllers/mypage");
const commentGet = require("./controllers/commentGet")
const isLogin = require("./controllers/isLogin")
const comments = require("./controllers/comments")

router.post("/signin", signin);
router.post("/signup", signup);
router.get('/signout', signout);
router.get('/contents', contents);
router.post("/isLike", isLike);
router.get("/mypage", mypage);
router.post("/commentGet", commentGet);
router.get("/isLogin", isLogin);
router.post("/comments", comments);

module.exports = router;