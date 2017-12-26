var cors      = require('cors');
var express   = require('express');
var app       = express();
var functions = require('../../util/functions');




module.exports = function(app,passport){


  app.get('/', function(req, res){

    res.send("Kindly read the README.md file and follow the development partern");

  });



app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/success',
  failureRedirect : '/failed',
  failureFlash : true
}));


app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/success',
  failureRedirect : '/failed',
  failureFlash : true
})); 


 
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});




}
