'use strict';

var passport = require('passport');

exports.sendAuthenticate = function (req, res, next) {
  console.log('sendAuthenticate');
  passport.authenticate('google', { scope : ['profile', 'email'] })(req, res, next);
}

exports.backFromGoogle = function (req, res, next) {
  console.log('backFromGoogle');
  passport.authenticate('google')(req, res, next);
}
