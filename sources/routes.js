/**
 * Main application routes
 */

'use strict';

var errors = require('./errors');

module.exports = function(app) {
  // les routes
  app.use('/magasins', require('./controllers/magasins'));
  app.use('/modalites', require('./controllers/modalites'));
  app.use('/commentaires', require('./controllers/commentaires'));
  app.use('/signalements', require('./controllers/signalements'));

  // erreur url
  app.route('/*')
   .get(errors[404]);

};
