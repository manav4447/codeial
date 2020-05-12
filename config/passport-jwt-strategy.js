const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; //this is for extracting  from the header token
//whenever  we require user to authenticate we need User model
const env = require('./environment');
const User = require('../models/user');


//let key for encryption
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}


passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err,user){//here find the user id which is present in payload id
        if(err) {console,log('Error in fInding user from JWT'); return;}

        if(user){
            return done(null,user);

        }else{
            return done(null,false)
        }
    })
}))

module.exports = passport;