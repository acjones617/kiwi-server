'use strict';

var qGetUserInfo = function (email) {
  var query =
  "SELECT u.email as 'email', al.level as 'accountLevel', u.notified as 'notified', u.created_at as 'createdAt'\n" +
  "FROM dbo.users u\n" +
  "JOIN dbo.account_level al\n" +
  "ON u.account_level_id = al.id\n" +
  "WHERE email = '" + email + "';";

  return query;
};

var qGetUserKiwis = function (email) {
  var query =
  "SELECT k.title as title, k.url as url, kv.date as date, kv.value as value\n" +
  "FROM dbo.users u\n" +
  "JOIN dbo.kiwis k\n" +
  "ON u.id = k.user_id\n" +
  "JOIN dbo.kiwi_values kv\n" +
  "ON k.id = kv.kiwi_id\n" +
  "WHERE u.email = '" + email + "'\n" +
  "AND k.deleted = 0;";

  return query;
};

var qGetUserGroups = function (email) {
  var query =
  "SELECT g.*\n" +
  "FROM dbo.users u\n" +
  "JOIN dbo.groups g\n" +
  "ON u.id = g.user_id\n" +
  "WHERE u.email = '" + email + "'\n" +
  "AND g.deleted = 0;";

  return query;
};

var qGetAllData = function (email) {
  var query =
  "SELECT g.name as groupName, k.title as kiwiTitle, kv.date as date, kv.value as value\n" +
  "FROM dbo.users u\n" +
  "JOIN dbo.groups g\n" +
  "ON u.id = g.user_id\n" +
  "JOIN dbo.kiwi_group kg\n" +
  "ON kg.group_id = g.id\n" +
  "JOIN dbo.kiwis k\n" +
  "ON k.id = kg.kiwi_id\n" +
  "JOIN dbo.kiwi_values kv\n" +
  "ON k.id = kv.kiwi_id\n" +
  "WHERE u.email = '" + email + "'\n" +
  "AND g.deleted = 0\n" +
  "AND k.deleted = 0;";

  return query;
};

var queries = {
  getUserInfo: qGetUserInfo,
  getUserKiwis: qGetUserKiwis,
  getUserGroups: qGetUserGroups,
  getAllData: qGetAllData
};

module.exports = queries;
