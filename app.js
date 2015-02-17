var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var path = require('path');
var config = require('./oauth.js');
var passport = require('passport');
var NuweStrategy = require('passport-nuwe').Strategy;
var GithubStrategy = require('passport-github').Strategy;

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

// config
passport.use(new NuweStrategy({
 clientID: config.nuwe.clientID,
 clientSecret: config.nuwe.clientSecret,
 callbackURL: config.nuwe.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

passport.use(new GithubStrategy({
 clientID: config.github.clientID,
 clientSecret: config.github.clientSecret,
 callbackURL: config.github.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

// global config
var app = express();
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	// app.use(express.logger());
	// app.use(express.cookieParser());
	// app.use(express.bodyParser());
	// app.use(express.methodOverride());
	// app.use(express.session({ secret: 'my_precious' }));
	app.use(passport.initialize());
	app.use(passport.session());
	// app.use(app.router);
	app.use(express.static(__dirname + '/public'));

// app.use(express.static('public'));

// Redis Connection
var redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
} else {
	var client = redis.createClient();
	client.select = ((process.env.NODE_ENV || 'development').length);
	client.flushdb();
}


// End redis connection
app.get('/', function(req, res){
	res.render('index', { user: req.user });
	res.sendStatus(200);
});

app.get('/teams', function(request, response) {
	client.hkeys('teams', function(error, names){
		if(error) throw error;
		response.render('teams', { teams: names});
	});
});

app.post('/teams', urlencode, function(request, response){
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

app.delete('/teams/:name', function(request, response){
		client.hdel('teams', request.params.name, function(error){
			if(error) throw error;
			response.sendStatus(204);
		});

});

app.get('/teams/:name', function(request, response){
	client.hget('teams', request.params.name, function(error, description){
    response.render('show.ejs', 
    	{ team: 
    		{ name: request.params.name, description: description } 
    	});
	});
});


// routes
// app.get('/', routes.index);
// // app.get('/ping', routes.ping);
// app.get('/teams', function(req, res){
// res.render('teams', { user: req.user });
// });



app.get('/auth/nuwe',
passport.authenticate('nuwe'),
function(req, res){
});
app.get('/auth/nuwe/callback',
passport.authenticate('nuwe', { failureRedirect: '/' }),
function(req, res) {
 client.hkeys('teams', function(error, names){
		if(error) throw error;
		console.log(req.user.id);
		res.render('teams', { teams: names, user: req.user.displayName });
	});
});

app.get('/auth/github',
passport.authenticate('github'),
function(req, res){
});
app.get('/auth/github/callback',
passport.authenticate('github', { failureRedirect: '/' }),
function(req, res) {
 res.redirect('/teams');
});


app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// test authentication
function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}

module.exports = app;





