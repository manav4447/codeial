module.exports.profile = function(req,res){
   // res.end('<h1>user profile</h1>');
   return res.render('user_profile',{
    title: "user_profile"
});
};
/* 
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Sign in | Codeial"
    });
};

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Sign Up| Codeial"
    });
};
 */