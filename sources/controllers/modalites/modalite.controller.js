'use strict';

var Modalite = require('../../models/modalite');

// retourne les magasins presents entre 4 points
exports.show = function(req, res) {

  Modalite.find(function(err, modalites) {
      if(err) { return handleError(res, err); }
      if(!modalites) { return res.send(404); }
      return res.json(modalites);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}