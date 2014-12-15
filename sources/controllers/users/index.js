'use strict';

var express = require('express');
var usercontroller = require('./user.controller');
var sessioncontroller = require('./session.controller');

var auth = require('../../config/auth');

var router = express.Router();

router.post('/users', usercontroller.create);
router.get('/users/:userId', usercontroller.show);
router.get('/check_username/:username', usercontroller.exists);

router.get('/session', auth.ensureAuthenticated, sessioncontroller.session);
router.post('/session', sessioncontroller.login);
router.delete('/session', sessioncontroller.logout);

module.exports = router;