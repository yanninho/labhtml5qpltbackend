'use strict';

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../services/user').User;

module.exports = function(config) {

	config.passport.use(new FacebookStrategy(config.auth.facebook,
	  function(accessToken, refreshToken, profile, done) {
	  	function findOrCreate() {
	  		var user = new User(config.db);
		    user.findByTokenProvider(accessToken, 'facebook', function(err, resultFind) {
		    	if (err) {
		    		done(err, null);
		    	}
		    	if (!resultFind) {
		    		var newUser = {
		    			'userName' : profile.username,
		    			'displayName' : profile.displayName,
			        	'lastName' : profile.name.familyName,
			        	'firstName' : profile.name.givenName,
			        	'middleName' : profile.name.mddleName,
			            'token' : accessToken,
			            'provider' : 'facebook',
			            'email' : 'N/A'		    			
		    		};
		    		user.create(newUser, function(err, resultCreate) {
		    			if (err) {
		    				done(err, null);
		    			}
		    			done(null, resultCreate);
		    		});
		    	}
		    	else {
		    		done(null,resultFind);
		    	}		    	
		    });	
	  	}
	  	process.nextTick(findOrCreate);			
	  }
	));

};

