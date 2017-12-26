var LocalStrategy   = require('passport-local').Strategy;
var cors            = require('cors');
var passport        = require('passport');
var functions       = require('../../util/functions');
var User            = require('../../database/models/user.js');


module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


  //============================================= SIGNUP =========================================//

 passport.use('local-signup', new LocalStrategy({

        usernameField : 'Email',
        passwordField : 'Password',
        passReqToCallback : true
    },
   function(req, email, password, done) {

 console.log(req.body);

       User.findOne({ 'Email' :  req.body.Email }, function(err, user) {
         console.log(req.body);

           if (err)
               return done(err);


            if (user==null) {

          User.find().sort({ $natural: -1 }).limit(1).exec(function(err, data){
       
                   if (data) {

                   current_last_id        = parseInt(data.Id);
                   new_Id_digit           = current_last_id + 1;
                   req.body.Id            = functions.genId(new_Id_digit,6);
                   req.body.created_time  = functions.Create();


              User.create(req.body, function(err, user) {
                    console.log(err);
                    if (err) {
                      
                        return done(null, false, req.flash('info', 'Account Already Exist'));

                    } else {
                     
                     console.log("success");

                         var user=req.body;
                    return done(null, user);
                      
                    }
                });

                    }else{
                    
                     req.body.Id = '000001';

                     User.create(req.body, function(err, user) {
                
                    if (err) {
                      
                      console.log('error');

                    } else {
                     
                     console.log("success");

                         var user=req.body;
                    return done(null, user);
                      
                    }
                });

                    }

                });

            } else {

              return done(null, false, req.flash('info', 'Email Already Exist'));

            }

        });

    }));

  //============================================= LOGIN =========================================//

         passport.use('local-login', new LocalStrategy({
       
        usernameField : 'Email',
        passwordField : 'Password',
       passReqToCallback : true 
      },
        function(req, email, password, done) {

    User.findOne({ 'Email' :  req.body.Email }, function(err, user) {
      console.log(req.body);

                if (err)
                    return done(err);

                if(!user)
                    return done(null, false, req.flash('info', 'User dsnt exist.'));
        
                if (user.Password !== req.body.Password)
                    return done(null, false, req.flash('info', 'Wrong password.'));
                return done(null, user);


            });
            }

        ));

};
