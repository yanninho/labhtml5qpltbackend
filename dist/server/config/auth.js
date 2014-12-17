'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
module.exports = {
	'ensureAuthenticated' : function(req, res, next) {
  		if (req.isAuthenticated()) { return next(); }
  		res.send(401);
	},
	'googleAuth' : {
			"auth_uri":"https://accounts.google.com/o/oauth2/auth",
			"clientSecret":"HRpRiWpTsS0Jo2TTAvnCop2E",
			"token_uri":"https://accounts.google.com/o/oauth2/token",
			"client_email":"675273188897-n65os0k7su4v07bu0ntpgggtu9im58er@developer.gserviceaccount.com",
			"redirect_uris":["http://localhost:9002/"],
			"client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/675273188897-n65os0k7su4v07bu0ntpgggtu9im58er@developer.gserviceaccount.com",
			"clientID":"675273188897-n65os0k7su4v07bu0ntpgggtu9im58er.apps.googleusercontent.com",
			"auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
			"javascript_origins":["http://localhost:9000"],
			'callbackURL'   : 'http://localhost:9002/auth/google/callback'
	}
}

