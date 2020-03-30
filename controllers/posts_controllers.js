const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
       let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
          /*   Post.find({})
             .populate(user) */
        });

        //check for ajax request
        if(req.xhr){
            
            return res.status(200).json({
                data:{  //json has data
                    post: post
                    //this post is the post which is created above
                },
                message : "post-created!"
            });
        }
        req.flash('success', 'Post published')
        return res.redirect('back');

    }catch(err){
        console.log('Error', err);
        return;
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "post deleted "
                });
            }
            req.flash('success', 'post and associated comments deleted')
            return res.redirect('back');
        }else{

            res.flash('error' , 'error in deleting post');
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error', err);
        return;
    }
    
}