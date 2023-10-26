const mongoose = require("mongoose")
const validator = require('validator');
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username Is Required"]
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Enter a Valid Email"],
        required: [true, "Email Is Required"]
    },
    password: {
        type: String,
        minLength: [8, "Minimum Password length is 8 Character"],
        maxLength: [15, "Maximum Password length is 15 Character"],
        required: [true, "Password Is Required"]
    },
    role: {
        type: String,
        required: true
    }

})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel