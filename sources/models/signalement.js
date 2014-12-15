'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SignalementSchema = new Schema({
    texte : String,
    date : { type: Date, default: Date.now },
    erreur: String,
    explication: String,
    magasin : {
	    location : [Number],
	    adresse : String,
	    actif : Boolean,
	    marque : {
	        nom : String,
	        logo : String
	    },
	    commentaires : [{
	        description : String,
	        date : { type: Date },
	        modalite : {
	            nom : String,
	            logo : String
	        }
	    }]
	}
});

var collectionName = 'signalements';
module.exports = mongoose.model('Signalement', SignalementSchema, collectionName);