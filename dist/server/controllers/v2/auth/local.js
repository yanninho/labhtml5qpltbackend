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
            return res.status(404).send('user not found');
        }
      res.json(user);            
    })(req,res); 
  }); 

module.exports = router;