'use strict';

var passport = require('passport');
var query = require('./kiwi_queries');
var Promise = require('bluebird');
var dbRequest = require('../main/db_connection');

module.exports = {

  addKiwi: function (req, res, next) {
    // req.user.email is user email
    dbRequest.queryAsync(query.checkKiwiExistence(req.user.email, req.body.kiwiData))
    .then(function(foundKiwi) {
      if (foundKiwi.length) {
        return new Promise(function(resolve, reject) {
          reject('kiwi already exists');
        });
      } else {
        return dbRequest.queryAsync(query.addKiwi(req.user.email, req.body.kiwiData));
      }
    })
    .then(function(err, result) {
      var responseObj = {
        message: 'kiwi created',
      }
      res.send(201, responseObj);
    })
    .catch(function(err) {
      if (err === 'kiwi already exists') {
        res.send(403, { error: err });
      } else {
        res.send(500, { error: err });
      }
    })
    
  },

  getKiwiValues: function(req, res, next) {

  },

  addKiwiValue: function(req, res, next) {
    // expect kiwiId, value:

  },

  getKiwiUpdates: function(req, res, next) {
    // for the crawler to know what kiwis need updating
    dbRequest.queryAsync(query.kiwiNeedingUpdates())
    .then(function(foundKiwis) {
      console.log('kiwis need updating:', foundKiwis);
      res.send(foundKiwis);
    })
    .catch(function(err) {
      res.send(500, { error: err });
    })
  },

  removeKiwi: function (req, res, next) {

  }
};
