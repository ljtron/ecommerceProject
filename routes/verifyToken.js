
//import
const jwt = require("jsonwebtoken")
require('dotenv').config()

module.exports = (token) =>{
    try{
        return jwt.verify(token, process.env.jwtPrivateKey);
    } catch(err){
        return false
    }
}