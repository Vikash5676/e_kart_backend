const express = require("express")
const { getUser, addUser } = require("../controllers/userController")
const userRouter = express.Router()



userRouter.route("/getuser").post(getUser)
userRouter.route("/adduser").post(addUser)


module.exports = userRouter