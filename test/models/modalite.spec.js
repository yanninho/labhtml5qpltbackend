'use strict';

var requireHelper = require('../require_helper');
var should = require('chai').should();
var config = requireHelper('config/environment');
var Modalite = requireHelper('models/modalite');
var utils = require('../test_utils') 

describe('Modalite Model', function() {

	 it('La base de donnees doit contenir 4 modalites', function(done) {
	    Modalite.find({}, function(err, modalites) {
	      if (err) throw err;	
	      modalites.should.have.length(4);
	      done();
	    });
	});	

	 it('Recherche la modalite dont le nom est : Tickets restaurants', function(done) {
	    Modalite.findByName("Tickets restaurants", function(err, modalite) {
	      if (err) throw err;	
	      modalite.should.have.property('nom').equal('Tickets restaurants');
	      done();
	    });
	});	

	 it('Recherche une modalite avec un nom inconnu : Leve une exception', function(done) {
	    Modalite.findByName("Inconnu", function(err, modalite) {
	      if (err) throw err;	
	      if (modalite == null) {
			 done();
	      }
	      else {
	      	throw new Error('La recherche doit retourner aucun résultat !');
	      }
	    });
	});	

});