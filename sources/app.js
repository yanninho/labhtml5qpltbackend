/**
 * Main application
 */

 'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var passport = require('passport');
var config = require('./config/environment');
var app  = express();

config.passport = passport;

// database
require('./db')(config);

app.use(function(req,res,next){
	req.db = config.db;	
	next();    
});

app.listen(config.port, function callback(){
	console.log('Server started on port : ' + config.port);
});

// all configurations
require('./server/headers')(app);
require('./server/auth')(app,config);
require('./server/static')(app,config);
require('./routes')(app, config);

module.exports = app;