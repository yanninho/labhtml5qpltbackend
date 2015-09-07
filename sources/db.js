/**
 * Database configuration
 */
'use strict';

var mongoose = require('mongoose');
var mongo = require('mongodb');

module.exports = function(app, config) {
	var connectionDb; 
	mongo.connect(config.mongo.uri, function(err, db) {
		if(err) throw err;
		connectionDb = db;
		console.log('Connection mongo OK');
	});		

	app.use(function(req,res,next){
		if (connectionDb === undefined) {
			res.status(500).send({reason: 'Technical error : Connection mongoDB KO'});
		}
		req.db = connectionDb;	
		next();    
	});

	mongoose.connect(config.mongo.uri, config.mongo.options);
	var connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'connection MongoDB error:'));
	connection.once('open', function callback () {
		console.log('Connection mongoose OK');
	});	

};