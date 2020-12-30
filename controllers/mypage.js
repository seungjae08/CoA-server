const {Comment, Content,Like_User,User} = require("../models")
const jwt = require("jsonwebtoken")

module.exports = async (req,res)=>{
    try{
        let token = req.cookies.accessToken;
        let verifyToken = jwt.verify(token,"TokenSecret");
        let userID = verifyToken.userId;
        let userName = verifyToken.name;

        const LikeUser = await Like_User.findAll({
            where: {
                userID : userID
            }
        })
        const likeArr = [];
        LikeUser.forEach((ele)=>{
            likeArr .push(ele.contentID)
        })
        const likeContent = await Content.findAll({
            where:{
                id:likeArr
            }
        })
        const like = likeContent.reduce((acc,ele)=>{
            return [...acc,ele.id]
        },[])
        like.reverse();
        res.status(200).send({result:likeContent,like:like,name:userName})
    }
    catch(err){
        console.log(err)
        res.status(404).send(err)
    }
}