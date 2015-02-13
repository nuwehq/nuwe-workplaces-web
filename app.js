var express = require('express');
var app = express();


app.use(express.static('public'));

app.get('/', function(request, response) {
  response.send('OK');
});

app.get('/teams', function(request, response) {
	var teams = ['Cubicle Gigglers', 'Haughty Leaders', 'Professional Pirates', 'Audits Smash'];
	response.json(teams);
});

module.exports = app;