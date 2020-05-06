const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
likeable:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'//dynamic reference
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
// console.log(mongoose.Schema);
   const Like = mongoose.model('Like', likeSchema);
   module.exports = Like; 



