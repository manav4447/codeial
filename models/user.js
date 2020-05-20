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
       
    },
     resetPasswordToken: String,//these are for reset password_controller.k=js look into that
     resetPasswordExpires: Date,
     setPassword: String,
    friendships : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friendship'
    }]
}, {
    timestamps: true
});

//for disk storage of filter: var storage = multer.diskStorage({
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '..', AVATAR_PATH));//this will join the curent directory name + AVATAR_PATH
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())//this file.field name will give us the: 
          //name as "avatar + date" as a file name
        }
      });

      //statics method//
      //static method like when we want to count the whole population of ak=ll planets w;''ll nnot call the function on each planet 
      //instead we call a static function as a one on alll planets
    userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); //only one file can be uploaded
    userSchema.statics.avatarPath = AVATAR_PATH;      
 


const User = mongoose.model('User', userSchema);

module.exports = User;







/*  var UserSchema = new mongoose.Schema({
        username:   { type: String, required: true, unique: true },
        password:  String,
        datapoint:  String,
        email:  { type: String, required: true, unique: true },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    });
    
    
    UserSchema.pre('save', function(next) {
      var user = this;
      var SALT_FACTOR = 5;
    
      if (!user.isModified('password')) return next();
    
      bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);
    
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
        });
      });
    });
    
    
    her's your code have alook
    
    
    https://stackoverflow.com/questions/42682923/password-reset-in-nodejs
    https://stackoverflow.com/questions/42682923/password-reset-in-nodejs */