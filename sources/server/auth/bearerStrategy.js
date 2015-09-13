'use strict';

var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../../services/user').User;

module.exports = function(config) {

	config.passport.use(new BearerStrategy(
	  function(token, done) {
	  	function find() {
	  		var user = new User(config.db);
	  	    user.findByToken(token, function(err, userFind) {
	  	    	if (err) {
	  	    		return done(err, null);
	  	    	}
	  	    	if (!userFind) {
	  	    		return done(err, false);
	  	    	}
	  	    	return done(null, userFind);
	  	    }); 
	  	}
	    process.nextTick(find);	
	}));

};

