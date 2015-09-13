'use strict';

var express = require('express'),
	router = express.Router();

var happyRestMongo = require('happyrestmongodb');

router.get('/', function(req, res, next) {
	req.config.passport.authenticate('bearer', { session: false })(req, res, next);
});

happyRestMongo.findMongo(router, '/', 'magasin', 200, 'magasins');

module.exports = router;
