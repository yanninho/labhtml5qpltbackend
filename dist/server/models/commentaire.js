'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentaireSchema = new Schema({
    texte : String,
    date : { type: Date, default: Date.now },
    modalite : {
        nom : String,
        logo : String
    },
    magasin : String
});

var collectionName = 'commentaires';
module.exports = mongoose.model('Commentaire', CommentaireSchema, collectionName);