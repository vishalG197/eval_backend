const express = require('express');
const User = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
try {
   const {email,password}=req.body;
   
   const user= await User.findOne({email});
  console.log(user);
   if(user){
      res.status(200).json({message:"User already exist, please login"})
   }
   const hash =await bcrypt.hash(password,10);
   // req.body.password = hash;
   const newuser = new User({...req.body,password:hash});
   await newuser.save();
   res.status(200).json({msg:"user successfully registered"});
} catch (error) {
   res.status(500).json({message: error.message});
}
})



userRouter.post("/login",async(req,res)=>{
   try {
      const {email,password} = req.body;
      const user=await User.findOne({email});
 
   if(!user){
      res.status(200).json({message:"User is not registered, please register first"})
   }
   const checkpass =await bcrypt.compare(password,user.password);
   // console.log(checkpass)
   if(!checkpass){
      res.status(400).json({message:"Password should match,please try again"})
   }
   const token = jwt.sign({userId:user._id,email:email},"eval");
   if(token){
      res.status(200).json({masseage:"user login successful",token});
   }
   } catch (error) {
      res.status(500).json({message: error.message});
   }
   })

   

module.exports =userRouter;