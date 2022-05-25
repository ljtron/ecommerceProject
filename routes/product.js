
const express = require("express")
const productModel = require("../models/productModel")
const verifyToken = require("./verifyToken")


const router = express.Router()

router.use("/", (req,res,next) =>{
    if(req.headers.token == undefined){
        res.json({
            error: "need a token"
        })
    }
    else{
        if(verifyToken(req.headers.token) == false){
            res.json({
                error: "token invalid"
            })
        }
        else{
            req.userInfo = verifyToken(req.headers.token).user
            next()
        }
    }
    
})

router.post("/create", (req, res)=>{
    productModel.create({
        name: req.body.name,
        owner: req.userInfo._id,
        description: req.body.description,
        publishedDate: Date.now()
    }, (error, doc) =>{
        if(error){
            res.json({
                error: "error"
            })
        }
        else{
            res.json({
                data:doc
            })
        }
    })
    //res.json("data")
})

module.exports = router