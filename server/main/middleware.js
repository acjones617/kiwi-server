'use strict';

var jwt = require('jsonwebtoken');

/*
 * MiddleWare for the entire app
*/

module.exports = exports = {

  /**
   * Custom middleware used by the application
   */
   
  /**
   *  Protect routes on the api from unauthenticated access
   *  Add decoded token with user email to req body
   */
  auth: function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var secret = process.env.SECRET_JWT || 'super secret token';
    if (!token) {
      res.send(401, {error: 'not authenticated'});
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.send(401, { error: err });
        } else {
          req.user = decoded;
          next();
        }
      });
    }
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  },


  logError: function (err, req, res, next) {
    if (err) {
      console.error(err);
      return next(err);
    }
    next();
  },

  handleError: function (err, req, res, next) {
    if (err) {
      if (err.status === 404) {
        return res.send({ user: req.user }, 404);
      }
      res.send(err, err.status);
    }
  },

  cors: function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

    if (req.method === 'Options') {
      res.send(200);
    } else {
      return next();
    }
  }
};