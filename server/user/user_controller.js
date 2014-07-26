'use strict';

var passport = require('passport');
var query = require('./user_queries');
var dbRequest = require('../main/db_connection');

module.exports = {

  getUserInfo: function (req, res, next) {
    dbRequest.queryAsync(query.getUserInfo(req.user.email))
    .then(function(foundUser) {
      res.send({ user: foundUser[0] });
    })
    .catch(function(err) {
      console.log(err);
      res.send(500);
    });
  },

  getUserKiwis: function(req, res, next) {
    dbRequest.queryAsync(query.getUserKiwis(req.user.email))
    .then(function(foundKiwis) {
      res.send({ kiwis: foundKiwis });
    })
    .catch(function(err) {
      console.log(err);
      res.send(500);
    })
  }
}
