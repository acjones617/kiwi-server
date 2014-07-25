'use strict';

var sql = require('mssql');
var passport = require('passport');
var Promise = require('bluebird');
var query = require('./kiwi_queries');
var connection = require('../main/db_connection')();

module.exports = {

  addKiwi: function (req, res, next) {
    // req.user.email is user email
    var request = new sql.Request(connection);
    Promise.promisifyAll(request);

    request.queryAsync(query.checkKiwiExistence(req.user.email, req.body.kiwiData))
    .then(function(foundKiwi) {
      if (foundKiwi.length) {
        return new Promise(function(resolve, reject) {
          reject('kiwi already exists');
        });
      } else {
        return request.queryAsync(query.addKiwi(req.user.email, req.body.kiwiData));
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

  removeKiwi: function (req, res, next) {

  }
};
