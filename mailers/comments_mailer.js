const nodemailer = require('../config/nodemailer')



//this is comment mailer means whenever  a new comment is made It is 
//called and it is called in comments controller.js 


//this is amother way of exporting a method
exports.newComment = (comment) => {

let htmlString = nodemailer.renderTemplate({comment: comment },'/comments/new_comment.ejs' )

    console.log('inside newComment mailer');
    nodemailer.transporter.sendMail({   //this is a predefined function
        from: 'manavjain@gmail.com',
        to: comment.user.email,
        subject: "New comment published",
        html: htmlString /* '<h1>Yup, your comment is publised!</h1>' */ //instead of this we'll pass the htmlString which is deined above
    }, (err, info)  => {
      if(err){
          console.log('error in sending mail', err);
          return;
      }
      console.log('Message sent', info);
      return;
    
    });
}