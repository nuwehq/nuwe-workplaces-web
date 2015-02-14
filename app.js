var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var teams = {
		'Cubicle Gigglers': 'You cannot stop the laughter',
		'Haughty Leaders': 'The head hunchos',
		'Professional Pirates': 'Arrgggggghhhh',
		'Audits Smash': 'Have you filed your paperwork?'
};

app.get('/', function(request, response) {
  response.send('OK');
});

app.get('/teams', function(request, response) {
	response.json(Object.keys(teams));
});

app.post('/teams', urlencode, function(request, response){
	var newTeam = request.body;
	teams[newTeam.name] = newTeam.description;
	response.status(201).json(newTeam.name);
});

module.exports = app;