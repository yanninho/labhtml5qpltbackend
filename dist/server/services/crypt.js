'use strict';

var crypto = require('crypto');

function Crypt() {
	var pass = 'c45GuR5q';
	var algorithm = 'aes-256-ctr';

	this.encrypt = function(text) {
	  var cipher = crypto.createCipher(algorithm,pass);
	  var crypted = cipher.update(text,'utf8','hex');
	  crypted += cipher.final('hex');
	  return crypted;		
	};
}

module.exports = new Crypt();