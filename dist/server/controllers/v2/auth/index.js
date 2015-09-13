'use strict';

var express = require('express'),
	router = express.Router();

router.use('/google', require('./google'));
router.use('/facebook', require('./facebook'));
router.use('/local', require('./local'));

module.exports = router;