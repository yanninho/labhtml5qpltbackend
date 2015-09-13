'use strict';

var express = require('express'),
	router = express.Router();


	router.get('/', function(req, res) {
		req.config.passport.authenticate('facebook')(req,res);
	});

	router.get('/callback', function(req, res, next) {
		req.config.passport.authenticate('facebook', 
		function(err, user) {
	        if(err) {
	            return next(err);
	        }
	        if(!user) {
	            return res.redirect(req.headers.referer);
	        }
	      // Successful authentication, redirect home.
   	      res.redirect(302, req.headers.referer+ '?token=' + user.token);  
		})(req,res);
	});

module.exports = router;
