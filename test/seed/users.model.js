'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usersSchema = new Schema({
    email : String, 
    password : String, 
    token : String   
});

var collectionName = 'users';
module.exports = mongoose.model('User', usersSchema, collectionName);