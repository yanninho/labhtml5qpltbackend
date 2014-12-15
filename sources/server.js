/**
 * Server configuration
 */

'use strict';

var express = require('express');
var bodyParser     = require('body-parser');
var cookieParser     = require('cookie-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var passport = require('passport');
var pass = require('./config/pass');
var session    = require('express-session');
var mongoStore = require('connect-mongo')(session);

module.exports = function(app, config) {
		var sessionStore = new mongoStore({ url: config.mongo.uri, collection: 'sessions' });
		var env = app.get('env');
		app.use(cookieParser());
		app.use(bodyParser.json()); 
		app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
		app.use(bodyParser.urlencoded({ extended: true })); 
		app.use(methodOverride('X-HTTP-Method-Override')); 	

		// express/mongo session storage
		app.use(session({
		  secret: 'MEAN',
		  resave: false,
		  saveUninitialized: true,	  
		  store: sessionStore
		}));
		
		app.use(passport.initialize());
		app.use(passport.session());	

		app.use(function(req, res, next){
			console.log('######################## header');
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Allow-Origin', req.headers.origin);
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Cache-Control');
			if (req.method === 'OPTIONS') {
				res.statusCode = 204;
				return res.end();
			}
			else {
				return next();
			}
		});
		  if ('production' === env) {
		    app.use('/static', express.static(path.join(config.root, 'public')));
		    // app.set('appPath', config.root + '/public');
		    app.use(morgan('dev'));
		  }

		  if ('development' === env || 'test' === env) {	  	
		    app.use(require('connect-livereload')());
		    app.use('/static',express.static(path.join(config.root, 'assets')));
		    // app.use(express.static(path.join(config.root, '.tmp')));
		    // app.use(express.static(path.join(config.root, 'sources/frontend')));
		    // app.use(express.static(path.join(config.root, 'sources/frontend/medias')));
		    // app.set('appPath', 'sources/frontend');
		    app.use(morgan('dev'));
		    app.use(errorHandler()); // Error handler - has to be last

		  }	
		app.listen(config.port, function callback(){
			console.log('Server started on port : ' + config.port);
		});
};