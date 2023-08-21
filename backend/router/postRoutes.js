const express = require('express');
const Post = require("../models/post")
const authentication=require("../middleware/authentication")
const User= require("../models/user")
postRouter = express.Router();

// postRouter.use(authentication)
postRouter.post("/add",authentication,async(req,res)=>{
try {
   const post = new Post(req.body);
   await post.save();
   res.status(200).json({success:"post added successfully"});
} catch (error) {
   res.status(500).json({message: error.message});
}
})



postRouter.get("/",authentication,async(req,res)=>{
   try {
      const {sortby,page,limit} = req.body.query;
     const option ={}
      const posts = await Post.find({userId:req.body.userId}).skip(page*limit).limit(limit);
      res.status(200).json(posts);
   } catch (error) {
      res.status(500).json({message: error.message});
   }
   })

   
   postRouter.get("/top",authentication,async(req,res)=>{
   try {
const topPost = await User.find({userId:req.body.userId}).sort({no_of_comments:-1}).limit(3);
      res.status(200).json(topPost);
   } catch (error) {
      res.status(500).json({message: error.message});
   }
   })

   postRouter.patch("/:postId/update",authentication,async(req,res)=>{
      try {
         const updated= await Post.findOneAndUpdate({_id:req.params.postId,userId:req.body.userId})
        if(!updated){
         res.status(404).json({message:"you are not allowed to update"})
        }
         res.status(200).json({success:"post updated successfully"});
      } catch (error) {
         res.status(500).json({message: error.message});
      }
      })
      
      
      
      
      
postRouter.delete("/:postId/delete",authentication,async(req,res)=>{
         try {
const  deleted = await Post.findOneAndDelete({_id:req.params.postId,userId:req.body.userId})
if(!deleted){
   res.status(404).json({message:"you are not allowed to update"})
  }
            res.status(200).json({success:"post deleted successfully"});
         } catch (error) {
            res.status(500).json({message: error.message});
         }
         })
module.exports =postRouter;