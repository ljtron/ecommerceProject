//imports
const express = require("express"); 
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
require('dotenv').config() 


const app = express() // inits express framework
const port = 8000

//middleware
mongoose.connect(process.env.mongoDbDrive); // connection to the mongodb database
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
app.use("/accounts", require("./routes/account"))
app.use("/product", require("./routes/product"))

app.get("/", (req, res)=>{
    res.send("hi")
})

app.listen(port, ()=>{
    console.log("listening on port: " + port)
})