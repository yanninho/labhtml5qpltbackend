'use strict';

// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


module.exports = function(app, config) {
	// var sessionOpts = {
	//   saveUninitialized: true, // saved new sessions
	//   resave: false, // do not automatically write to the session store
	//   // store: sessionStore,
 //      store: new MongoStore(
 //        {'url' : config.mongo.uri},
 //        function(err){
 //            console.log(err || 'connect-mongodb setup ok');
 //      }),	  
	//   secret: 'iwantmojito',
	//   cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
	// };

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(cookieParser('iwantmojito'))
	// app.use(session(sessionOpts));

	//session
	// config.passport.serializeUser(function(user, done) {
	//  console.log('serialize');	
	//   done(null, user._id);
	// });

	// config.passport.deserializeUser(function(id, done) {
	//   console.log('deserialize');
	//   // user.findById(id, function(err, user) {
	//   //   done(err, user);
	//   // });
	// });	

	app.use(config.passport.initialize());
	// app.use(config.passport.session());

	// require('./localStrategy')(db);
	// require('./resourceBasicStrategy')(config);
	require('./googleOauthStrategy')(config);
	require('./facebookStrategy')(config);
	require('./bearerStrategy')(config);

};