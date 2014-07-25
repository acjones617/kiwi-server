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
    request.queryAsync(query.addKiwi(req.user.email, req.body.kiwiData))
    .then(function(err, result) {
      if (err) {
        console.log(err, 'kiwi already created?');
        res.send(403, { error: err });
      } else {
        var responseObj = {
          message: 'kiwi created',
        }
        res.send(201, responseObj);
      }
    });
    
  },

  removeKiwi: function (req, res, next) {

  }
};
