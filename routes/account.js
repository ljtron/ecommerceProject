//imports
const express = require("express")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
require('dotenv').config()


const router = express.Router()


router.post("/signup", (req,res)=>{
    console.log(req.body)
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
    }, (error, doc) =>{
        doc.password = ""
        res.json({
            data: doc,
            token: jwt.sign({ user: doc }, process.env.jwtPrivateKey)
        })
    })
})

router.post("/login", (req,res)=>{
    userModel.findOne({"email": req.body.email}, (err,doc) =>{
        if(err){
            console.log(err)
            res.json({
                data: "not correct error"
            })
        }
        else{
            bcrypt.compare(req.body.password, doc.password, function(err, result) {
                
                // res === true
                if(result == true){
                    doc.password = ""
                    res.json({
                        data: doc,
                        token: jwt.sign({ user: doc }, process.env.jwtPrivateKey)
                    })
                }
                else{
                    res.json({
                        data: "not password incorrect"
                    })
                }
            });
        }
    })
})


module.exports = router