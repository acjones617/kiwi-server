'use strict';

var sql = require('mssql');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var query = require('./auth_queries');
var connection = require('../main/db_connection')();

Promise.promisifyAll(bcrypt);

var sendJwt = function(req, res) {
  var tokenSecret = process.env.SECRET_JWT || 'super secret token'
  // expires in one year
  var token = jwt.sign({ email: req.body.email }, tokenSecret, { expiresInMinutes: 60 * 24 * 365 });
  res.json(201, { 'kiwiToken': token });
}

module.exports = {

  /**
   * Logout - client deletes their JWT
   */

  /**
   * Login
   */

  login: function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      var error = err || info;
      if (error) return res.json(401, error);
      // user has authenticated correctly - provide user with JWT token, expires in one year, send back username
      sendJwt(req, res);
      res.end('success!');
    })(req, res, next);
  },

  signup: function (req, res, next) {
    console.log('inside create', req.body);
    // check is user already exists
    var request = new sql.Request(connection);
    Promise.promisifyAll(request);
    request.queryAsync(query.lookupUser(req.body.email))
    .then(function(foundUser) {
      console.log(foundUser);
      if (foundUser.length) {
        return new Promise(function(resolve, reject) {
          reject('user already exists')
        });
      } else {
        // if no user exists, move along with account creation
        return bcrypt.genSaltAsync(10);
      }
    })
    .then(function(salt) {
      return bcrypt.hashAsync(req.body.password, salt);
    })
    .then(function(hash_password) {
      // insert into sql
      return request.queryAsync(query.signupUser(req.body.email, hash_password))
    })
    .then(function() {
      // send back jwt
      sendJwt(req, res);
    })
    .catch(function(err) {
      if (err === 'user already exists') {
        res.send(403, {error: err});
      } else {
        console.log(err);
        res.send(500, {error: err});
      }
    })
  }
};
