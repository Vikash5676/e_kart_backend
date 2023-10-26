const express = require("express");
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const dbConnect = require("./db/db");
const userRouter = require("./routes/userRoutes");
const ProductRouter = require("./routes/ProductsRoutes");
const { verifyJwt } = require("./middlewares/authMiddleware");
const port = process.env.PORT || 8050


// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

// routes
app.use("/api/user", userRouter)
app.use("/api/products", verifyJwt, ProductRouter)


// establisting server 
dbConnect().then(res => {
    try {
        app.listen(port, function () {
            console.log("app is listining at port : ", port)
        })
    } catch (error) {
        console.log(error)
    }

}).catch(err => console.log(err))