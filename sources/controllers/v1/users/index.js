'use strict';

var express = require('express');
var usercontroller = require('./users');
var sessioncontroller = require('./session');
// var googlecontroller = require('./google');

var auth = require('../../../config/auth');

var router = express.Router();

  // User Routes
  router.post('/users', usercontroller.create);
  router.get('/users/:userId', usercontroller.show);

  // Check if username is available
  // todo: probably should be a query on users
  router.get('/check_username/:username', usercontroller.exists);

  // Session Routes
  router.get('/session', auth.ensureAuthenticated, sessioncontroller.session);
  router.post('/session', sessioncontroller.login);
  router.delete('/session', sessioncontroller.logout);

  // google auth
  // router.get('/google', googlecontroller.sendAuthenticate);
  // router.get('/google/callback', googlecontroller.backFromGoogle);


module.exports = router;
