'use strict';

var Magasin = require('../models/magasin');

module.exports = {
	seed : function(callback) {
			return Magasin.create(
			      /**
			        * latitudesudouest = 43.52667757641432
			        * longitudesudouest = 1.448349952697754
			        * latitudenordest = 43.55588836104427
			        * longitudenordest = 1.5279150009155273
			      */
			      {
			      	  "_id" : ObjectId("5461ea1f4989a75c0200631d"),
			          "adresse" : "Boulevard Jacques Duclos - Route Nationale 10 40220 TARNOS ",
			          "actif" : true,
			          "location" : [ 
			              43.536, 
			              1.461
			          ],
			          "marque" : {
			              "nom" : "Carrefour",
			              "logo" : "carrefour.png"
			          },
			          "commentaires" : 
			          [
			            {
			                "description" : "Ils en prennent 2 maximum",
			                "actif" : true,
			                "modalite" : {
			                  "nom" : "Cheques de table",
			                  "logo" : "chequeDeTable.gif"
			                }
			            },
			            {
			                "description" : "Aucun",
			                "actif" : true,
			                "modalite" : {
			                  "nom" : "Cheques dejeuner",
			                  "logo" : "chequesDejeuner.gif"
			                }
			            },
			            {
			                "description" : "Ce magasin les prend en illimité sans aucune restriction",
			                "actif" : true,
			                "modalite" : {
			                  "nom" : "Tickets restaurants",
			                  "logo" : "ticketsResto.png"
			                }
			            }
			          ]
			      },
			      {
			      	  "_id" : ObjectId("5466fd963f9503e5a68c51d3"),
			          "adresse" : "C.C. de Marnac 31520 Ramonville-Saint-Agne",
			          "actif" : true,
			          "location" : [ 
			              43.54710439999999, 
			              1.4776044
			          ],
			          "marque" : {
			              "nom" : "Leader Price",
			              "logo" : "Leader_Price.png"
			          }
			      },
			      {
			      	  "_id" : ObjectId("5461ea1f4989a75c02006322"),
			          "adresse" : "1 rue Louis Braille 31520 Ramonville Saint-Agne",
			          "actif" : true,
			          "location" : [ 
			              43.5354164, 
			              1.478714
			          ],
			          "marque" : {
			              "nom" : "Intermarché Hyper",
			              "logo" : "intermarches_hyper.png"
			          }
			      }
			       
			)                		
		}
	}
