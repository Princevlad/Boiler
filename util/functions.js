var nodemailer      = require('nodemailer');
var smtpTransport   = require('nodemailer-smtp-transport');
var hbs             = require('nodemailer-express-handlebars');
var User            = require('../database/models/user.js');
var request         = require('request');


var options = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'view/email/',
        defaultLayout : 'main',
        partialsDir : 'view'
    },
    viewPath: 'view',
    extName: '.hbs'
};



var Create = function(){

var day =  new Date().getDate();
var year = new Date().getFullYear();
var month = new Date().getMonth();

var newdate = day+'-'+month+'-'+year;

return newdate;
};

var later = function(month){

var day =  new Date().getDate();

if (month + new Date().getMonth() > 11) {

var yholder = new Date().getFullYear();
var mholder = new Date().getMonth() + month;

var year =  yholder + 1;
var month = mholder - 12;

var newdate = day+'-'+month+'-'+year;

return newdate;

}else{

  var year = new Date().getFullYear();
var month = new Date().getMonth() + month;

var newdate = day+'-'+month+'-'+year;

return newdate;


}

};



var Email = function(email, body, subject, template) {
     User.findOne({'email':email}, function(err, data){

    var transporter = nodemailer.createTransport(smtpTransport({
       service: 'Mailjet',
       auth: {
            user: '',
           pass: ''
       }
    }));

    transporter.use('compile', hbs(options));

      var mailOptions = {
          from      : 'Sender <>',
          to        :  email,
          subject   : subject,
          template  : template,
          context  : {obj : body}
      };
     transporter.sendMail(mailOptions, function(error, info){
          if(error){
            console.log(error);
          }else{
             console.log('Message sent: ' + info.response);
          }
      });
 });
};



 var zeropad = function (num, places) {
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
        }




module.exports = {
  Email     :Email,
  genId     :zeropad,
  Create    :Create,
  later     :later
};
