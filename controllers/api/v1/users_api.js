const User = require('../../../models/user');

const jwt = require('jsonwebtoken');






module.exports.createSession = async function(req, res){
    try{
        let user =await  findOne({email: req.body.email});
    
        //if we find the user

    if(!user || user.password == req.body.password){
        return res.json(422, {
          message: "invalid username or password"
        });
    }

    //if user is found 
    return res.json(200, {
        message: 'Sign in successful, here is your token, please keep it safe!',
        data:  {
            token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '10000'})
        }
    })


    }catch(err){
        console.log('****', err);
        return res.json(500, {
            message: "internal server error"
        })
    }
}