'use strict';

var express = require('express');
var controller = require('./magasin.controller');

var router = express.Router();

router.get('/:latitudeSudOuest/:longitudeSudOuest/:latitudeNordEst/:longitudeNordEst', controller.show);
router.get('/:id', controller.findOne);
//router.post('/', controller.create);
router.put('/', controller.update);
router.post('/commentaires', controller.commentaires);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;