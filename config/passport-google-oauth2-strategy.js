const passport =  require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');




//we'll tell passport to use google strategy

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
     },

        function(accesToken, refreshToken, profile, done){
         
         //find a user
            User.findOne({email: profile.emails[0].value}).exec(function(err,user){
              if(err){console.log('error in the google strategy', err); return;}
          
            console.log(profile);
            if(user){
                //if user found set it as req.user 
                //which means sign in the user
                return done(null, user);
            }else{
                //create the user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){console.log('error in creating user', err); return;}
                
                    return done(null,user);
                
                });
            }
            });
            }
));
module.exports = passport


