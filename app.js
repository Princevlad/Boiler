
var express  = require('express');
var app      = express();
var passport = require('passport');
var mongoose = require('mongoose');
var configDB = require('./database/config/database.js');
var autoIncrement = require('mongoose-auto-increment');
var port     = process.env.PORT || 3000;


dfgfdjkgfd
//  DB Connection =============================================================

var connection = mongoose.connect(configDB.staging, function(err) {
    if (err) {
        console.log('database connection error', err);
    } else {
        console.log('database connection successful');
    }
});

autoIncrement.initialize(connection);


// Config  =====================================================================

require('./config')(app);

// Auth   ======================================================================

require('./apps/Authentication/AuthConfig')(passport);
require('./apps/Authentication/Auth')(app,passport);


// Home   ======================================================================

require('./apps/Home/routes')(app,passport);


//  Profile ====================================================================

require('./apps/Profile/Profile')(app);


// launch ======================================================================

app.listen(port);
console.log('listening on localhost:' + port);


