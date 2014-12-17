'use strict';

var express = require('express');
var controller = require('./commentaire.controller');

var auth = require('../../config/auth');

var router = express.Router();

router.get('/', auth.ensureAuthenticated, controller.show);
router.post('/', controller.create);

module.exports = router;