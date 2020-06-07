// const mongoose = require('mongoose');

// //for uploading files we ll use multer library
//  const multer = require("multer");
//  const path = require("path"); //path where we store file
//  const AVATAR_PATH = path.join('/uploads/users/avatars')
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     avatar: {
//         type: String,
       
//     },
//     friends :[
//       {
//          type : mongoose.Schema.Types.ObjectId,
//          ref: 'Friendships'
//       }],{
//     resetPasswordToken: String,//these are for reset password_controller.k=js look into that
//      resetPasswordExpires: Date,
//      setPassword: String},
//     {
//     timestamps: true
//     }),
//   }
// //for disk storage of filter: var storage = multer.diskStorage({
//     let storage = multer.diskStorage({
    
//       destination: function (req, file, cb) {
//           cb(null, path.join(__dirname, '..', AVATAR_PATH));//this will join the curent directory name + AVATAR_PATH
//         },
//         filename: function (req, file, cb) {
//           cb(null, file.fieldname + '-' + Date.now())//this file.field name will give us the: 
//           //name as "avatar + date" as a file name
//         }
//       });

//       //statics method//
//       //static method like when we want to count the whole population of ak=ll planets w;''ll nnot call the function on each planet 
//       //instead we call a static function as a one on alll planets
//     userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); //only one file can be uploaded
//     userSchema.statics.avatarPath = AVATAR_PATH;      
 


// const User = mongoose.model('User', userSchema);

// module.exports = User;







const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVTAR_PATH = path.join("/uploads/users/avtars");

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    } , 
    password : {
        type:String,
        required:true,
    } , 
    name : {
        type:String,
        required:true
    },
    avtar : {
        type : String
    },
    friends : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Friendships"
        }
    ]
} ,
{
      resetPasswordToken: String,//these are for reset password_controller.k=js look into that
       resetPasswordExpires: Date,
       setPassword: String},

      {
          timestamps : true
      });

//configuring multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , AVTAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  userSchema.statics.uploadedAvtar = multer({ storage: storage }).single("avtar");
  userSchema.statics.avtarPath = AVTAR_PATH;
  
const User = mongoose.model("User" , userSchema);

module.exports = User;