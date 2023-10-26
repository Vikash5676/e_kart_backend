const UserModel = require("../models/userSchema");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const bcrypt = require("bcrypt")

const handleErrors = (err) => {
    let errors = { username: "", email: "", password: "" }

    if (err.code === 11000) {
        errors.username = "This username Alredy exist"
    }

    // error validation 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors

}

const getToken = (user) => {
    return jwt.sign(user, process.env.JWT_SIGN_KEY, { expiresIn: '3d' })
}

const getUser = async (req, res) => {
    const data = req.body
    try {
        const check_user = await UserModel.findOne({ username: data.username })
        if (check_user !== undefined) {
            const check_password = await bcrypt.compare(String(data.password), check_user.password)
            if (check_password) {
                const token = getToken(data)
                res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 3 * 1000 })
            }
            return res.status(200).json({ execution: check_password, message: check_password ? "" : "Entered Password Is Incorrect" })
        } else {
            return res.status(201).json({ execution: false, message: "This username does not exist" })
        }
    } catch (error) {
        return res.status(400).json({ execution: false, message: error })
    }
}

const addUser = async (req, res) => {

    const data = req.body
    try {
        const user = new UserModel(data)
        await user.save()
        const token = getToken(data)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 3 * 1000 })
        res.status(201).json({ executed: true, message: "" })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }

}

module.exports = { getUser, addUser }