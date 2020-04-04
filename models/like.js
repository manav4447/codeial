const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },
Likeable:{
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: 'onModel'
   },
   onModel: {
     type: String,
     required: true,
     enum: ['Post', 'Comment']
   }
},
   {
       timseStamps: true,
   }
)
   const Like = mongoose.model('Like', likeSchema);
   moduel.exports = Like; 



