const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema (
    {
        //the user which will sent the request
        from_User:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'user'
        },
        //user which recieves the request
        
        to_User:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    }
},{
    timestamps : true
}
);