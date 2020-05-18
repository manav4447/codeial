const nodemailer = require('../config/nodemailer')



//this is comment mailer means whenever  a new comment is made It is 
//called and it is called in comments controller.js 


//newComment = function()
//it is similar like getting module.exports = newComment()

//this is amother way of exporting a method
exports.newPost = (post) => {

let htmlString = nodemailer.renderTemplate({post: post },'/posts/new_posts.ejs' )

    console.log('inside newPost mailer');
    nodemailer.transporter.sendMail({   //this is a predefined function
        from: 'manavjain@gmail.com',
        to:post.user.email,//in czse for comments it is comment.post.user.email //hey i think this line has some mistake
        subject: "New Post  published",
        html: htmlString /* '<h1>Yup, your comment is publised!</h1>' */ //instead of this we'll pass the htmlString which is deined above
    }, (err, info)  => {
      if(err){
          console.log('error in sending mail', err);
          return;
      }
     // console.log('Message sent', info);
      return;
    
    });
}