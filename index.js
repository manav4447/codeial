// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const env = require('./config/environment');
const logger =require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
// const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');

//jwt for reset password
const jwt = require('jwt-simple');
const passportLocal = require('./config/passport-local-strategy');
//passport jwt strategy
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const async = require("async");
//setup the chat server to be used with sockets.io
const chatServer = require('http').Server(app);
const chatScokets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(1000);
console.log('chat server is listening on port: 1000');

const path = require('path');
//passport jwt strategy

//saas middleware should only be run in development and for that we put a check
if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname , env.asset_path , 'scss'),
        dest: path.join(__dirname, env.asset_path, '/css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
//make the uploads available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
// for rfs and logs
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);//this is for that if we login to the page after some time and 
                                      //    our session time has not been over then it will logs us in

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log( `Server is up and running on port: ${port}`);
 /*  //  console.log('%cHello', 'color: green; background: yellow; font-size: 30px');
    console.log(`'%cServer is up and running', 'color: green; background: yellow; font-size: 30px': ${port}`); */
});


