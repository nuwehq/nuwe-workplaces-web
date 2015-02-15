var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Redis Connection
var redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
} else {
	var client = redis.createClient();
	client.select = ((process.env.NODE_ENV || 'development').length);
}



// End redis connection

var router = express.Router();


router.route('/teams')
  .get(function(request, response) {
		client.hkeys('teams', function(error, names){
			if(error) throw error;
			response.json(names);
		});
	})

	.post(urlencode, function(request, response){
		var newTeam = request.body;
		if(!newTeam.name){
			response.sendStatus(400);
			return false;
		}
		client.hset('teams', newTeam.name, newTeam.description, function(error){
			if(error) throw error;
			response.status(201).json(newTeam.name);
		});
	
});

router.route('/teams/:name')
	.delete(function(request, response){
		client.hdel('teams', request.params.name, function(error){
			if(error) throw error;
			response.sendStatus(204);
		});
	})

	.get(function(request, response){
		client.hget('teams', request.params.name, function(error, description){
	    response.render('show.ejs', 
	    	{ team: 
	    		{ name: request.params.name, description: description } 
	    	});
		});
	
});

module.exports = router;