'use strict';

var requireHelper = require('../../require_helper');
var app = requireHelper('app');
var request = require('supertest');

describe('GET /modalites', function() {

  it('retourne une liste avec 4 modalites', function(done) {
    request(app)
      .get('/modalites')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var modalites = res.body;
        modalites.should.be.instanceof(Array);
        modalites.should.have.length(4);
        done();
      });
  });
});
