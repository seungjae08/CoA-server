const {Comment, Content,Like_User,User} = require("../models")

module.exports  = (req,res)=>{

    let {email, password,name} = req.body

    if(email == undefined || password == undefined 
        || name==undefined){
            res.status(400).send({signup:"lack of information"})
    }
    else{
        User.findOrCreate({
            where:{
                email : email
            },
            defaults:{
                password : password,
                name : name
            }
        })
        .then(([data,created])=>{
            console.log(created)
            if(created){
                res.status(200).send({signup:true})
            }else{
                res.status(404).send({signup:false})
            }
        })
        .catch(err=>{
            res.status(404).send(err)
        })
    }
    
}