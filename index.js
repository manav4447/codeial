const express = require('express');
//const cookieParser = require('cookie-parser');
const app = express();
const port = 1000;
const expressLayout = require('express-ejs-layouts');  
const db = require('./config/mongoose.js');  

app.use(express.urlencoded());

//app.use(cookieParser());

app.use(express.static('./assets'));  //this is for accessing static files

//now we'll tell our APP to use it express layout we use it before routes as it will shows the layout of a page before rendering the view
app.use(expressLayout); 

//extract style and scripts from sub pages into the layout
app.set('\layout extractStyles' , true);
app.set('\layout extractScripts' , true);
//set up routes
app.use('/', require('./routes'));

//set up view engine
app.set('view engine' , 'ejs');
app.set('views', './views');  //place to look up for views

app.listen(port, function(err){
 if (err){
     console.log(`error on running the server ${err}`);
 }
 console.log(`Server is up and running on port ${port}`);
});