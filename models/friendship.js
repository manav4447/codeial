const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema (
    {
        //the user which will sent the request
        from_User:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        //user which recieves the request
        
        to_User:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }
},{
    timestamps : true
}
);
const Friendships = mongoose.model('Friendships', friendSchema );
module.exports = Friendships;