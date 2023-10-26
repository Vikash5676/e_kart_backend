const express = require("express")
const { verifyAdmin } = require("../middlewares/authMiddleware")
const { getproducts, addProducts } = require("../controllers/ProductController")
const ProductRouter = express.Router()

ProductRouter.route("/getproducts").post(getproducts)
ProductRouter.route("/addproducts").post(verifyAdmin, addProducts)


module.exports = ProductRouter