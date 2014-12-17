/**
 * Database configuration
 */
'use strict';

var mongoose = require('mongoose');

module.exports = function(config) {

	mongoose.connect(config.mongo.uri, config.mongo.options);
	var connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'connection MongoDB error:'));
	connection.once('open', function callback () {
	  console.log('Connection mongoDB OK');
	});	

};