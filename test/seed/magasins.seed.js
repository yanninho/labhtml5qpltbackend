'use strict';

var requireHelper = require('../require_helper')
, feedModel = requireHelper('models/magasin');

exports.seed = function() {
	var ObjectId = require('mongoose').Types.ObjectId;
	return feedModel.create(
	{
		"_id" : new ObjectId("54616901806f1300f4000001"),
		"location" : [ 
		2.409, 
		50.633
		],
		"adresse" : "Centre Commercial du Val de Lys 62120 AIRE SUR LA LYS",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 1 */
	{
		"_id" : new ObjectId("54616901806f1300f4000002"),
		"location" : [ 
		5.442, 
		43.514
		],
		"adresse" : "Centre commercial la Pioline. 1175 Rue Guillaume Du Vair 13546 AIX EN PROVENCE CEDEX 04 ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 2 */
	{
		"_id" : new ObjectId("54616901806f1300f4000003"),
		"location" : [ 
		8.746, 
		41.943
		],
		"adresse" : "Rond-Point du Finosello 20090 AJACCIO Corse ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 3 */
	{
		"_id" : new ObjectId("54616901806f1300f4000004"),
		"location" : [ 
		0.062, 
		48.433
		],
		"adresse" : "Rue de Bretagne 61000 ALENCON ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 4 */
	{
		"_id" : new ObjectId("54616901806f1300f4000005"),
		"location" : [ 
		2.303, 
		49.921
		],
		"adresse" : "Zone d'Activité Commerciale Vallée Saint Ladre 80085 AMIENS CEDEX 02 ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 5 */
	{
		"_id" : new ObjectId("54616901806f1300f4000006"),
		"location" : [ 
		-0.594, 
		47.467
		],
		"adresse" : "Centre commercial Grand Maine - Rue du Grand Launay 49000 ANGERS ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 6 */
	{
		"_id" : new ObjectId("54616901806f1300f4000007"),
		"location" : [ 
		-0.539, 
		47.487
		],
		"adresse" : "Boulevard Gaston Ramon 49100 ANGERS ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 7 */
	{
		"_id" : new ObjectId("54616901806f1300f4000008"),
		"location" : [ 
		-1.501, 
		43.486
		],
		"adresse" : "Avenue Jean Léon Laporte, Centre commercial BAB2 64600 ANGLET ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 8 */
	{
		"_id" : new ObjectId("54616901806f1300f4000009"),
		"location" : [ 
		-1.103, 
		46.112
		],
		"adresse" : "Route de Rochefort 17690 ANGOULINS ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 9 */
	{
		"_id" : new ObjectId("54616901806f1300f400000a"),
		"location" : [ 
		6.124, 
		45.925
		],
		"adresse" : "134 avenue de Genève 74000 ANNECY ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},

	/* 10 */
	{
		"_id" : new ObjectId("54616901806f1300f400000b"),
		"location" : [ 
		7.1, 
		43.6
		],
		"adresse" : "Chemin de Saint Claude 06600 ANTIBES ",
		"actif" : true,
		"marque" : {
			"nom" : "Carrefour",
			"logo" : "carrefour.png"
		}
	},
	{
		"_id" : new ObjectId("5461ea1f4989a75c0200631d"),
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
			"date" : "20150101",
			"modalite" : {
				"nom" : "Cheques de table",
				"logo" : "chequeDeTable.gif"
			}
		},
		{
			"description" : "Aucun",
			"date" : "20150101",
			"modalite" : {
				"nom" : "Cheques dejeuner",
				"logo" : "chequesDejeuner.gif"
			}
		},
		{
			"description" : "Ce magasin les prend en illimité sans aucune restriction",
			"date" : "20150101",
			"modalite" : {
				"nom" : "Tickets restaurants",
				"logo" : "ticketsResto.png"
			}
		}
		]
	},
	{
		"_id" : new ObjectId("5466fd963f9503e5a68c51d3"),
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
		"_id" : new ObjectId("5461ea1f4989a75c02006322"),
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
