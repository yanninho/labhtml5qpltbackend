'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuthorizationsSchema = new Schema({
    key : String, 
    pass : String,    
});

var collectionName = 'authorizations';
module.exports = mongoose.model('Auth', AuthorizationsSchema, collectionName);