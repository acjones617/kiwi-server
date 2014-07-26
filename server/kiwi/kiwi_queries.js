'use strict';

var qAddKiwi = function(email, kiwiData) {
  var query =  
  "INSERT INTO dbo.kiwis (user_id, title, path, url)\n" +
    "SELECT id,\n" +
      "'" + kiwiData.title + "',\n" +
      "'" + kiwiData.path + "',\n" +
      "'" + kiwiData.url + "'\n" +
    "FROM dbo.users\n" +
    "WHERE email = '" + email + "';";

  return query;
};

var qRemoveKiwi = function(kiwiData) {
  var query =
  "UPDATE dbo.kiwis\n" +
  "SET deleted = 1\n" +
  "WHERE id = " + kiwiData.id + ";";

  return query;
};

var qGetKiwiValues = function(kiwiData) {
  var query =
  "SELECT *\n" +
  "FROM dbo.kiwi_values\n" +
  "WHERE kiwi_id = " + kiwiData.id + ";";

  return query;
}

// so that user doesn't select same kiwi twice...
var qCheckKiwiExistence = function(email, kiwiData) {
  var query =
  "SELECT * \n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + email + "'\n" +
  "AND k.deleted = 0\n"
  "AND k.title = '" + kiwiData.title + "'\n"
  "AND k.path = '" + kiwiData.path + "'"
  "AND k.url = '" + kiwiData.url + "';";

  return query;
};

var qKiwiNeedingUpdates = function() {
  var query = 
  "SELECT *\n" +
  "FROM dbo.kiwis\n" +
  "WHERE next_update < GETDATE();";

  return query;
}

var queries = {
  addKiwi: qAddKiwi,
  removeKiwi: qRemoveKiwi,
  getKiwiValues: qGetKiwiValues,
  checkKiwiExistence: qCheckKiwiExistence,
  kiwiNeedingUpdates: qKiwiNeedingUpdates
};

module.exports = queries;
