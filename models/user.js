const mongoose = require('mongoose');

//for uploading files we ll use multer library
 const multer = require("multer");
 const path = require("path"); //path where we store file
 const AVATAR_PATH = path.join('/uploads/users/avatars')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
       
    }
}, {
    timestamps: true
});

//for disk storage of filter: var storage = multer.diskStorage({
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '..', AVATAR_PATH));//this will join the curent directory name + AVATAR_PATH
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
        }
      });

      //statics method
    userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); //only one file can be uploaded
    userSchema.statics.avatarPath = AVATAR_PATH;      
 


const User = mongoose.model('User', userSchema);

module.exports = User;