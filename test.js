var request = require('supertest');
var app = require('./app');

describe('requests to the root path', function() {

  it('returns a 200 status code', function(done) {
  	
    request(app)
      .get('/')
      .expect(200, done);

  });

  it('returns an html format', function(done){

  	request(app)
  	  .get('/')
  	  .expect('Content-Type', /html/, done);

  });

  it('returns an index file with teams', function(done) {
  	request(app)
  	  .get('/')
  	  .expect(/teams/i, done);

  });

});

describe('Listing Teams on /teams', function() {
	
	it('Returns 200 status code', function(done) {
		request(app)
		  .get('/teams')
		  .expect(200, done);
		  
	});

	it('Returns JSON format', function(done) {
		request(app)
		  .get('/teams')
		  .expect('Content-Type', /json/, done);
		  
	});

	it('Returns initial teams', function(done) {
		request(app)
		  .get('/teams')
		  .expect(JSON.stringify(['Cubicle Gigglers', 'Haughty Leaders', 'Professional Pirates', 'Audits Smash']), done);
	});
});

describe('Creating new Teams', function(){

	it('Returns a 201 status code', function(done){

		request(app)
		  .post('/teams')
		  .send('name=Wired+Technokrats&description=the+techie+dudes')
		  .expect(201, done);
	});

	it('Returns the Team name', function(done){

		request(app)
		  .post('/teams')
		  .send('name=Wired+Technokrats&description=the+techie+dudes')
		  .expect(/Wired Technokrats/i, done);

	});

});
