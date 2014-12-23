'use strict';

var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
module.exports = {
	sendmail : function(titre, texte) {
		sendgrid.send({
		  to:       'y4nn5m@gmail.com',
		  from:     'quiprendlestickets@quiprendlestickets.com',
		  subject:  titre,
		  text:     texte
		}, function(err, json) {
		  if (err) { return console.error(err); }
		  console.log(json);
		});	
	}
}

