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
     pass: '@1029487'
 }
});

//template engine
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
  path.join(__dirname, '../views/mailers', relativePath ),
  data,
  function(err, template){
      if(err) {console.log('error in rendering template'); return}
      mailHTML = template;
  }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate : renderTemplate
}