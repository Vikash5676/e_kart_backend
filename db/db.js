const mongoose = require("mongoose");
require("dotenv").config()


const config = {
    dbName: "e_mart",
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL, config).then((res) => {
        console.log('MongoDB connected')
    }).catch(err => {
        console.log(err)
    })
}

module.exports = dbConnect;