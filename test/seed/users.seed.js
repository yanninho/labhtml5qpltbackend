'use strict';

var requireHelper = require('../require_helper'),
  model = require('./users.model'),
  crypt = requireHelper('services/crypt');

exports.seed = function() {
    var ObjectId = require('mongoose').Types.ObjectId;
    return model.create(
    {
        '_id' : new ObjectId('5455f18e806f130183000001'),
        'email' : 'titi@titi.com',
        'password' : crypt.encrypt('qQML3wAstQ'),
        'token' : '5455f18e806f130183000001'
    });                       
};