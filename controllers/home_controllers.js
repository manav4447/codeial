module.exports.home = function(req,res){
   // console.log('req.cookies');
   //return res.end('<h1>controller loaded</h1>');
      return res.render('home',{
          title: "home"
      });
};