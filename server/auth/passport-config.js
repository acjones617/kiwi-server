'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sql = require('mssql'); 
var config = require('../main/config_db_development');
var Promise = require('bluebird');
var query = require('./auth-queries');

/**
 * Passport configuration
 */

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'hash_password' // this is the virtual field on the model
  },
  function(email, password, done) {
    var connection = new sql.Connection(config, function(err) {
      if (err) {
        console.log('API database connection error:');
        console.log(err);
        done(err);
      } else {
        console.log('API database connection established.');
        var request = new sql.Request(connection);
        Promise.promisifyAll(request);

        request.queryAsync(query.dropTables)


    User.findOne({
      email: email.toLowerCase()
    }, function(err, user) {
      if (err) return done(err);
      
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;
