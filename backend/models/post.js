const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
   title : String,
   body : String,
   device : String,
   no_of_comments : Number,
   userId:String
})

const Post = mongoose.model('Post',postSchema);

module.exports = Post;

// ==> Where device is the one from which the post has been made, it can be "Laptop", "Tablet", "Mobile"