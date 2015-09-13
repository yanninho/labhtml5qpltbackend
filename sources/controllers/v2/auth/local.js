'use strict';

var express = require('express'),
  router = express.Router();

  router.post('/login', function(req, res, next) {

    req.config.passport.authenticate('local',
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