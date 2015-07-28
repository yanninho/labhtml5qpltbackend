'use strict';

var Magasin = require('../../../models/magasin');
var Commentaire = require('../../../models/commentaire');
var Signalement = require('../../../models/signalement');
var GeoJSON = require('geojson');

var geojsonMagasins = function(magasins) {
  return GeoJSON.parse(magasins, {Point: 'location', include: ['_id','adresse','actif','marque','commentaires']});
}

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
      var geojson = geojsonMagasins(magasins);
      return res.json(geojson);
  });
};

exports.list = function(req, res) {
  var query = Magasin.find();
  var callback = function(err, magasins) {
      if(err) { return handleError(res, err); }
      if(!magasins) { return res.send(404); }
      var geojson = geojsonMagasins(magasins);
      return res.json(geojson);
  };

  var filter = JSON.parse(req.query.filter);
  if (filter != undefined) {
    var adresse = filter.adresse;
    var marque = filter.marque;
    if (adresse != undefined) {
      query.regex("adresse",".*"+ adresse +".*");
    }
    if (marque != undefined) {
      query.regex("marque.nom",".*"+ marque +".*");
    }
  }

  var sorts = JSON.parse(req.query.sorts);
  if (sorts != undefined) {
    query.sort(sorts);
    // sorts.values.forEach(function(sort) {
    //   query.sort(sort[1]+sort[0]);
    // });
  }

  var limit = JSON.parse(req.query.limit);
  if (limit != undefined) {    
    query.limit(limit);
  }

  query.exec(callback);  
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

exports.activer = function(req, res) {
  var choix = req.params.choix;
  var signalements = req.body.signalements;
  var result = res.send(200);
  var error = false;
  var actif = false;
  if (choix == 'oui') {
    actif = true;
  }

  signalements.forEach(function(signalement) {
      Magasin.findById(signalement.magasin._id, function(err, magasin){
          if(!err && magasin) {
            magasin.actif = actif;
            magasin.save(function(err, magasin) {
                if(err) { error = true; }                
            });            
          }
          else {
            error = true;            
          }        
      });
      if (!error) {
          Signalement.findById(signalement._id, function(err, bddSignalement) {
            if(!err) {
              bddSignalement.magasin.actif = actif;
              bddSignalement.save(function(err, sign) {
                  if(err) { error = true; }                
              });                
            }         
          });          
      }
  });
  if (error) {
    result = res.send(404);
  }
  return result;  
}


function handleError(res, err) {
  return res.send(500, err);
}