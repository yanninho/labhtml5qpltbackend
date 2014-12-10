'use strict';

var Magasin = require('../../models/magasin');
var Commentaire = require('../../models/commentaire');
var GeoJSON = require('geojson');

// retourne les magasins presents entre 4 points
exports.show = function(req, res) {

  var coords = {
    latitudeSudOuest : req.params.latitudeSudOuest,
    longitudeSudOuest : req.params.longitudeSudOuest,
    latitudeNordEst : req.params.latitudeNordEst,
    longitudeNordEst : req.params.longitudeNordEst    
  }

  Magasin.findInBox(coords, function(err, magasins) {
      if(err) { return handleError(res, err); }
      if(!magasins) { return res.send(404); }
      var geojson = GeoJSON.parse(magasins, {Point: 'location', include: ['_id','adresse','actif','marque','commentaires']});
      return res.json(geojson);
  });
};

exports.findOne = function(req, res) {
  var id = req.params.id;
  Magasin.findById(id, function(err, magasin){
      if(err) { return handleError(res, err); }
      if(!magasin) { return res.send(404); }
      var magasinReturn = {
        type : 'Feature',
        geometry : {
          coordinates : magasin.location
        },
        properties : magasin
      };

      return res.json(magasinReturn);
  });
};

// mets à jour les données d'un magasin
exports.update = function(req, res) {
  var magasin = req.param('magasin');
  Magasin.update(magasin, function(err) {
    if(err) { return handleError(res, err); }
    return res.send(200);
  });

}

exports.commentaires = function(req, res) {
  var commentaires = req.body.commentaires;
  var result = res.send(200);
  commentaires.forEach(function(commentaire) {
      Magasin.commentaire(commentaire, function(err, magasin) {
        if(err) { 
          result = handleError(res, err); 
        }
        else {
          console.log('remove comm : ' + commentaire._id);
          Commentaire.findByIdAndRemove(commentaire._id, function(err) {
            if(err) { 
              result = handleError(res, err); 
            }          
          });          
        }
      });
  });
  return result;
}

function handleError(res, err) {
  return res.send(500, err);
}