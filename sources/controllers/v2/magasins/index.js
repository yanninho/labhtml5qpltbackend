'use strict';

var express = require('express');
var controller = require('./magasin.controller');
var happyRestFields = require('happyrestfields');
var happyRestMongo = require('happyrestmongodb');
//var magasinModel = require('../../../models/magasin');

var router = express.Router();

router.get('/location', controller.findByLocation);
happyRestMongo.findMongo(router, '/', 'magasin', 200, 'magasins');
//happyRestMongo.findMongoose(router, '/', 'magasin', 200, magasinModel);

router.get('/:id', controller.findById, happyRestFields.selectionFields, controller.endFindById);

module.exports = router;