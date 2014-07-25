'use strict';

var passport = require('passport');
var query = require('./user_queries');
var dbRequest = require('../main/db_connection')();

module.exports = {

  getUserInfo: function (req, res, next) {
    dbRequest.queryAsync(query.)
  }
}