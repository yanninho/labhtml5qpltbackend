'use strict';

var requireHelper = require('./require_helper');
var  config = requireHelper('config/environment');
var mongoose = require('mongoose');


// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

beforeEach(function (done) {

 function clearDB() {
   for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove();
   }
   populateDatabase();
   return done();
 }

 function populateDatabase() {

 }

 function reconnect() {
   mongoose.connect(config.mongo.uri, function (err) {
     if (err) {
       throw err;
     }
     return clearDB();
   });
 }


 function checkState() {
   switch (mongoose.connection.readyState) {
   case 0:
     reconnect();
     break;
   case 1:
     clearDB();
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