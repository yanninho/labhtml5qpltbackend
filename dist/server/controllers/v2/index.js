'use strict';

var express = require('express'),
	router = express.Router();

router.use('/magasins', require('./magasins'));
router.use('/auth', require('./auth'));
router.use('/user', require('./user'));

module.exports = router;