'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModaliteSchema = new Schema({
    nom : String, 
    logo : String,    
});

ModaliteSchema.statics.findByName = function (name, callback) {
        return this.model('Modalite').findOne({ 'nom' : name },callback);
}; 

var collectionName = 'modalites';
module.exports = mongoose.model('Modalite', ModaliteSchema, collectionName);