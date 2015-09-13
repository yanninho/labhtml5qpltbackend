'use strict';

var express = require('express'),
  router = express.Router();

  router.get('/', function(req, res) {
      req.config.passport.authenticate('google', {scope: ['profile', 'email']})(req, res);
  });

  router.get('/callback', function(req, res, next) {

    req.config.passport.authenticate('google',
    function(err, user) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect(req.headers.referer);
        }
      res.redirect(302, req.headers.referer+ '?token=' + user.token);            
    })(req,res); 
  }); 

module.exports = router;
