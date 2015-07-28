'use strict';
var requireHelper = require('../require_helper');
var should = require('chai').should();
var config = requireHelper('config/environment');
var Magasin = requireHelper('models/magasin');
var utils = require('../test_utils'); 

describe('Magasin Model', function() {
	 
	 it('La base de donnees doit contenir 14 magasins', function(done) {
	    Magasin.find({}, function(err, magasins) {
	      if (err) throw err;
	      magasins.should.have.length(14);
	      done();
	    });
	});	

	 it('La recherche de magasins dans une zone avec aucun résultat', function(done) {
		  var coords = {
		    latitudeSudOuest : 48.06982060571871,
		    longitudeSudOuest : -0.09922027587890625,
		    latitudeNordEst : 48.17741903386744,
		    longitudeNordEst : 0.2190399169921875
		  }
	    Magasin.findInBox(coords, function(err, magasins) {
	      if (err) throw err;
	      magasins.should.have.length(0);
	      done();
	    });
	});	

	//  it('La recherche de magasins dans une zone avec 1 résultat', function(done) {
	// 	  var coords = {
	// 	    latitudeSudOuest : 43.53206039260204,
	// 	    longitudeSudOuest : 1.4690136909484863,
	// 	    latitudeNordEst : 43.539363763712615,
	// 	    longitudeNordEst : 1.4889049530029297
	// 	  }
	//     Magasin.findInBox(coords, function(err, magasins) {
	//       if (err) throw err;
	//       magasins.should.have.length(1);
	//       magasins[0].marque.nom.should.equal("Intermarché Hyper");
	//       done();
	//     });
	// });	

	//  it('La recherche de magasins sans coordonnees : leve une exception', function(done) {
	// 	var coords = {}
	// 	try {
	// 		Magasin.findInBox(coords, function(err){    		
	// 			throw new Error('Aucune exception levée'); 
	// 		});			
	// 	}
	// 	catch(e) {
	// 		done();
	// 	}
	// });	

	// it('Modification d\'un magasin : mis à jour des commentaires', function(done) {
	// 	var magasin = {
	// 		_id : "5466fd963f9503e5a68c51d3",
	// 			commentaires : [{
	// 	        	description : "Aucun ticket pris par ce magasin",
	// 	        	actif : false,
	// 	        	modalite : {
	// 				    "nom" : "Tickets restaurants",
	// 				    "logo" : "ticketsResto.png"
	// 	        	}
	// 	    	}]
	// 	};

 //    	Magasin.update(magasin, function(err){
 //    		if (err) throw err;
 //    		done();
 //    	});
	// });

	// it('Modification d\'un magasin : ajout d\'un commentaire avec une modalité inconnue : leve une exception', function(done) {
	// 	var magasin = {
	// 		_id : "5466fd963f9503e5a68c51d3",
	// 			commentaires : [{
	// 	        	description : "Aucun ticket pris par ce magasin",
	// 	        	actif : false,
	// 	        	modalite : {
	// 				    "nom" : "Inconnue",
	// 				    "logo" : "ticketsResto.png"
	// 	        	}
	// 	    	}]
	// 	};

	// 	try {
	// 		Magasin.update(magasin, function(err){    		
	// 			throw new Error('Aucune exception levée'); 
	// 		});			
	// 	}
	// 	catch(e) {
	// 		done();
	// 	}
	// });

	// it('Modification d\'un magasin : ajout d\'un commentaire avec une modalité dont le logo n\'est pas conforme : leve une exception', function(done) {
	// 	var magasin = {
	// 		_id : "5466fd963f9503e5a68c51d3",
	// 			commentaires : [{
	// 	        	description : "Aucun ticket pris par ce magasin",
	// 	        	actif : false,
	// 	        	modalite : {
	// 				    "nom" : "Tickets restaurants",
	// 				    "logo" : "bad logo"
	// 	        	}
	// 	    	}]
	// 	};

	// 	try {
	// 		Magasin.update(magasin, function(err){    		
	// 			throw new Error('Aucune exception levée'); 
	// 		});			
	// 	}
	// 	catch(e) {
	// 		done();
	// 	}
		
	// });

	it('Modification d\'un magasin : ajout d\'un commentaire sans modalite : leve une exception', function(done) {
		var magasin = {
			_id : "5466fd963f9503e5a68c51d3",
				commentaires : [{
		        	description : "Aucun ticket pris par ce magasin",
		        	actif : false
		    	}]
		};

		try {
			Magasin.update(magasin, function(err){    		
				throw new Error('Aucune exception levée'); 
			});			
		}
		catch(e) {
			done();
		}
    	
	});

});