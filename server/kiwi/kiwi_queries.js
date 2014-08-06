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

var qRemoveKiwi = function(email, kiwiId) {
  var query =
  "UPDATE dbo.kiwis\n" +
  "SET deleted = 1\n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON u.id = k.user_id\n" + 
  "WHERE k.id = " + kiwiId + " \n"
  "AND u.email = '" + email + "';";

  return query;
};

var qAddKiwiValue = function(kiwiId, kiwiData) {
  var query;

  if (kiwiData.date) {
    query = 
    "INSERT INTO dbo.kiwi_values (kiwi_id, value, date)\n" +
    "VALUES (" + kiwiId + ", " + kiwiData.value + ",'" + kiwiData.date + "');";
  } else {
    query = 
    "INSERT INTO dbo.kiwi_values (kiwi_id, value)\n" +
    "VALUES (" + kiwiId + ", " + kiwiData.value + ");";
  }

  return query;
}

var qGetKiwiValues = function(kiwiId) {
  var query =
  "SELECT *\n" +
  "FROM dbo.kiwi_values kv\n" +
  "WHERE kv.kiwi_id = " + kiwiId + ";";

  return query;
}

// so that user doesn't select same kiwi twice...
var qCheckKiwiExistence = function(email, kiwiData) {
  var query =
  "SELECT k.id \n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + email + "'\n" +
  // "AND k.deleted = 0\n" +
  "AND k.title = '" + kiwiData.title + "';";

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
  addKiwiValue: qAddKiwiValue,
  getKiwiValues: qGetKiwiValues,
  checkKiwiExistence: qCheckKiwiExistence,
  kiwiNeedingUpdates: qKiwiNeedingUpdates
};

module.exports = queries;
