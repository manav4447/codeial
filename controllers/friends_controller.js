const Users = require("../models/user");
const Friendships = require("../models/friendship");



module.exports.addFriend = async function(req , res){


    let existingFriendship = await Friendships.findOne({
        from_user : request.user.id,
        to_user : request.query.id,
    });

    let user = await User.findById(req.user);
    let deleted = false;

    if(existingFriendship){
        user.friends.pull(existingFriendship._id);
        user.save();
        existingFriendship.remove();
    }else{
        let friendship = await Friendships.create({
            to_user : request.query.id,
            from_user : request.user._id
        });

        user.friends.push(friendship);
        user.save();
        deleted = true;
    }

    if(request.xhr){
        return response.status(200).json({
            deleted : deleted , 
            message : "Request Successful"
        });
    }

    
     return response.redirect("back");
}