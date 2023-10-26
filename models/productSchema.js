const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    item_name: {
        type: String,
        required: [true, "Product Name is Required"]
    },
    item_quantity: {
        type: Number,
        min: [0, "Quantity cannot be less than 0"],
    },
    item_desc: {
        type: String,
    },
    item_raiting: {
        type: Array
    },
    item_price: {
        type: Number
    },
    discount_value: {
        type: Number
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: String
    }

})

const productModel = model("products", ProductSchema)

module.exports = productModel