// Ukeme Is a Boy and a bad dick



var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    Id           : String,
    first_name    : {type: String},
    last_name     : {type: String},
    Email        : {type:String, unique:true, required:true},
    Password     : {type: String, required:true},
    Phone        : {type: String, unique:true},
    created_time : String,
    status       : {type:Number, default: 1}
});



module.exports = mongoose.model('User', userSchema);