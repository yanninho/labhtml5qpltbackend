'use strict';

var express = require('express');
var controller = require('./signalement.controller');
var auth = require('../../config/auth');

var router = express.Router();

router.get('/', controller.show);
router.post('/', controller.create);

module.exports = router;