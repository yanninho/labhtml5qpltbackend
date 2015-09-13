'use strict';

var express = require('express'),
	router = express.Router(),
	findByToken = require('./findByToken'),
	create = require('./create');

router.use('/:token', findByToken.execute);
router.put('/', create.execute);


module.exports = router;