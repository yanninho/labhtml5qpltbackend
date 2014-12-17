'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var Modalite = require('./modalite');

var MagasinSchema = new Schema({
    location : [Number],
    adresse : String,
    actif : Boolean,
    marque : {
        nom : String,
        logo : String
    },
    commentaires : [{
        description : String,
        date : { type: Date, default: Date.now },
        modalite : {
            nom : String,
            logo : String
        }
    }]
});

function controlCoordonnees(coords) {
    var stringUtils = require('string');
    var isOk = true;
    if (typeof coords == 'undefined') {
        isOk = false;
    } else {
        if (!coords.latitudeSudOuest) {
            isOk = false;
        }
        if (!coords.latitudeNordEst) {
            isOk = false;
        }
        if (!coords.longitudeSudOuest) {
            isOk = false;
        }
        if (!coords.longitudeNordEst) {
            isOk = false;
        }
    }
    return isOk;
}

function controlCommentaire(comment, index) {
   var stringUtils = require('string');
   var isOk = true;
   if (typeof comment.actif == 'undefined') {
      isOk = false;
   } 
            
   if (stringUtils(comment.description).isEmpty()) {
        isOk = false;
    }

    if (!comment.modalite) {
        isOk = false;
    }
    else {
        if (stringUtils(comment.modalite.nom).isEmpty()) {
            isOk = false;
        }
        if (stringUtils(comment.modalite.logo).isEmpty()) {
            isOk = false;
        }
        if (isOk) {
            this[index] = comment.modalite;
        }      
    }  
    if (!isOk) throw !isOk;

}

// function controlModalites(modalites) {
//     var async = require('async');
//     var isOk = true;
//     var names = [];
//     modalites.forEach(function(modalite){        
//         names.push(modalite.nom);
//     });
//     console.log(names);
//     async.map(names, Modalite.findByName ,function(err, modaliteTrouve) {
//         console.log('0');
//         if (err) isOk = false;
//         if (modaliteTrouve == null) isOk = false;
//         console.log('1');
//     });
//     console.log('2');
//     if (!isOk) throw !isOk;
// }



function controlCommentaires(commentaires) {    
    var isOk = true;
    var modalites = [];
    if (typeof commentaires != 'undefined') {
        if (Object.prototype.toString.call( commentaires ) !== '[object Array]') {
            isOk = false;
        }
        else {            
            try {
                commentaires.forEach(controlCommentaire, modalites);
                // if (modalites.length > 0) {
                //     controlModalites(modalites);
                // }   
            } catch(e) {
                isOk = false;
            }      
   
        }

    }
    return isOk;
}

/**
 * Methods
 */
MagasinSchema.statics.findInBox = function (coords, callback) {

    if (!controlCoordonnees(coords)) {
        throw new Error('Les coordonnees ne sont pas valides');
    }
    else {
        return this.model('Magasin').find(
            {"location": 
                {"$within": 
                    {"$box": [[coords.longitudeSudOuest, coords.latitudeSudOuest], [coords.longitudeNordEst, coords.latitudeNordEst]]}
                }
            }
        ,callback);        
    }
} 

MagasinSchema.statics.update = function (magasin, callback) {
        if (typeof magasin == 'undefined' ) {
            throw new Error('Parametres manquants');
        }
        if (typeof magasin._id == 'undefined' ) {
            throw new Error('Parametres manquants');
        }

        if (!controlCommentaires(magasin.properties.commentaires)) {
           throw new Error('Mauvais format pour certains commentaires'); 
        }

        var ObjectId = require('mongoose').Types.ObjectId;
        this.model('Magasin').findById(new ObjectId(magasin._id), function(err, magasinTrouve){
            if (err) throw err;
            if (typeof magasin.properties.actif != 'undefined') magasinTrouve.properties.actif = magasin.properties.actif;
            if (typeof magasin.properties.adresse != 'undefined') magasinTrouve.properties.adresse = magasin.properties.adresse;
            if (typeof magasin.geometry.coordinates != 'undefined') magasinTrouve.geometry.coordinates = magasin.geometry.coordinates;
            if (typeof magasin.properties.marque != 'undefined') magasinTrouve.properties.marque = magasin.properties.marque;
            if (typeof magasin.properties.commentaires != 'undefined') magasinTrouve.properties.commentaires = magasin.properties.commentaires;    
            return magasinTrouve.save(callback);                    
        });
    // }
} 

MagasinSchema.statics.commentaire = function (commentaire, callback) {
        var ObjectId = require('mongoose').Types.ObjectId;
        this.model('Magasin').findById(new ObjectId(commentaire.magasin), function(err, magasinTrouve){
            if (err) throw err;
            if (magasinTrouve != null) {
                if (magasinTrouve.commentaires == null) {
                    magasinTrouve.commentaires = [];
                }
                magasinTrouve.commentaires.push({description: commentaire.texte, date: commentaire.date, modalite: commentaire.modalite});
                magasinTrouve.save(callback);
            }
        });
}

var collectionName = 'magasins'
module.exports = mongoose.model('Magasin', MagasinSchema, collectionName);