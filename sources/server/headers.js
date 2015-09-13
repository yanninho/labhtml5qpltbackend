 'use strict';

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var express = require('express');
// var app = express();

 module.exports = function(app) {
 	// app.use(cookieParser());
 	// app.use(bodyParser.json()); 
 	// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
 	// app.use(bodyParser.urlencoded({ extended: true })); 
 	// app.use(methodOverride('X-HTTP-Method-Override')); 	

  app.use(function(req, res, next){
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, authorization');
    res.header('Access-Control-Expose-Headers', 'content-range, accept-range, link, WWW-Authenticate, Provider,ID'); 
//    res.header('content-type', 'application/json; charset=utf-8');
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      return res.end();
    }
    else {
      return next();
    }
  });
 };