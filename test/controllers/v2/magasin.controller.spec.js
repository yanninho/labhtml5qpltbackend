'use strict';
var requireHelper = require('../../require_helper');
var app = requireHelper('app');
var request = require('supertest');
var should = require('chai').should();
var utils = require('../../test_utils');
var _ = require('underscore');

describe('GET /magasins', function() {

  it('retourne la liste des magasins : GET /v2/magasins', function(done) {
    request(app)
    .get('/v2/magasins')
    .expect(200)
    .expect('Accept-Range', 'magasin 200')
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(14);     
      done();
    })
  }); 

  it('retourne la liste des magasins contenant seulement adresse et nom de la marque', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse,marque(nom)')
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

      var keysMarque = _.keys(magasin['marque']);
      _.contains(keysMarque, 'nom').should.equal(true); 
      _.contains(keysMarque, 'logo').should.equal(false); 
      done();
    })
  }); 

  it('retourne une plage de magasins', function(done) {
    request(app)
    .get('/v2/magasins?range=0-10')
    .expect(206)
    .expect('Content-Range', '0-10/14')
    .expect('Accept-Range', 'magasin 200')    
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(10);     
      done();
    })
  }); 

  it('retourne une plage de magasins incorrecte', function(done) {
    request(app)
    .get('/v2/magasins?range=0-500')
    .expect(400)
    .expect('Accept-Range', 'magasin 200')    
    .end(function(err, res) {
      should.exist(res.body.reason);      
      res.body.reason.should.equal('Requested range not allowed');   
      done();
    })
  }); 

  it('retourne un magasin correspondant à une recherche du champ addresse', function(done) {
    request(app)
    .get('/v2/magasins?adresse=Centre Commercial du Val de Lys 62120 AIRE SUR LA LYS&range=0-10')
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(1);     
      done();
    })
  }); 

  it('retourne un magasin correspondant à une recherche en 2 parties du champ addresse', function(done) {
    request(app)
    .get('/v2/magasins?adresse=Centre Commercial * AIRE SUR LA LYS&range=0-10')
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(1);     
      done();
    })
  }); 

  it('retourne un magasin correspondant à une recherche partielle dans le champ addresse', function(done) {
    request(app)
    .get('/v2/magasins?adresse=Val de Lys*&range=0-10')
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(1);     
      done();
    })
  }); 

  it('retourne un magasin correspondant à une recherche du champ marque > nom', function(done) {
    request(app)
    .get('/v2/magasins?marque.nom=Carrefour&range=0-10&fields=adresse')
    .expect(206)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(10);     
      done();
    })
  }); 

  it('retourne les adresses des magasins ordonnés par adresse', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse&sort=adresse')
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(14);   
      done();
    })
  }); 

  it('retourne les adresses des magasins ordonnés par adresse décroissant', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse&sort=adresse&desc=adresse')
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(14);   
      done();
    })
  }); 

  it('retourne les adresses et nom de marque des magasins ordonnés par adresse avec recherche', function(done) {
    request(app)
    .get('/v2/magasins?fields=adresse,marque(nom)&sort=adresse&adresse=Centre*')
    .expect(200)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(4);   
      done();
    })
  }); 

  it('retourne une plage de magasins', function(done) {
    request(app)
    .get('/v2/magasins?range=5-9')
    .expect(206)  
    .end(function(err, res) {
      should.not.exist(err);
      var magasins = res.body;
      magasins.should.be.instanceof(Array);
      magasins.should.have.length(4);     
      done();
    })
  }); 

  // it('retourne une plage de magasins avec liens : GET /v2/magasins?range=5-9', function(done) {
  //   request(app)
  //   .get('/v2/magasins?range=5-9')
  //   .expect(206)
  //   .expect('Content-Range', '5-9/14')
  //   .expect('Accept-Range', 'magasin 200')    
  //   .expect('Link', '?range=0-4>; rel="first", ?range=0-4>; rel="prev", ?range=10-14>; rel="next", ?range=10-14>; rel="last"')    
  //   .end(function(err, res) {
  //     should.not.exist(err);
  //     var magasins = res.body;
  //     magasins.should.be.instanceof(Array);
  //     magasins.should.have.length(5);         
  //     done();
  //   })
  // }); 

  it('retourne un magasin correspondant à son id en paramètre', function(done) {
    request(app)
    .get('/v2/magasins/54616901806f1300f4000002')
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var magasin = res.body[0];
      magasin._id.should.equal('54616901806f1300f4000002');
      magasin.location[0].should.equal(5.442);  
      magasin.location[1].should.equal(43.514);
      magasin.adresse.should.equal('Centre commercial la Pioline. 1175 Rue Guillaume Du Vair 13546 AIX EN PROVENCE CEDEX 04 ');
      magasin.actif.should.equal(true);
      magasin.marque.nom.should.equal('Carrefour');
      magasin.marque.logo.should.equal('carrefour.png');
      done();
    })
  }); 

  it('retourne un magasin correspondant à son id en paramètre contenant seulement adresse et nom de la marque', function(done) {
    request(app)
    .get('/v2/magasins/54616901806f1300f4000002?fields=adresse,marque(nom)')
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var magasin = res.body[0];
      var keys = _.keys(magasin);   
      _.contains(keys, 'adresse').should.equal(true);   
      _.contains(keys, 'marque').should.equal(true);   
      _.contains(keys, 'actif').should.equal(false);  

      var keysMarque = _.keys(magasin['marque']);
      _.contains(keysMarque, 'nom').should.equal(true); 
      _.contains(keysMarque, 'logo').should.equal(false);
      
      magasin.adresse.should.equal('Centre commercial la Pioline. 1175 Rue Guillaume Du Vair 13546 AIX EN PROVENCE CEDEX 04 ');
      magasin.marque.nom.should.equal('Carrefour');

      done();
    })
  }); 

  it('retourne une erreur car le parametre identifiant ne correspond à aucun magasin', function(done) {
    request(app)
    .get('/v2/magasins/12')
    .expect(500)
    .end(function(err, res) {        
      done();
    })
 }); 

  it('retourne la liste des magasins dans un espace geometrique 2D', function(done) {
    request(app) 
    .get('/v2/magasins/location?latitudeSudOuest=50.632&longitudeSudOuest=2.408&latitudeNordEst=50.634&longitudeNordEst=2.410')
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      var magasin = res.body;
      magasin.features.should.be.instanceof(Array);
      magasin.features.should.have.length(1);
      magasin.features[0].adresse = 'Centre Commercial du Val de Lys 62120 AIRE SUR LA LYS';
      magasin.features[0]._id = '54616901806f1300f4000001';  
      magasin.features[0].geometry.coordinates[0].should.equal(2.409);
      magasin.features[0].geometry.coordinates[1].should.equal(50.633);        
      done();
    })
  }); 

  it('retourne la liste des magasins dans un espace geometrique 2D', function(done) {
    request(app) 
    .get('/v2/magasins/location?longitudeNordEst=2.410')
    .expect(400)
    .end(function(err, res) {       
      done();
    })
  }); 

});