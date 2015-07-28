'use strict';

var express = require('express');
var controller = require('./signalement.controller');

var auth = require('../../../config/auth');

var router = express.Router();

router.get('/', auth.ensureAuthenticated, controller.show);
router.post('/', auth.ensureAuthenticated, controller.create);

module.exports = router;