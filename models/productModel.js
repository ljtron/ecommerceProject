
const mongoose = require("mongoose")
const {Schema} = mongoose

const productModel = new Schema({
    name: String,
    owner: String,
    description: String,
    publishedDate: String
})

module.exports = mongoose.model("Product", productModel)