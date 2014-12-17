'use strict';

var app = require('../../app');
var request = require('supertest');

describe('GET /magasins', function() {

  it('retourne une liste avec un seul magasin dans un ensemble', function(done) {
    request(app)
      .get('/magasins/43.53206039260204/1.4690136909484863/43.539363763712615/1.4889049530029297')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var magasins = res.body;
        magasins.should.be.instanceof(Array);
        magasins.should.have.length(1);
        done();
      });
  });


  it('met a jour un magasin', function(done) {
    var magasin = {
            "_id" : "5466fd963f9503e5a68c51d3",
            "adresse" : "3 rue Louis Braille 31520 Ramonville Saint-Agne",
            "actif" : false,
            "commentaires" : [{
                      "description" : "illimité !",
                      "actif" : false,
                      "modalite" : {
                          "nom" : "Cheques de table",
                          "logo" : "chequeDeTable.gif"
                      }
                  }],
            "marque" : {
                "nom" : "Intermarché Hyper",
                "logo" : "intermarches_hyper.png"
            },
            "location" : [ 
                  43.54710439999999, 
                  1.4776044
                ]
        };

    request(app)
      .put('/magasins')
      .send({magasin: magasin})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});