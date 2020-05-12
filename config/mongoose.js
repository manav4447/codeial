const mongoose =require('mongoose');
const env = require('./environment');
//provide connection to the database
 
mongoose.connect(`mongodb://localhost/${env.db}`, { useNewUrlParser: true });


const db = mongoose.connection;

//when there is an console.error
db.on('error' , console.error.bind(console, "Error connecting to the mongoDB"));
//connection successfull
db.once('open' , function(){
    console.log('Connected to the DATABASE: MongoDB');
}
);

 module.exports = db; 

