const nodemailer = require('nodemailer');

const User = require('../models/user')
const env = require('../config/environment');
const crypto = require('crypto');
// const nodemailer = require('../config/nodemailer');
// const async = require(async);
var async = require("async");
module.exports.forget = function(req, res){

   
    return res.render('forgot_password', {
        title: "Codeial | Forgot-password"
    })
}
module.exports.resetLink =  function(req,res,next){
   async.waterfall([
       function(done){
           crypto.randomBytes(20, function(err, buf){
               var token = buf.toString('hex');
               done(err, token );
           })
       },
       function(token , done){
           User.findOne({email:req.body.email}, function(err,user){
             if(!user){
                 req.flash('error', 'No account with that email address');
                 return res.redirect('/forgot');
             }
             user.resetPasswordToken = token;
             user.resetPasswordExpires = Date.now()+3600000;//one hour expiry time 

             user.save(function(err){  //here we save the function
                 done(err, token,user);
             });
           });
       },
       function(token,user,done){
        let transporter = nodemailer.createTransport(env.smtp);
        let mailOptions = {
            to: user.email,
            from:'manavjain78310@gmail.com',
            subject: 'password reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n' 
        };
     transporter.sendMail(mailOptions, function(err){
            console.log('mail sent');
            req.flash('success', 'an email has been sent to '+user.email +' with further instructions');
            done(err, 'done');
        })
       }

   ],
    function(err){
        if(err)
            return next(err);
            res.redirect('/forgot');
        });
    };












   