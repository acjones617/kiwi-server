'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sql = require('mssql'); 
var config = require('../main/config_db_development');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var query = require('./auth-queries');

Promise.promisifyAll(bcrypt);

/**
 * Passport configuration
 */

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    var connection = new sql.Connection(config, function(err) {
      if (err) {
        console.log('API database connection error:');
        console.log(err);
        done(null, false, {message: err});
      } else {
        var request = new sql.Request(connection);
        Promise.promisifyAll(request);

        request.queryAsync(query.lookupUser(email))
        .then(function(foundUser) {
          console.log(foundUser);
          if (!foundUser.length) {
            return done(null, false, {
              message: 'This email is not registered.'
            });
          }
          // check hash_password
          bcrypt.compareAsync(password, foundUser[0].hash_password)
          .then(function(correct) {
            if (!correct) {
              return done(null, false, {
                message: 'This password is not correct.'
              });
            }
            return done(null, foundUser[0]);
          })
          .catch(function(err) {
            done(null, false, {
              message: err
            });
          });
        })
        .catch(function(err) {
          done(null, false, {
            message: err
          });
        });
      }
    });
  })
);

module.exports = passport;
