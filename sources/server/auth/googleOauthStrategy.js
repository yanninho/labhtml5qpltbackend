'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../services/user').User;

module.exports = function(config) {

	config.passport.use(new GoogleStrategy({
	    clientID: '34833949027-4ti272fqs4l0ao6ra8c7crumr8el9uch.apps.googleusercontent.com',
	    clientSecret: 'XETmKtcLKIeUGClzlofx57k2',
	    callbackURL: 'http://127.0.0.1:9000/v2/auth/google/callback'
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	function findOrCreate() {
		  	var user = new User(config.db);
		    user.findByTokenProvider(accessToken, 'google', function(err, resultFind) {
		    	if (err) {
		    		done(err, null);
		    	}
		    	if (!resultFind) {
		    		var email = function() {
		    			if (profile.emails.length > 0) {
		    				return profile.emails[0].value;
		    			}
		    			return null;
		    		};
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
		    		user.createUser(newUser, function(err, resultCreate) {
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

