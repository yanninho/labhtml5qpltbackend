/**
 * Database configuration
 */
 'use strict';

 var mongo = require('mongodb');

 module.exports = function(config, callback) {
 	mongo.connect(config.mongo.uri, function(err, db) {
		if(err) {
			throw err;
		}
		config.db = db;
		console.log('Connection mongo OK'); 	
 	});		
 };