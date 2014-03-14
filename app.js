
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var stylus = require("stylus");
var nib = require("nib");
var mongoose = require("mongoose");

var frontControl = require("./controls/frontControl.js");
var schoolControl = require("./controls/schoolControl.js")


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
app.use(app.router);
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: compile
}))
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost/feedkids");

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', frontControl.index);
app.get("/schoolProfile/:id", frontControl.profile);
app.get("/find", frontControl.find);
app.get("/popStateDropdown", schoolControl.popStateDropdown);
app.get("/popRandomSchools", frontControl.getRandomSchools);
app.get("/search", frontControl.search)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
