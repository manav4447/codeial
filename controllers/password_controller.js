const User = require('../models/user')
const env = require('../config/environment');

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
            from:'learntocode@gmail.com',
            subject: 'password reset',
            text: 'password reset link is here:', 'http://' + req.heades.host + '/reset/' + token+ '\n\n' +
            'if you did not request his pls ignore this mail' 
        };
     transporter.sensMail(mailOptions, function(err){
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
    });