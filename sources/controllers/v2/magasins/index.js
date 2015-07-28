'use strict';

var express = require('express');
var controller = require('./magasin.controller');

var router = express.Router();

router.get('/location', controller.findByLocation);
router.get('/', controller.find);
router.get('/:id', controller.findById);



module.exports = router;