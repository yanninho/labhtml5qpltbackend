'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/quiprendlestickets'
  },
  auth : {
  	google : {
	    clientID: '34833949027-4ti272fqs4l0ao6ra8c7crumr8el9uch.apps.googleusercontent.com',
	    clientSecret: 'XETmKtcLKIeUGClzlofx57k2',
	    callbackURL: 'http://127.0.0.1:9000/v2/auth/google/callback'
  	},
  	facebook : {
	    clientID: '1038931759463689',
	    clientSecret: 'b9329a314473df5dc3d85aca11c81ccd',
	    callbackURL: 'http://localhost:9000/v2/auth/facebook/callback',
	    enableProof: false  		
  	}
  }
};
