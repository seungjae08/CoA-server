const {Comment, Content,Like_User,User} = require("../models")
const jwt = require("jsonwebtoken");

module.exports = (req,res)=>{
    //JWT가 client에 존재할것이다.(저장소에 따른 가정)
    //if => JWT가 Cookie에 존재한다면? 
    //client 안에 있는 쿠키를 삭제하도록 유도시키자.
    //if => JWT가 브라우저 내에 존재한다면?
    //client 안 브라우저에서 JWT를 삭제
    //(client가 request를 보냈을때)set-Cookie : A: 123; B:4567;
    //(server에서 response) set-Cookie : A:delete; B:4567; 
    //(client의 쿠키가 바뀐다.)\
    try{
        
        const token = req.cookie.split("accessToken=")[1];
        let verifyToken = jwt.verify(token,"TokenSecret")
        res.clearCookie('accessToken',
        // {
        //     secure:true,
        //     sameSite:"none"
        // }
        ).send(req.cookies);
    }catch(err){
        console.log(err)
        res.status(403).send(err)
    }
}