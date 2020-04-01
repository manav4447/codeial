const passport =  require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');





//we'll tell passport to use google strategy

passport.use(new googleStrategy({
        clientID: "48340267264-7strf4qa6qb2r31bdah52ktuup6ldsqv.apps.googleusercontent.com",
        clientSecret:"12cEQp9hPEVc9MhhrS-6jJST",
        callbackURL: "http://localhost:1000/users/auth/google/callback"
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


