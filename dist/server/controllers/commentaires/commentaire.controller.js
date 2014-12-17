'use strict';

var Commentaire = require('../../models/commentaire');

exports.show = function(req, res) {

  Commentaire.find(function(err, commentaires) {
      if(err) { return handleError(res, err); }
      if(!commentaires) { return res.send(404); }
      return res.json(commentaires);
  });
};

exports.create = function(req, res) {
  var commentaire = new Commentaire(req.param('commentaire'));	

  commentaire.save(function(err, commentaire) {
      if(err) { return handleError(res, err); }
      return res.send(200); 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}