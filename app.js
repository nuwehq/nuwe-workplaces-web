var express = require('express'),
	app = express();



app.use(express.static('public'));

var teams = require('./routes/teams');
app.use('/teams', teams);

module.exports = app;





