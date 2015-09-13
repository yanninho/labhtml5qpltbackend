'use strict';

var User = require('../../services/user').User;
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, db) {

	var user = new User(db);
	passport.use(new LocalStrategy(
	{ 
		usernameField: 'email', 
		passwordField: 'password',
		passReqToCallback : false,
		session: false
	}, 
    function verify(email, password, done) {
    	user.isValid(email, password, function(err, userFind) {
    		if (err) {
    			return done(err, null);
    		}
    		if (!userFind) {
    			return done(err, false);
    		}
    		return done(null, userFind);
    	});         
    }	
	));

};