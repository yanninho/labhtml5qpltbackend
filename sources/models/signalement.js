'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SignalementSchema = new Schema({
    texte : String,
    date : { type: Date, default: Date.now },
    erreur: String,
    explication: String,
    magasin : String
});

var collectionName = 'signalements';
module.exports = mongoose.model('Signalement', SignalementSchema, collectionName);