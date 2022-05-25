
const mongoose = require("mongoose")
const {Schema} = mongoose

const userModel = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model("Users", userModel)

