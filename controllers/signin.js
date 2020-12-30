const { Comment, Content, Like_User, User } = require("../models")
const jwt = require("jsonwebtoken")

module.exports = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then(user => {
        if (user == null) {
            res.status(200).json({ signin: false })
        }else{
            const accessToken = jwt.sign({
                userId: user.id,
                name: user.name
            }, "TokenSecret"
                , { expiresIn: '1h' }
            )
            res.cookie("accessToken", accessToken,
            // {
            //     secure:true,
            //     sameSite:"none"
            // }
            );
            res.status(200).json({ accessToken, signin: true })
        }
    })
    .catch(err => {
        res.status(202).send({signin:false})
    })
}