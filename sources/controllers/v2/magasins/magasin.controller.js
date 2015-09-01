'use strict';

var Magasin = require('../../../models/magasin'),
    mongoose = require('mongoose'),
    _ = require("underscore"),
    GeoJSON = require('geojson');

exports.init = function(resourceName, maxResult) {
	return function(req, res, next) {
		if (!resourceName) return res.status(500).send({reason: 'Technical error : resourceName is not defined'});
		if (!maxResult) return res.status(500).send({reason: 'Technical error : maxResult is not defined'});
		req.resourceName = resourceName;
		req.maxResult = maxResult;
		next();
	}
}

exports.endFind = function(req, res, next) {
	var status = 200;		 
    if (req.result.length < req.count) {
    	status = 206;
    }
    return res.status(status).json(req.result);
}

exports.endFindById = function(req, res, next) {
    return res.json(req.result);
}

exports.count = function(req,res,next) {
	var mongoReq = Magasin.count();
	_.mapObject(req.happyRest.filters, function(val, key) {
		mongoReq = Magasin.count().where(key).in(val);
	});	

	mongoReq.exec().then(function(res) {
		req.count = res;
		if (req.happyRest.range && req.happyRest.range.limit === req.maxResult && res > 0) {
			req.happyRest.range.limit = res;
		}
		next();	
	});	
}

exports.find = function(req, res, next) {
	var range = req.happyRest.range;
	var mongoReq = Magasin.find();
	//add filters
	_.mapObject(req.happyRest.filters, function(val, key) {
		mongoReq = Magasin.find().where(key).in(val);
	});	
	//add sort
	_.each(req.happyRest.sort, function(sort) {
		mongoReq = mongoReq.sort(sort);
	});			
	//add range
	mongoReq.skip(range.offset).limit(range.limit - range.offset);

	mongoReq.exec().then(function(res) {
		req.result = res;
		next();
	});	
};

exports.findById = function(req, res, next) {
	var id = req.params.id;
	var ObjectId = mongoose.Types.ObjectId;
	Magasin.findOne({_id : new ObjectId(id)}, function(err, result) {
		if (err) return res.send(500, err);
		req.result = [result];
		next();
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