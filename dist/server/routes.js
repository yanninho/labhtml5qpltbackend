'use strict';
var errors = require('./errors');

module.exports = function(app, config) {

  app.use(function(req, res, next) {
    req.config = config;
  	return next();
  });	
  // routes version
  app.use('/v2', require('./controllers/v2'));

  app.use(function(err, req, res, next) {
  	console.log(err);
  	res.status(500).send('Problème survenu ! ');
  });

  // erreur url
  app.route('/*')
  .get(errors[404]);

};
