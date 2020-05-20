const User = require('../models/user')
const env = require('../config/environment');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var async = require("async");
module.exports.resetPassword = function(req,res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        console.log(err);
        return res.redirect('/forgot');
      }
      res.render('reset-password', {token: req.params.token,
                     title:"Codeial"});
    //   console.log(token)
    });
  };
  
  module.exports.resetPassword2 =  function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if(
              req.body.password === req.body.confirm_password) {
            user.password = req.body.password
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            
          } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
    //   function(user, done) {
    //     var smtpTransport = nodemailer.createTransport({
    //       service: 'Gmail', 
    //       auth: {
    //         user: 'learntocodeinfo@gmail.com',
    //         pass: process.env.GMAILPW
    //       }
    //     });
    //     var mailOptions = {
    //       to: user.email,
    //       from: 'learntocodeinfo@mail.com',
    //       subject: 'Your password has been changed',
    //       text: 'Hello,\n\n' +
    //         'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    //     };
    //     smtpTransport.sendMail(mailOptions, function(err) {
    //       req.flash('success', 'Success! Your password has been changed.');
    //       done(err);
    //     });
    //   }
    ], function(err) {
      res.redirect('/');
    });
  };