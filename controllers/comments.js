const {Comment, Content,Like_User,User} = require("../models") //comment, user, like 의 db 를 require 한다.
const jwt = require("jsonwebtoken") // user id 를 받기 위한 jwt 라이브러리를 받는다.
let verifyToken ;
let UserID;
module.exports = (req,res)=>{
    try{
        if(req.cookies.accessToken){
            let token = req.cookies.accessToken;
            verifyToken = jwt.verify(token,"TokenSecret");
            UserID = verifyToken.userId;
            let { contentID ,body }= req.body
            if(body.length > 0){ //기사의 길이가 0이상이라면,
                Comment.create({ // 조회 또는 조회후 값이 없다면 생성한다.
                    userID : UserID, //유저id
                    contentID: contentID,   // contents id
                    body : body  
                })
                .then((data)=>{//댓글을 생성하고, 사용자 아이디와 댓글을 연결시켜줘야한다.
                    res.status(200).send("댓글 달림")    
                })    
            }else{
                res.status(200).send("댓글 내용이 없음")
            }

        }else{
            res.status(200).send("not authentication")
        }
        // userID 를 찾기위한 code.
        
    }catch(err){
        console.log(err)
        res.status(404).send(err)
    }
}