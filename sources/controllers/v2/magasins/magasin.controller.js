'use strict';

var Magasin = require('../../../models/magasin'),
    mongoose = require('mongoose'),
    requestName = 'magasin',
    maxResultPossible = 200,
    _ = require("underscore"),
    RSVP = require('rsvp'),
    GeoJSON = require('geojson'),
    requestProcess = require('../../../services/requestProcess.service');


function count(infos) {
	return new RSVP.Promise(function(resolve, reject) {
		return requestProcess.addFilters(Magasin.count(), infos.filters).exec().then(function(res) {
			infos.count = res;
			if (infos.range.limit === maxResultPossible && res > 0) {
				infos.range.limit = res;
			}
			resolve(infos);
		});
	});
}

function find(infos) {
	var count = infos.count;
	var range = infos.range;
	return new RSVP.Promise(function(resolve, reject) {
			var req = Magasin.find({});
			req = requestProcess.addRange(req, infos.range);
			req = requestProcess.addFilters(req, infos.filters);					
			req = requestProcess.addSort(req, infos.sort);					
			return req.exec().then(function(res) {
				infos.result = res;
				resolve(infos);
			});
	});
}

exports.find = function(req, res) {

	function setAcceptRange() {
		res.setHeader('Accept-Range', requestName + ' ' + maxResultPossible);
	}
	
	function reject(error) {
		setAcceptRange();
		return res.status(error.status).send({reason : error.reason});
	}

	function end(infos) {
		res.setHeader('Content-Range', infos.range.offset + '-' + infos.range.limit + '/'+ infos.count );
		setAcceptRange();
		var status = 200;
		if (infos.result.length < infos.count) {
			status = 206;
		}
		return res.status(status).json(infos.result);		
	}

	req.maxResultPossible = maxResultPossible;
	requestProcess.prepare(req, reject)
	.then(requestProcess.range, reject)
	.then(requestProcess.fields, reject)
	.then(requestProcess.filters, reject)
	.then(requestProcess.sort, reject)
	.then(count, reject)
	.then(find, reject)
	.then(requestProcess.format, reject)
	.then(end);
  
};

exports.findById = function(req, res) {
	var id = req.params.id;
	var ObjectId = mongoose.Types.ObjectId;
	Magasin.findOne({_id : new ObjectId(id)}, function(err, result) {
		if (err) return res.send(500, err);
		return res.json(result);
	});
}

var geojsonMagasins = function(magasins) {
  return GeoJSON.parse(magasins, {Point: 'location', include: ['_id','adresse','actif','marque','commentaires']});
}


exports.findByLocation = function(req, res) {
    try {
	   Magasin.findInBox(req.query, function(err, magasins) {	      
	      if(!magasins) { return res.send(404); }
	      magasins = _.map(magasins, function(magasin) { return magasin.toJSON() })
	      var geojson = geojsonMagasins(magasins);
	      return res.json(geojson);
	  });
	}
	catch(err) {
	  	return res.send(400, {
	  		reason : 'Bad parameters (latitudeSudOuest,longitudeSudOuest,latitudeNordEst,longitudeNordEst)'
	  	});	
	}
}