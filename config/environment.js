const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
     asset_path: './assets',
    // asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {   //this is from nodemailer
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'manavjain78310@gmail.com',
            pass: 'Nielit@2016'
        }
    },
    google_client_id: "48340267264-7strf4qa6qb2r31bdah52ktuup6ldsqv.apps.googleusercontent.com",
    google_client_secret: "12cEQp9hPEVc9MhhrS-6jJST",
    google_call_back_url: "http://codeial.com/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}
const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

// module.exports = production


// module.exports = development;
module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
