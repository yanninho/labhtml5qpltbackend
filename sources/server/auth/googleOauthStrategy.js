'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../services/user').User;

module.exports = function(config) {

	config.passport.use(new GoogleStrategy(config.auth.google,
	  function(accessToken, refreshToken, profile, done) {
	  	function findOrCreate() {
		  	var user = new User(config.db);
    		var email = function() {
    			if (profile.emails.length > 0) {
    				return profile.emails[0].value;
    			}
    			return undefined;
    		};

    		if (email() === undefined) {
    			return done('Error : Email empty', null);
    		}

		    user.findByCriteria({'email' : email(), 'provider' : 'google'}, function(err, resultFind) {
		    	if (err) {
		    		done(err, null);
		    	}
		    	if (!resultFind) {
		    		var photo = function() {
		    			if (profile.photos.length > 0) {
		    				return profile.photos[0].value;
		    			}
		    			return null;
		    		};
		    		var newUser = {
			        	'lastName' : profile.name.familyName,
			        	'firstName' : profile.name.givenName,
			            'email' : email(),
			            'photo' : photo(),
			            'token' : accessToken,
			            'provider' : 'google'
			        };
		    		user.create(newUser, function(err, resultCreate) {
		    			if (err) {
		    				done(err, null);
		    			}
		    			done(null, resultCreate);
		    		});
		    	}
		    	else {
		    		done(null, resultFind);
		    	}
		    	
		    });	  		
	  	}
	  	process.nextTick(findOrCreate);
	  }
	));
};

