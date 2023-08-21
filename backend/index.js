const express =require("express");
const cors =require("cors");
const connection = require("./db");
const userRouter = require("./router/userRoutes");
const postRouter = require("./router/postRoutes");
const Blacklist=require("./models/blacklist")
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/posts",postRouter);
app.get("/logout",async(req,res)=>{
   try {
const token= req.headers.authorization.split(" ")[1];
if(token){
   const blacklist =new Blacklist({blacklistToken:token});
   await blacklist.save();
}
      res.status(200).json({message:"logout successfully"});
   } catch (error) {
      res.status(500).json({message: error.message});
   }
   })
app.listen(8080,async()=>{
try {
   await connection;
   console.log("connected to the db and server running on the http://localhost:8080")
} catch (error) {
   console.log(error);
}
})