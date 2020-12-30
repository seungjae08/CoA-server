const {Comment, Content,Like_User,User} = require("../models")
const jwt = require("jsonwebtoken")

// 클릭을 누를 경우를 선택해야 한다.
// 유저가 클릭을 했으면 유저 id번호와 contentsid번호를 추가 시킨다. 

module.exports = async (req,res)=>{
    try{
        let token = req.cookies;
        if(!token){
            res.status(200).send("not authentication")
        }else{
            token = token.accessToken;
            let verifyToken = jwt.verify(token,"TokenSecret");
            let UserID = verifyToken.userId;
            let { id ,like }= req.body
            if(like == true){
                const [data,created]= await Like_User.findOrCreate({
                    where:{
                        userID : UserID,
                        contentID: id,
                    }
                })
                if(!created){
                    res.status(200).send("already GOOD")
                }else{
                    const content = await Content.findOne({
                        where:{
                            id:id
                        }
                    })
                    Content.update({likeCount:content.likeCount+1},{
                        where:{
                            id
                        }
                    })
                    res.status(200).send({
                        likeCount : content.likeCount+1
                    })
                }                    
            }else{
                await Like_User.destroy({
                    where:{
                        contentID:id,
                        userID : UserID
                    }
                })
                
                const contentData = await Content.findOne({
                        where:{
                            id:id
                        }
                })
                
                let likeCount = contentData.likeCount
                await Content.update({likeCount:contentData.likeCount-1},{
                    where:{
                        id: id
                    }
                })
        
                res.status(200).send({
                    likeCount : contentData.likeCount-1
                })
            }
        }
    }catch(err){
        console.log(err)
        res.status(404).send(err)
    }
    
}