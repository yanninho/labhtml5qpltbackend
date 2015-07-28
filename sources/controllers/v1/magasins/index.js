'use strict';

var express = require('express');
var controller = require('./magasin.controller');

var auth = require('../../../config/auth');

var router = express.Router();

router.get('/:latitudeSudOuest/:longitudeSudOuest/:latitudeNordEst/:longitudeNordEst', controller.show);
router.get('/:id', controller.findOne);
router.get('/', auth.ensureAuthenticated, controller.list);
//router.post('/', controller.create);
router.put('/', controller.update);
router.post('/commentaires', auth.ensureAuthenticated, controller.commentaires);
router.post('/activer/:choix', auth.ensureAuthenticated, controller.activer);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;