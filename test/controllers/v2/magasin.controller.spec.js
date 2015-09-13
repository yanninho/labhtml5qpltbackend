'use strict';
var requireHelper = require('../../require_helper');
var app = requireHelper('app');
var request = require('supertest');
var should = require('chai').should();
var utils = require('../../test_utils');
var _ = require('underscore');
var authorization = 'Bearer 5455f18e806f130183000001';

describe('GET /magasins', function() {

  it('retourne la liste des magasins : GET /v2/magasins', function(done) {
    request(app)
    .get('/v2/magasins')
    .set('Authorization', authorization)
    .expect(200)
    .expect('Accept-Range', 'magasin 200')
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(14);     
      done();
    });
  }); 

  it('retourne la liste des magasins contenant seulement adresse et nom de la marque', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse,marque(nom)')
    .set('Authorization', authorization)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(14);  
      //controle parametres
      var magasin = magasins[0];
      var keys = _.keys(magasin);   
      _.contains(keys, 'adresse').should.equal(true);   
      _.contains(keys, 'marque').should.equal(true);   
      _.contains(keys, 'actif').should.equal(false);  

      var keysMarque = _.keys(magasin.marque);
      _.contains(keysMarque, 'nom').should.equal(true); 
      _.contains(keysMarque, 'logo').should.equal(false); 
      done();
    });
  }); 

  it('retourne une plage de magasins', function(done) {
    request(app)
    .get('/v2/magasins?range=0-9')
    .set('Authorization', authorization)
    .expect(206)
    .expect('Content-Range', '0-9/14')
    .expect('Accept-Range', 'magasin 200')    
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(10);     
      done();
    });
  }); 

  it('retourne une plage de magasins incorrecte', function(done) {
    request(app)
    .get('/v2/magasins?range=0-500')
    .set('Authorization', authorization)
    .expect(400)
    .expect('Accept-Range', 'magasin 200')    
    .end(function(err, res) {
      should.exist(res.body.reason);      
      res.body.reason.should.equal('Requested range not allowed');   
      done();
    });
  }); 

  it('retourne un magasin correspondant à une recherche du champ addresse', function(done) {
    request(app)
    .get('/v2/magasins?adresse=Centre Commercial du Val de Lys 62120 AIRE SUR LA LYS&range=0-10')
    .set('Authorization', authorization)
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(1);     
      done();
    });
  }); 

  it('retourne un magasin correspondant à une recherche en 2 parties du champ addresse', function(done) {
    request(app)
    .get('/v2/magasins?adresse=Centre Commercial * AIRE SUR LA LYS&range=0-10')
    .set('Authorization', authorization)
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(1);     
      done();
    });
  }); 

  it('retourne un magasin correspondant à une recherche partielle dans le champ addresse', function(done) {
    request(app)
    .get('/v2/magasins?adresse=Val de Lys*&range=0-10')
    .set('Authorization', authorization)
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(1);     
      done();
    });
  }); 

  it('retourne un magasin correspondant à une recherche du champ marque > nom', function(done) {
    request(app)
    .get('/v2/magasins?marque.nom=Carrefour&range=0-9&fields=adresse')
    .set('Authorization', authorization)
    .expect(206)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(10);     
      done();
    });
  }); 

  it('retourne les adresses des magasins ordonnés par adresse', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse&sort=adresse')
    .set('Authorization', authorization)
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(14);   
      done();
    });
  }); 

  it('retourne les adresses des magasins ordonnés par adresse décroissant', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse&sort=adresse&desc=adresse')
    .set('Authorization', authorization)
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(14);   
      done();
    });
  }); 

  it('retourne les adresses et nom de marque des magasins ordonnés par adresse avec recherche', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse,marque(nom)&sort=adresse&adresse=Centre*')
    .set('Authorization', authorization)
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(4);   
      done();
    });
  }); 

  it('retourne une plage de magasins', function(done) {
    request(app)
    .get('/v2/magasins?range=5-9')
    .set('Authorization', authorization)
    .expect(206)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(5);     
      done();
    });
  }); 

});