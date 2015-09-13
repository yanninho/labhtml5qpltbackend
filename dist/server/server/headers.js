 'use strict';

 var cors = require('cors');

 module.exports = function(app) {
 
  app.use(cors());

  app.use(function(req, res, next){
    res.header('Access-Control-Expose-Headers', 'content-range, accept-range, link');
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      return res.end();
    }
    else {
      return next();
    }
  });
 };