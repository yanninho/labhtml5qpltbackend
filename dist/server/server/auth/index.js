'use strict';
var bodyParser = require('body-parser');


module.exports = function(app, config) {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))

	app.use(config.passport.initialize());

	require('./localStrategy')(config);
	require('./googleOauthStrategy')(config);
	require('./facebookStrategy')(config);
	require('./bearerStrategy')(config);

};