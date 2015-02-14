var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// Redis Connection
var redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
} else {
	var client = redis.createClient();
}

client.select = ((process.env.NODE_ENV || 'development').length);
// End redis connection

app.get('/', function(request, response) {
  response.send('OK');
});

app.get('/teams', function(request, response) {
	client.hkeys('teams', function(error, names){
		response.json(names);
	});
});

app.post('/teams', urlencode, function(request, response){
	var newTeam = request.body;
	client.hset('teams', newTeam.name, newTeam.description, function(error){
		if(error) throw error;
		response.status(201).json(newTeam.name);
	});
	
});

module.exports = app;