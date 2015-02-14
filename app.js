var express = require('express'),
	app = express(),
	sass = require('node-sass'),
	path = require('path');

var sassMiddleware = require('node-sass-middleware');
app.use(
     sassMiddleware({
         src: __dirname + '/sass', 
         dest: __dirname + '/public',
         debug: true,       
     })
  );  

app.use(express.static('public'));

var teams = require('./routes/teams');
app.use('/teams', teams);

module.exports = app;





