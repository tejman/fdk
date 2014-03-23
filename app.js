
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var stylus = require("stylus");
var nib = require("nib");
var mongoose = require("mongoose");
var passport = require('passport');
var passportConfig = require('./config/passport');
var stripe = require('stripe');
var aws = require('aws-sdk');


var frontControl = require("./controls/frontControl.js");
var schoolControl = require("./controls/schoolControl.js");
var searchControl = require("./controls/searchControl.js");
var authControl = require('./controls/authControl.js');
var userControl = require('./controls/userControl.js');
var stripeControl = require('./controls/stripeControl.js');


var app = express();

// all environments
var compile = function(str, path){
  return stylus(str)
    .set('filename', path)
    .set("compress", false)
    .use(nib())
    .import("nib");
}


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());  //for file upload

app.use(express.cookieParser());
app.use(express.session({secret: 'super secret string'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: compile
}))
app.use(express.static(path.join(__dirname, 'public')));

if (global.process.env.MONGOHQ_URL) {
  mongoose.connect(global.process.env.MONGOHQ_URL);
} else {
  mongoose.connect('mongodb://localhost/feedkids');
}


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', frontControl.index);
app.get("/schoolProfile/:id", frontControl.profile);
app.get("/find", frontControl.find);
app.get("/popStateDropdown", schoolControl.popStateDropdown);
app.get("/popRandomSchools", searchControl.getRandomSchools);
app.get("/search", searchControl.search);
app.get("/browsestate", searchControl.browseState);


app.get('/login', authControl.login);
app.get('/logout', authControl.logout);

app.get('/admin', authControl.ensureAuthenticated, userControl.profile)
app.post("/schoolAdmin/:id", userControl.update)

app.get("/schoolAdmin/:id", userControl.profile)

app.get('/auth/google', passport.authenticate('google', {scope: ["profile", "email"]}));
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  authControl.loginSuccess
);

app.get("/checkout", stripeControl.checkoutForm)
app.post("/checkout", stripeControl.checkoutSuccess)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
