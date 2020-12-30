const {Comment, Content,Like_User,User} = require("../models");

module.exports = (req,res) =>{
    try{
        let {contentID} = req.body
        Comment.findAll({
            where:{
                contentID
            },
            include:[
                {
                    model: User,
                    required:false
                }
            ]
        })
        .then(data=>{
            res.status(202).send({result:data} )
        })
    }catch(err){
        res.status(404).send(err)
    }
}
