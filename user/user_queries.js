'use strict';

var qAddKiwi = function(email, kiwiData) {
  var query =  
  "INSERT INTO dbo.kiwis (user_id, title, path, url)\n" +
    "SELECT id,\n" +
      "'" + kiwiData.title + "',\n" +
      "'" + kiwiData.path + "',\n" +
      "'" + kiwiData.url + "'\n" +
    "FROM dbo.users\n" +
    "WHERE email = '" + email + "'";

  return query;
};

var qRemoveKiwi = function(kiwiData) {

};

var qCheckKiwiExistence = function(email, kiwiData) {
  var query =  
  "SELECT * \n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "AND u.email = '" + email + "'\n" +
  "AND k.title = '" + kiwiData.title + "'";

  return query;
};

var qKiwiNeedingUpdates = function() {
  var query = 
  "SELECT *\n" +
  "FROM dbo.kiwis\n" +
  "WHERE next_update < GETDATE()";

  return query;
}

var queries = {
  addKiwi: qAddKiwi,
  removeKiwi: qRemoveKiwi,
  checkKiwiExistence: qCheckKiwiExistence,
  kiwiNeedingUpdates: qKiwiNeedingUpdates
};

module.exports = queries;
