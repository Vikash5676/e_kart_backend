const jwt = require("jsonwebtoken")

const verifyJwt = (req, res, next) => {
    const jwt_token = req.cookies.jwt
    jwt.verify(jwt_token, process.env.JWT_SIGN_KEY, function (err, payload) {
        if (err) {
            console.log(err)
        } else {
            next()
        }
    })

}

const verifyAdmin = (req, res, next) => {
    const jwt_token = req.cookies.jwt
    jwt.verify(jwt_token, process.env.JWT_SIGN_KEY, function (err, payload) {
        if (err) {
            console.log(err)
        } else if (payload.role === "admin") {
            next()
        } else {
            res.send("you are not allowed to visit this page")
        }
    })

}
module.exports = { verifyJwt, verifyAdmin }