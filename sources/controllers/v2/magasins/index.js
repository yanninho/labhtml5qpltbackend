'use strict';

var express = require('express');
var controller = require('./magasin.controller');
var happyRestFilters = require('happyrestfilters');
var happyRestFields = require('happyrestfields');
var happyRestRange = require('happyrestrange');
var happyRestSort = require('happyrestsort');

var router = express.Router();

router.get('/location', controller.findByLocation);
router.get('/', controller.init('magasin',200), happyRestFilters.extractFilters, happyRestRange.extractRange, happyRestSort.extractSort, controller.count, controller.find, happyRestFields.selectionFields, happyRestRange.setHeader, controller.endFind);
router.get('/:id', controller.findById, happyRestFields.selectionFields, controller.endFindById);

module.exports = router;