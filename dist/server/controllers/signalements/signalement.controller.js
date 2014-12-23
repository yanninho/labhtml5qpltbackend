'use strict';

var Signalement = require('../../models/signalement');
require('../../services/sendMails');

exports.show = function(req, res) {
  Signalement.find(function(err, signalements) {
      if(err) { return handleError(res, err); }
      if(!signalements) { return res.send(404); }
      return res.json(signalements);
  });
};

exports.create = function(req, res) {
  var signalement = new Signalement(req.param('signalement'));	

  signalement.save(function(err, signalement) {
      if(err) { 
        return handleError(res, err); 
      }
      else {
        var titre = 'Nouveau signalement d\'un commentaire';
        var texte = 'Un signalement vient d\'être proposé : \n' +
          '- Magasin : ' + signalement.magasin.marque.nom + ", " + signalement.magasin.adresse + "\n" +
          '     - Erreur : ' + signalement.erreur + '\n' +
          '     - Explication : ' + signalement.explication + '\n';    
          sendmail(titre, texte);  
      }
      return res.send(200); 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}