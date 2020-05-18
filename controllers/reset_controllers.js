module.exports.resetPassword = function(req,res){
    User.findOne({resetPasswordToken: req.params.token, resetPassword})
}