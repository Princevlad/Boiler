var cors      = require('cors');
var express   = require('express');
var app       = express();
var functions = require('../../util/functions');
var passport  = require('passport');




module.exports = function(app,passport){


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


  app.get('/failed', function(req, res){

     message = req.flash('info');

    res.send({status:false, message:message[0]});


  });


   app.get('/success', function(req, res){

     message = req.flash('info');

    res.send({status:true, message:"success"});


  });


 
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});




}
