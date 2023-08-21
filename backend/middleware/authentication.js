const Blacklist = require("../models/blacklist");
const jwt= require("jsonwebtoken");
const User = require("../models/user");
const authentication = async (req,res,next) => {
try {
   const token= req.headers.authorization.split(" ")[1];
   const balcklist = await Blacklist.findOne({blacklistToken:token});
   if(balcklist||!token){
      res.Status(200).json({message:"you need to login"})
   }
const decoded = jwt.verify(token,"eval")
if(!decoded){
   res.Status(200).json({message:"you are not authorized"})
}
req.body.userId=decoded.userId;

next();
} catch (error) {
   res.status(500).json({message:error.message});
}
}
module.exports =authentication;