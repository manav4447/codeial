const mongoose = require('mongoose');
 const postSchema = new mongoose.Schema({
     content:{
         type: String,
         required: true
     },
     user:{
         type: mongoose.Schema.Types.ObjectId , //this is a reference for which user the post has generated
         ref: 'User',  //refer to which user schema : User
     },
 
     //include the array of ids of all comments in this post schema itself
     //or we can say that we have created the array of comments in posts schema
     comments: [
         {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Comment'  
         }
     ]
    },{
        timestamps: true
    });

    //before expporting to db wr're going to tell it is a model
    const Post = mongoose.model('Post', postSchema);//name of a model following a schema
    module.exports = Post;