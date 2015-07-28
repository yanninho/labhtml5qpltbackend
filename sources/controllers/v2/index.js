'use strict';

var express = require('express'), 
    router = express.Router();

  router.use('/magasins', require('./magasins'));
  // router.use('/modalites', require('./modalites'));
  // router.use('/commentaires', require('./commentaires'));
  // router.use('/signalements', require('./signalements'));
  // router.use('/auth', require('./users'));

module.exports = router;