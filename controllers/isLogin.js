const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    try {
        if (req.cookies) {
            let token = req.cookies.accessToken;
            verifyToken = jwt.verify(token, "TokenSecret");
        } else {
            verifyToken = undefined;
        }
        if (verifyToken === undefined) {
            res.status(200).send({
                isLogin: "pending"
            })
        } else {
            res.status(200).send({
                isLogin: "true"
            })
        }

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(202).send({
                isLogin: "false"
            })
        } else {
            res.status(202).send(err)
        }
    }
}