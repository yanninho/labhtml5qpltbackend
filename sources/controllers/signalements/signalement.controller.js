'use strict';

var Signalement = require('../../models/signalement');

exports.create = function(req, res) {
  var signalement = new Signalement(req.param('signalement'));	

  signalement.save(function(err, signalement) {
      if(err) { return handleError(res, err); }
      return res.send(200); 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}