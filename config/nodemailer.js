const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')




//define our transporter:-. it s an object which will be attached to nodemailer
let transporter = nodemailer.createTransport({
 service: 'gmail', 
 host: 'smtp.gmail.com',
 secure: false,
 auth:{
     user: 'manavjain78310@gmail.com',
     pass: '@1029487Anu'
 },
 //tls: got this from stack overflow as it is showing the error of signed certificates
 tls: {
    rejectUnauthorized: false
}
});

//template engine
let renderTemplate = (data, relativePath) => {
    let mailHTML;  //this is for storing the html which will be sent as part of email
    ejs.renderFile(
  path.join(__dirname, '../views/mailers', relativePath ), //this relativePath is place where the function is being called
  data,  //this data will be comment: comment in new_comment.ejs
  function(err, template){
      if(err) {console.log('error in rendering template' , err); return}
      mailHTML = template;
  }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate : renderTemplate
}