'use strict';
var requireHelper = require('../../require_helper');
var app = requireHelper('app');
var request = require('supertest');
var should = require('chai').should();
var utils = require('../../test_utils');

describe('test /user module', function() {

  it('GET /user/:token', function(done) {
    request(app)
    .get('/v2/user/5455f18e806f130183000001')   
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body);
      done();
    });
  }); 

  it('GET /user/:token not found', function(done) {
    request(app)
    .get('/v2/user/bad')   
    .expect(404)
    .end(function(err, res) {
      done();
    });
  }); 

  it('PUT /user = create user', function(done) {
    request(app)
    .put('/v2/user')
    .send({
      'email' : 'example@example.com',
      'password' : 'pass'
    })   
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body);
      var newUser = res.body;
      newUser.email.should.equal('example@example.com');      
      done();
    });
  }); 

});