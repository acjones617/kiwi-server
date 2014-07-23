'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../main/config_db_development');
var Promise = require('bluebird');
var query = require('./auth-queries');

Promise.promisifyAll(bcrypt);

var createJwt = function(req, res) {
  var tokenSecret = process.env.SECRET_JWT || 'super secret token'
  // expires in one year?
  var token = jwt.sign({ email: req.body.email }, tokenSecret, { expiresInMinutes: 60 * 24 * 365 });
  res.json({ 'kiwi-token': token });
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
      createJwt(req, res);
      res.end('success!');
    })(req, res, next);
  },

  create: function (req, res, next) {
    console.log('inside create');
    bcrypt.genSaltAsync(10)
    .then(function(salt) {
      return bcrypt.hashAsync(req.body.password, salt);
    })
    .then(function(hash_password) {
      // insert into sql
      var connection = new sql.Connection(config, function(err) {
        if (err) {
          console.log('API database connection error:');
          console.log(err);
        } else {
          var request = new sql.Request(connection);
          Promise.promisifyAll(request);

          request.queryAsync(query.signupUser(email, hash_password))
          .then(function() {
            // send back jwt
            createJwt(req, res);
            res.end('success!');
          })
          .catch(function(err) {
            res.send(500);
          })
        }
      });
    });
  }
};
