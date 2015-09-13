'use strict';

var User = require('../../../services/user').User;

exports.execute = function(req, res) {
	
	var user = new User(req.db);
	var newUser = req.body;
	var newToken = user.generateToken();
	newUser.token = newToken;
	newUser.provder = 'local';
	user.create(newUser, function(err, userCreated) {
		if (err) {
			res.status(500).json(err);
		}
		if (!userCreated) {
			res.status(500).send('Unknown error : user not created');
		}
		res.json(userCreated);
	});
};

