'use strict';

var rand = require('generate-key');
var crypt = require('./crypt');

function User(db) {

	var collection = db.collection('users');

	var validPass = function(pass1, pass2) {
		return crypt.encrypt(pass1) === pass2;
	};

	this.create = function(newUser, callback) {
		if (!newUser.email) {
			return callback('Email fields must exists', null);
		}
		if (!newUser.token) {
			return callback('Token fields must exists', null);
		}
		if (newUser.password) {
			newUser.password = crypt.encrypt(newUser.password);
		}

		collection.insert(newUser, function(err, result){
			if (err) {
				return callback(err, null);
			}
			return callback(null, result.ops[0]);
		});			
	};

	this.findByCriteria = function(criteria, callback) {
		collection.findOne(criteria, function(err, user) {
				if (err) {
					return callback(err, null);
				}
				if (!user) {
					return callback(null, false);
				}
				return callback(null, user);		

			});		
	};

	this.findByTokenProvider = function(token, provider, callback) {
		collection.findOne({'token': token, 'provider' : provider }, function(err, user) {
				if (err) {
					return callback(err, null);
				}
				if (!user) {
					return callback(null, false);
				}
				return callback(null, user);		

			});
	};

	this.findByToken = function(token, callback) {
		collection.findOne({'token': token}, function(err, user) {
				if (err) {
					return callback(err, null);
				}
				if (!user) {
					return callback(null, false);
				}
				return callback(null, user);			
			});
	};

	this.findById = function(id, callback) {
		id = require('mongodb').ObjectID(id);
		collection.findOne({_id: id}, function(err, user) {
			if (err) {
				return callback(err, null);
			}
			if (!user) {
				return callback(null, false);
			}			
			return callback(null, user);			
		});
	};

	this.delete = function(key, callback) {
		collection.remove({'email' : key}, function(err, removed) {
			if (err) {
				return callback(err, null);
			}
			return callback(null, removed);
		});
	};

	this.isValid = function(email,password, callback) {
		collection.findOne({'email' : email, 'provider' : 'local'}, function(err, user) {
			if (err) { 
				return callback(err, null); 
			}
	    	if (!user) { 
	    		return callback(null, false); 
	    	}
	    	if (!validPass(password, user.password)) { 
	    		return callback(null, false); 
	    	}
	    	return callback(null, user);			
		});
	};

	this.generateToken = function() {
		return rand.generateKey(20);
	};

}

module.exports.User = User;