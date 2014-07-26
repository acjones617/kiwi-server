'use strict';

var qGetUserInfo = function(email) {
  var query =
  "SELECT u.email as 'email', al.level as 'accountLevel', u.notified as 'notified', u.created_at as 'createdAt'\n" +
  "FROM dbo.users u\n" +
  "JOIN dbo.account_level al\n" +
  "ON u.account_level_id = al.id\n" +
  "AND email = '" + email + "'";

  return query;
};

var qGetUserKiwis = function(email) {
  var query =
  "SELECT k.*\n" +
  "FROM dbo.users u\n" +
  "JOIN dbo.kiwis k\n" +
  "ON u.id = k.user_id\n" +
  "AND u.email = '" + email + "'";

  return query;
};


var queries = {
  getUserInfo: qGetUserInfo,
  getUserKiwis: qGetUserKiwis
};

module.exports = queries;
