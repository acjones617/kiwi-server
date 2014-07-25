'use strict';

var qGetUserInfo = function(email) {
  var query =  
  "SELECT *\n" +
  "FROM dbo.users\n" +
  "WHERE email = '" + email + "'";

  return query;
};

var queries = {
  getUserInfo: qGetUserInfo,
};

module.exports = queries;
