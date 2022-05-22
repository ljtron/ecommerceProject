//imports
const express = require("express");

const app = express()
const port = 8000

app.get("/", (req, res)=>{
    res.send("hi")
})

app.listen(port, ()=>{
    console.log("listening on port: " + port)
})