const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){


    let posts = await Post.find({})
    /* .sort('-createdAt') */ //this will list post in chronological order
    .populate('user')
    .populate({
        path: 'comments',//populating the user of comments  
        populate: {
            path: 'user'
        }
    });

    return res.json(200, {
        message: "Lists of posts",
        posts: posts
        
    })
}
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

         if (post.user == req.user.id){ 
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.json(200, {
                message: "posts and associated comment deleted successfully"
            });
        
      }else{
          return res.json(401, {
              message: "you cannot delete the post!"
          });
      };
    
    }catch(err){
        console.log('****', err);
        return res.json(500, {
            message: "internal server error"
        })
    }
    
}