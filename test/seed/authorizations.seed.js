'use strict';

var requireHelper = require('../require_helper'),
  model = require('./authorizations.model'),
  crypt = requireHelper('services/crypt');

exports.seed = function() {
    var ObjectId = require('mongoose').Types.ObjectId;
    return model.create(
    {
        '_id' : new ObjectId('5455f18e806f130183000001'),
        'key' : '47aG96kCfg',
        'pass' : crypt.encrypt('qQML3wAstQ')
    });                       
};