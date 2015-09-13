'use strict';

var requireHelper = require('../require_helper'), 
config = requireHelper('config/environment'),
User = requireHelper('services/user').User,
should   = require('chai').should(),
mongo = require('mongodb'),
crypt = requireHelper('services/crypt'),
connectdb = null;

describe('user service', function () {
	before(function (done) {
	 	mongo.connect(config.mongo.uri, function(err, db) {
	 		if(err) {
	 			throw err;
	 		}
	 		connectdb = db;
	 		console.log('Connection mongo OK');
	 		done();
	 	});
	 			
	}); 

	it('should valid login, password', function (done) {
		var user = new User(connectdb);
		user.isValid('titi@titi.com', 'qQML3wAstQ', function(err, res) {
			should.not.exist(err);
			res.email.should.equal('titi@titi.com');
			done();
		});	     	   		
	});

	it('should check non exist login', function (done) {
		var user = new User(connectdb);
		user.isValid('bad',crypt.encrypt('bad'), function(err, res) {
			should.not.exist(err);
			should.exist(res);
			res.should.equal(false);
			done();
		});	     	   		
	});
	
	it('should check non valid password', function (done) {
		var user = new User(connectdb);
		user.isValid('titi@titi.com',crypt.encrypt('bad'), function(err, res) {
			should.not.exist(err);
			should.exist(res);
			res.should.equal(false);
			done();
		});	     	   		
	});

	it('should create user', function (done) {
		var user = new User(connectdb);
		var token = user.generateToken();
		var newUser = {
			'email' : 'toto@toto.com',
			'password' : 'toto',
			'token' : token
		}
		user.create(newUser, function(err, res) {
			should.not.exist(err);
			should.exist(res);
			done();
		});	     	   		
	});


	it('should find user by id', function (done) {
		var user = new User(connectdb);
		user.findById('5455f18e806f130183000001', function(err, res) {
			should.not.exist(err);
			// console.log(res.user);
			should.exist(res);
			done();
		});	     	   		
	});

});