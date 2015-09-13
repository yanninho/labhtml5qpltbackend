'use strict';

var express = require('express');
var path = require('path');

module.exports = function(app,config) {
	var env = app.get('env');

	app.use(express.static(__dirname + '/public'));

	if ('production' === env) {
		app.use('/static', express.static(path.join(config.root, 'assets')));
	}

	if ('development' === env || 'test' === env) {	  	
		app.use(require('connect-livereload')());
		app.use('/static',express.static(path.join(config.root, 'assets')));
	}	
};