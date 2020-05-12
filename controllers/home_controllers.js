const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');


module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
         .sort('-createdAt')  //this will list post in chronological order
        .populate('user')
        .populate({
            path: 'comments',//populating the user of comments  
            populate: {
                path: 'user'
            },
            populate:{
                path: 'likes'//populating the comments like
            }
        }).populate('likes');//populating the user likes
    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()