'use strict';

var User = require('../../../services/user').User;

exports.execute = function(req, res) {
	var token = req.params.token;
	var user = new User(req.db);
	user.findByToken(token, function(err, userFound) {
		if (err) {
			res.status(500).send(err);
		}
		if (!user) {
			res.status(404).send();
		}
		res.status(200).json(userFound);
	});
};

