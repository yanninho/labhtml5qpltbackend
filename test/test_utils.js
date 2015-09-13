'use strict';

var requireHelper = require('./require_helper');
var  config = requireHelper('config/environment');
var mongoose = require('mongoose');

var magasinTest = require('./seed/magasins.seed');
var modaliteTest = require('./seed/modalites.seed');
var authTest = require('./seed/authorizations.seed');
var userTest = require('./seed/users.seed');


// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

beforeEach(function (done) {

 function clearDB() {
   for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove(function() {});
   }
   
 }

 function populateDatabase() {
  magasinTest.seed();
  modaliteTest.seed();
  authTest.seed();
  userTest.seed();
 }

 function reconnect() {
   mongoose.connect(config.mongo.uri, function (err) {
     if (err) {
       throw err;
     }
     clearDB();
     populateDatabase();
     return done();
   });
 }


 function checkState() {
   switch (mongoose.connection.readyState) {
   case 0:
     reconnect();
     break;
   case 1:
     clearDB();
     populateDatabase();
     done();
     break;
   default:
     setImmediate(checkState);
   }
}

 checkState();
});

afterEach(function (done) {
 // mongoose.disconnect();
 return done();
});