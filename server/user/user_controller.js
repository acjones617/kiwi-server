'use strict';

var passport = require('passport');
var query = require('./user_queries');
var dbRequest = require('../main/db_connection')();

module.exports = {

  getUserInfo: function (req, res, next) {
    dbRequest.queryAsync(query.getUserInfo(req.user.email))
    .then(function(foundUser) {
      res.send(foundUser);
    })
    .catch(function(err) {
      res.send(500, { error: err });
    })
  }
}
